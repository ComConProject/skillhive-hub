<script setup lang="ts">
import { formatDistanceToNow, parseISO } from 'date-fns'
import type { Notification } from '~/types'

const { supabase: db } = useCustomSupabase()
const { t } = useI18n()
const user = useSupabaseUser()
const limit = 5
const totalNotifications = ref(0)

const windowHeight = ref(0)
const isAll = ref(true)
const scrollContent = ref<HTMLDivElement | null>(null)
const optionsNotification = [
  {
    label: t('notifications.mark_all_as_read'),
    key: 'mark_all_as_read',
  },
  //   {
  //     label: 'Delete all',
  //     key: 'delete_all',
  //   },
]
const localePath = useLocalePath()
function handleNavigate(item: Notification) {
  if (!item.url)
    return
  navigateTo(localePath(`${item.url}`))
  if (item.is_read === false) {
    handleRead(item.id)
  }
}

function handleSelectOption(key: string) {
  if (key === 'mark_all_as_read') {
    markAllAsRead()
  }
}

function timeAgo(dateStr: any) {
  const date = parseISO(dateStr)
  return formatDistanceToNow(date, { addSuffix: true })
}

function getDateTimeTitle(dateStr: any) {
  const date = new Date(dateStr)
  return `${date.toDateString()} ,${date.toLocaleTimeString()}`
}

function showNotification(title: string, options: NotificationOptions): void {
  // Check if the browser supports notifications
  if (!('Notification' in window)) {
    console.error('This browser does not support system notifications')
    return
  }

  // Request permission if not granted
  if (Notification.permission !== 'granted') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        // eslint-disable-next-line no-new
        new Notification(title, options)
      }
    })
  }
  else {
    // eslint-disable-next-line no-new
    new Notification(title, options)
  }
}

const items = shallowRef<Notification[]>([])
const isTabActive = ref(true)

function markAllAsRead() {
  const itemsUnreads = items.value.filter((item) => {
    return item.is_read === false
  })
  itemsUnreads.forEach((item) => {
    handleRead(item.id)
  })
}
async function handleRead(id: string | number) {
  const { error } = await db.from('notification').update({ is_read: true }).eq('id', id)
  if (error) {
    throw new Error(`[handleRead] error: ${error.message}`)
  }
  // update state
  items.value = items.value.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        is_read: true,
      }
    }
    return item
  })
}

function handleVisibilityChange() {
  if (document.visibilityState === 'visible') {
    isTabActive.value = true
  }
  else {
    isTabActive.value = false
  }
}

const itemsFilter = computed(() => {
  if (isAll.value)
    return items.value
  return items.value.filter((item) => {
    return item.is_read === isAll.value
  })
})

const countUnread = computed(() => {
  return items.value.filter((item) => {
    return item.is_read === false
  }).length
})

async function initTotal() {
  try {
    const { count } = await db.from('notification').select('id', { count: 'exact' }).eq('action_user_id', `${user.value?.id}`)
    if (!count)
      return
    totalNotifications.value = count
  }
  catch (error) {
    throw new Error(`[initTotal] error: ${error}`)
  }
}

async function loadMore() {
  if (items.value.length < limit)
    return
  if (items.value.length >= totalNotifications.value)
    return
  const offset = items.value.length
  try {
    const { data } = await db.from('notification').select('*').eq('action_user_id', `${user.value?.id}`).range(offset, offset + limit)
    const { count } = await db.from('notification').select('id', { count: 'exact' }).eq('action_user_id', `${user.value?.id}`)
    if (!data)
      return
    items.value = [...items.value, ...data]
    totalNotifications.value = count as number
  }
  catch (error) {
    throw new Error(`[loadMore] error: ${error}`)
  }
}

function handleScroll() {
  if (scrollContent.value) {
    const { scrollTop, scrollHeight, clientHeight } = scrollContent.value
    if (scrollTop + clientHeight >= scrollHeight - 1) {
      // Adding -1 to ensure the calculation
      // console.log('Scrolled to bottom');
      // Your logic when scrolled to bottom
      loadMore()
    }
  }
}

async function fetchNotifications() {
  try {
    const { data, count } = await db.from('notification').select('*', { count: 'exact' }).eq('action_user_id', `${user.value?.id}`)
    if (!data)
      return
    items.value = data
    totalNotifications.value = count as number
  }
  catch (error) {
    throw new Error(`[fetchNotifications] error: ${error}`)
  }
}
const channels = db.channel('custom-all-channel')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'notification' },
    (payload) => {
      fetchNotifications()
    },
  )

// check window height
windowHeight.value = window.innerHeight
window.addEventListener('resize', () => {
  windowHeight.value = window.innerHeight
})

function subNotifications() {
  document.addEventListener('visibilitychange', handleVisibilityChange, false)
  channels.subscribe()
  fetchNotifications()
}

onMounted(() => {
  subNotifications()
  initTotal()
})

onUnmounted(() => {
  channels.unsubscribe()
})
</script>

<template>
  <div>
    <UChip size="lg" :show="!!countUnread" :text="countUnread">
      <UPopover trigger="click" style="padding: 0%">
        <UTooltip :text="$t('notification')">
          <UButton color="gray" variant="ghost" icon="i-heroicons-bell-20-solid" />
        </UTooltip>
        <template #panel>
          <div
            class="flex w-96 flex-col"
            :style="{ maxHeight: `${windowHeight - 100}px`, minHeight: '100px' }"
          >
            <nav class="flex justify-between px-4 py-2">
              <h1 class="text-lg text-gray-600">
                {{ $t('notification') }}
              </h1>
            </nav>
            <nav class="flex gap-2 px-4">
              <div class="flex flex-grow gap-2">
                <UButton
                  variant="ghost"
                  :secondary="isAll"
                  size="sm"
                  @click="isAll = true"
                >
                  {{ $t('all') }}
                </UButton>
                <UButton
                  v-if="countUnread"
                  variant="ghost"
                  size="sm"
                  @click="isAll = false"
                >
                  {{ $t('notifications.unread') }}
                </UButton>
              </div>
              <div>
                <UButton
                  size="sm"
                  @click="markAllAsRead()"
                >
                  {{ $t('notifications.read_all') }}
                </UButton>
              </div>
            </nav>
            <ul
              ref="scrollContent"
              class="h-full overflow-y-auto px-2 py-2"
              @scroll="handleScroll"
            >
              <li v-for="(item, index) in itemsFilter" :key="index">
                <div
                  class="group flex cursor-pointer gap-2 rounded-lg px-2 py-2 hover:bg-gray-100"
                  @click="handleNavigate(item)"
                >
                  <span
                    class="flex h-8 w-8 items-center justify-center pt-1 text-primary-500"
                  >
                    <Icon name="solar:bell-linear" size="28" />
                  </span>
                  <div class="relative flex w-full flex-col">
                    <article class="flex">
                      <div class="flex-grow">
                        <span class="text-gray-600">{{ item.title }}</span>
                        <p class="text-gray-500">
                          {{ item.message }}
                        </p>
                      </div>
                      <Icon
                        v-if="!item.is_read"
                        name="fluent:circle-48-filled"
                        size="16"
                        class="right-2 top-2 z-10 text-primary-500"
                      />
                    </article>
                    <nav class="flex justify-between">
                      <div class="flex-grow">
                        <small
                          :title="getDateTimeTitle(item.created_at)"
                          class="en"
                        >
                          {{ timeAgo(item.created_at) }}
                        </small>
                      </div>
                      <UButton
                        v-if="!item.is_read"
                        variant="ghost"
                        size="sm"
                        class="invisible group-hover:visible"
                        @click="handleRead(item.id)"
                      >
                        {{ $t('notifications.read') }}
                      </UButton>
                      <UButton
                        v-else
                        variant="ghost"
                        size="sm"
                        type="primary"
                        class="invisible group-hover:visible"
                      >
                        {{ $t('notifications.already_read') }}
                      </UButton>
                    </nav>
                  </div>
                </div>
              </li>
              <li v-if="!items.length" class="p-4">
                {{ $t('notifications.no_notification') }}
              </li>
            </ul>
            <!-- <article class="w-full p-4"> xx </article> -->
          </div>
        </template>
      </UPopover>
    </UChip>
  </div>
</template>

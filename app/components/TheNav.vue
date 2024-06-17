<script setup lang="ts">
import type { Database } from '~~/database.types'

const user = useSupabaseUser()
const { supabase } = useCustomSupabase()
const { seller } = useInlineSeller()

const dropdownItems = [
  [
    {
      label: 'Profile',
      icon: 'i-line-md-account',

      click: () => {
        navigateTo('/seller/profile')
      },
    },
  ],
  [{
    label: 'Logout',
    click: () => {
      signOut()
    },
    icon: 'i-line-md-log-out',
  }],
]
// query if user have a seller account
function useInlineSeller() {
  const seller = shallowRef<Database['public']['Tables']['freelancer']['Row']>()

  async function getSeller() {
    if (!user.value)
      return
    const { data, error } = await supabase.from('freelancer').select('*').eq('user_id', user.value.id)

    if (error)
      throw new Error(`[getSeller] ${error.message}`)

    if (!data)
      return
    if (data.length > 0)
      seller.value = data[0]
  }

  onMounted(() => {
    getSeller()
  })

  return {
    getSeller,
    seller,
  }
}

async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error?.message)
    return console.error(error.message)
}
</script>

<template>
  <div class="border-b pb-4 border-slate-100 dark:border-slate-700">
    <section class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <NuxtLinkLocale to="/">
          <h1 class="font-semibold text-lg">
            Skillhive
          </h1>
        </NuxtLinkLocale>
        <div class="w-96">
          <UInput :placeholder="$t('what_service_are_you_looking_for_today')" trailing-icon="i-heroicons-magnifying-glass" />
        </div>
        <div>
          <TheCategory />
        </div>
      </div>
      <ul class="flex items-center gap-3">
        <li>
          <UTooltip :text="$t('notification')">
            <UButton color="gray" variant="ghost" icon="i-heroicons-bell-20-solid" />
          </UTooltip>
        </li>
        <li>
          <UTooltip :text="$t('inbox.inbox')">
            <NuxtLinkLocale to="/inbox">
              <UButton color="gray" variant="ghost" icon="i-fluent-chat-12-filled" />
            </NuxtLinkLocale>
          </UTooltip>
        </li>
        <li>
          <UTooltip :text="$t('theme')">
            <ColorChange />
          </UTooltip>
        </li>
        <li>
          <UTooltip :text="$t('language')">
            <LanguageChange />
          </UTooltip>
        </li>
        <li>
          <NuxtLinkLocale v-if="!seller" to="/seller">
            <UButton color="gray">
              Become a seller
            </UButton>
          </NuxtLinkLocale>
          <NuxtLinkLocale v-else :to="`/${seller.username}/manage-gig/`">
            <UButton color="gray">
              Manage Gig
            </UButton>
          </NuxtLinkLocale>
        </li>
        <li>
          <UDropdown
            v-if="user"
            :items="dropdownItems"
            :popper="{ placement: 'bottom-start' }"
          >
            <UAvatar
              chip-color="primary"
              chip-text=""
              chip-position="top-right"
              size="sm"
              :src="user.user_metadata.avatar_url"
              alt="Avatar"
            />
          </UDropdown>
          <UButton v-else variant="ghost" @click="() => $router.push('/signin')">
            Join
          </UButton>
        </li>
      </ul>
    </section>
  </div>
</template>

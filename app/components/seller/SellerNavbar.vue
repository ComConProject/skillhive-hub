<script setup lang="ts">
import type { Freelancer } from '~/types'

const user = useSupabaseUser()
const { supabase } = useCustomSupabase()
const { seller } = useInlineSeller()
const { t } = useI18n()

const dropdownItems = [
  [
    {
      label: t('profile.profile'),
      icon: 'i-line-md-account',

      click: () => {
        navigateTo(`/${user.value?.id}/seller/`)
      },
    },
    {
      label: t('order'),
      icon: 'i-heroicons-shopping-cart',

      click: () => {
        navigateTo(`/${user.value?.id}/manage-gig/order`)
      },
    },
  ],
  [
    {
      label: t('auth.sign_out'),
      click: () => {
        signOut()
      },
      icon: 'i-line-md-log-out',
    },
  ],
]
// query if user have a seller account
function useInlineSeller() {
  const seller = shallowRef<Freelancer>()

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

  navigateTo('/signin')
}
</script>

<template>
  <div class="border-b pb-4 border-slate-100 dark:border-slate-700">
    <section class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <NuxtLinkLocale :to="`/${seller?.username}/manage-gig/`">
          <h1 class="font-semibold text-lg">
            Skillhive
          </h1>
        </NuxtLinkLocale>
      </div>
      <ul class="flex items-center gap-3">
        <li>
          <TheNotification />
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
          <NuxtLinkLocale to="/">
            <UButton color="gray">
              {{ $t('switch_to_buyer') }}
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
            {{ $t('auth.sign_in') }}
          </UButton>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Database } from '~/database.types'

const user = useSupabaseUser()
const { supabase } = useCustomSupabase()
const { seller } = useInlineSeller()

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
</script>

<template>
  <div>
    <section class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <NuxtLink to="/">
          <h1 class="font-semibold text-lg">
            Skillhive
          </h1>
        </NuxtLink>
        <div class="w-96">
          <UInput placeholder="What service are you looking for today?" trailing-icon="i-heroicons-magnifying-glass" />
        </div>
        <div>
          <TheCategory />
        </div>
      </div>
      <ul class="flex items-center gap-3">
        <li>
          <UTooltip text="Notification">
            <UButton color="gray" variant="ghost" icon="i-heroicons-bell-20-solid" />
          </UTooltip>
        </li>
        <!-- <li>
          <UTooltip text="Message">
            <UButton color="gray" variant="ghost" icon="i-heroicons-chat-bubble-left-right-solid" />
          </UTooltip>
        </li> -->
        <li>
          <UTooltip text="Theme">
            <ColorChange />
          </UTooltip>
        </li>
        <li>
          <UTooltip text="language">
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
          <UAvatar
            v-if="user"
            chip-color="primary"
            chip-text=""
            chip-position="top-right"
            size="sm"
            :src="user.user_metadata.avatar_url"
            alt="Avatar"
          />
          <UButton v-else variant="ghost">
            Join
          </UButton>
        </li>
      </ul>
    </section>
  </div>
</template>

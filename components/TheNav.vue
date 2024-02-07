<script setup lang="ts">
const user = useSupabaseUser()
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
      </div>
      <ul class="flex items-center gap-3">
        <li>
          <UTooltip text="Notification">
            <UButton color="gray" variant="ghost" icon="i-heroicons-bell-20-solid" />
          </UTooltip>
        </li>
        <li>
          <UTooltip text="Message">
            <UButton color="gray" variant="ghost" icon="i-heroicons-chat-bubble-left-right-solid" />
          </UTooltip>
        </li>
        <li>
          <UTooltip text="Theme">
            <ColorChange />
          </UTooltip>
        </li>
        <li>
          <UPopover>
            <UButton color="gray" variant="ghost">
              Orders
            </UButton>
            <template #panel>
              <UCard>
                Hello world
              </UCard>
            </template>
          </UPopover>
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

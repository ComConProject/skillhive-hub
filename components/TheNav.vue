<script setup lang="ts">

</script>

<template>
  <div>
    <section class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <h1 class="font-semibold text-lg">
          Skillhive
        </h1>
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
            <button>
              Orders
            </button>
            <template #panel>
              <UCard>
                Hello world
              </UCard>
            </template>
          </UPopover>
        </li>
        <li>
          <UAvatar
            chip-color="primary"
            chip-text=""
            chip-position="top-right"
            size="sm"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
          />
        </li>
      </ul>
    </section>
  </div>
</template>

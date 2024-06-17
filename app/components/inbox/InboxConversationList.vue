<script setup lang="ts">
const conversations = shallowRef([
  {
    id: 1,
    title: 'Sarah Copeland',
    lastMessage: 'Hello, how are you today?',
    lastMessageTime: '10:00 AM',
    isSelect: true,
  },
  {
    id: 2,
    title: 'Lillie Burns',
    lastMessage: 'Hey, what are you up to today?',
    lastMessageTime: '10:00 AM',
    isSelect: false,
  },
  {
    id: 3,
    title: 'Nora Phillips',
    lastMessage: 'Hey, Can we meet today?',
    lastMessageTime: '10:00 AM',
    isSelect: false,
  },
])
</script>

<template>
  <div>
    <div class="pb-2">
      <UInput :placeholder="$t('inbox.search_conversatons')" trailing-icon="i-carbon-search" />
    </div>
    <p class="text-xs text-slate-500">
      {{ $t('inbox.all_messages') }}
    </p>
    <div class="my-2" />
    <div class="w-full">
      <ul class="flex flex-col gap-y-1">
        <li
          v-for="i in conversations" :key="i.id" class="py-2 px-1 cursor-pointer hover:bg-slate-200 transition-all duration-150 rounded-lg"
          :class="{
            'bg-slate-200': i.isSelect,
          }"
        >
          <div class="flex justify-between">
            <div>
              <p class="font-medium">
                {{ i.title }}
              </p>
              <small>
                {{ i.lastMessage }}
              </small>
            </div>
            <div>
              <small>
                {{ i.lastMessageTime }}
              </small>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

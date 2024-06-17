<script setup lang="ts">
const user = useSupabaseUser()
const items = [{
  id: 1,
  isFavorite: false,
  title: 'Web Development',
  seller: 'Austin Parks',
  img: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  createdAtLabel: new Date().toLocaleDateString(),
  disabled: false,
  offer: 'offer',
  ownerLabel: 'I wil do a best service for you',
}, {
  id: 2,
  isFavorite: false,
  title: 'Mobile Development',
  seller: 'Kathryn Hamilton',
  img: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  createdAtLabel: new Date().toLocaleDateString(),
  disabled: false,
  offer: 'offer',
  ownerLabel: 'I wil do a best service for you',
}, {
  id: 3,
  isFavorite: false,
  title: 'Software Development',
  seller: 'Gerald Jennings',
  img: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  createdAtLabel: new Date().toLocaleDateString(),
  disabled: false,
  offer: 'offer',
  ownerLabel: 'I wil do a best service for you',
}]
</script>

<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      <GigCard
        v-for="item in items" :key="item.id"
        v-bind="item"
        :to="`/${user?.id}/gig/${item.id}/detail`"
      />
    </div>
  </div>
</template>

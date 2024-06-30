<script setup lang="ts">
const route = useRoute()

async function getStripeSession() {
  const { session } = await $fetch('/api/checkout', {
    method: 'GET',
    query: {
      session_id: route.query.session_id,
    },
  })

  if (session) {
    navigateTo(`/?email=${session.metadata?.email}`)
  }
}

getStripeSession()
</script>

<template>
  <div>
    Hello
  </div>
</template>

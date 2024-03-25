<script setup lang="ts">
// Call the composable to get the Stripe instance
const stripe = await useClientStripe()

// Use the Stripe instance to interact with the stripe.js library
// stripe.redirectToCheckout(...)
</script>

<template>
  <h1>Nuxt Stripe instance</h1>
  <div>
    {{ stripe ? stripe : 'Loading...' }}
  </div>
</template>

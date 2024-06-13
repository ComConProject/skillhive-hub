<script setup lang="ts">
async function test() {
  try {
    const { products } = await $fetch<any>('/api/products', {
      method: 'GET',

    })
    console.log(products)
  }
  catch (error) {
    console.error('Error:', error)
  }
}
async function createProduct() {
  try {
    const { products } = await $fetch<any>('/api/products', {
      method: 'POST',
      body: {
        name: 'test',
        description: 'test',
        unit_amount: 1000,
      },
    })
    console.log(products)
  }
  catch (error) {
    console.error('Error:', error)
  }
}
</script>

<template>
  <div>
    <h1>Hello</h1>
    <UButton @click="test">
      Get products
    </UButton>
    <UButton @click="createProduct">
      Create product
    </UButton>
  </div>
</template>

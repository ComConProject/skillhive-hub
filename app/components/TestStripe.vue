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

const data = [
  {
    id: 1,
    name: 'aaa',
    price: 1000,
  },
  {
    id: 2,
    name: 'bbb',
    price: 2000,
  },
]

async function createProduct() {
  try {
    data.forEach(async (product) => {
      const { products } = await $fetch<any>('/api/products', {
        method: 'POST',
        body: {
          name: product.name,
          description: product.name,
          unit_amount: 1000,
          packageId: product.id,
        },
      })
      console.log(products)
    })
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

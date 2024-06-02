<script setup lang="ts">
const route = useRoute('username-gig-id-detail___lo')

const { id } = route.params
</script>

<template>
  <div>
    <div class="flex flex-col sm:flex-row w-full sm:justify-center space-x-0 sm:space-x-3 lg:space-x-16">
      <div class="w-full space-y-8 mb-2">
        <GigDetailHeader />
        <h1 class="text-3xl font-bold break-words text-[#3F3F3F]">
          Web Development
        </h1>
        <SellerDetail />
        <GigImages />
        <GigDescription />
        <UAlert icon="i-line-md-alert-square" title="Delivery preferences">
          <template #description>
            <p>Please communicate any preferences or concerns regarding the utilization of AI tools in the fulfillment and/or delivery of your request.</p>
          </template>
        </UAlert>
        <SellerDetails />
        <ReviewAdd />
      </div>
      <TheOffers />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<template>
  <div
    className="
            flex
            w-full
            h-fit
            items-center
            space-x-2
            sm:space-x-1
            md:space-x-3
            text-sm
            md:text-md
            "
  >
    <NuxtLink to="/">
      <Icon name="line-md:home" class="w-5 h-5" />
    </NuxtLink>
    <p className="text-muted-foreground cursor-default">
      /
    </p>
    <p className="cursor-default">
      Web Development
    </p>
    <p className="text-muted-foreground cursor-default">
      /
    </p>
    <div className="font-medium cursor-pointer">
      Web Design
    </div>
    <UButton>
      <NuxtLink to="">
        Edit gig
      </NuxtLink>
    </UButton>
  </div>
</template>

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
    <NuxtLinkLocale to="/">
      <Icon name="line-md:home" class="w-5 h-5" />
    </NuxtLinkLocale>
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
      <NuxtLinkLocale to="">
        Edit gig
      </NuxtLinkLocale>
    </UButton>
  </div>
</template>

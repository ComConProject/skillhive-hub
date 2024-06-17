<script setup lang="ts">

</script>

<template>
  <div className="h-full flex flex-col items-center justify-center">
    <NuxtImg
      src="/empty-inbox.svg"
      alt="Empty"
      width="340"
      height="340"
    />
    <h2 className="text-2xl font-semibold mt-6 text-black">
      {{ $t('inbox.welcome') }}!
    </h2>
    <p className="text-muted-foreground text-sm mt-2">
      {{ $t('inbox.no_conversation_yet') }}
    </p>
  </div>
</template>

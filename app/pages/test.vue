<script setup lang="ts">
const { handleUpload } = useUpload()
const serviceId = 'test'
const paths = ref<any[]>([])
async function onUpload(e: FileList) {
  Array.from(e).forEach(async (file) => {
    const path = await handleUpload(file, serviceId)
    paths.value.push(path)
  })
}
</script>

<template>
  <div>
    <h1>Test</h1>
    <UInput type="file" multiple @change="onUpload" />
    {{ paths }}
  </div>
</template>

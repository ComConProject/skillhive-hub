<script setup lang="ts">
const { handleUpload, filePaths } = useUpload()
const serviceId = 'test'
async function onUpload(e: FileList) {
  Array.from(e).forEach((file) => {
    console.log(file)
    handleUpload(file, serviceId)
  })
  // await handleUpload(e, serviceId)
  console.log(filePaths.value)
}
</script>

<template>
  <div>
    <h1>Test</h1>
    <UInput type="file" multiple @change="onUpload" />
  </div>
</template>

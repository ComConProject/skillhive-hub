<script setup lang="tsx">
const t = ref('')
const msg = ref('Hello World From variables')

function Foo(props: { msg: string }) {
  const { msg } = props
  return (
    <div>
      {msg}
    </div>
  )
}
</script>

<template>
  <div>
    Hello
    <CustomInput v-model:search="t" type="number" placeholder="Please input your number" />
    {{ t }}
    <Foo :msg="msg" />
  </div>
</template>

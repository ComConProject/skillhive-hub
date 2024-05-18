<script setup lang="ts">
import type { Database } from '~/database.types'

const supabase = useSupabaseClient<Database>()

const { data } = await supabase.from('freelancer').select()
console.log(data)
</script>

<template>
  <div />
</template>

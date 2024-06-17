<script setup lang="ts">
import type { Database } from '@/database.types'

interface Todo {
  id: number
  title: string
  is_complete: boolean
}

const client = useSupabaseClient<Database>()
const user = useSupabaseUser()
const { state, todos, loading, isUpdate, getTodo, addTodo, updateTodo, deleteTodo } = useTodo()

function useTodo() {
  const todos = ref<Todo[]>([])
  const state = ref({
    title: '',
  })
  const loading = shallowRef(false)
  const isUpdate = shallowRef(false)

  async function getTodo() {
    const { data, error } = await client.from('todo').select()
    if (error) {
      console.error(error.message)
      return
    }

    todos.value = data as Todo[]
  }

  async function addTodo() {
    loading.value = true
    const { data, error } = await client.from('todo').insert({
      title: state.value.title,
      user_email: user.value?.email,
    }).select()
    if (error) {
      loading.value = false
      console.error(error.message)
      return
    }
    if (!data)
      return
    todos.value.push(data[0])
    state.value.title = ''
    loading.value = false
  }

  async function updateTodo(todo: Todo) {
    if (todo.is_complete)
      return
    isUpdate.value = true
    const { error } = await client.from('todo').update({
      is_complete: true,
    }).eq('id', todo.id)
    if (error) {
      isUpdate.value = false
      console.error(error.message)
      return
    }

    getTodo()
    isUpdate.value = false
  }

  async function deleteTodo(todo: Todo) {
    const { error, data } = await client.from('todo').delete().eq('id', todo.id)
    if (error)
      console.error(error.message)
    if (!data)
      todos.value = todos.value.filter(t => t.id !== todo.id)
  }
  return {
    state,
    todos,
    loading,
    isUpdate,
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo,
  }
}

await getTodo()
</script>

<template>
  <div class="flex justify-center w-full">
    <div class="mx-auto w-full flex flex-col items-center">
      <h1 class="text-3xl text-center mb-4 font-semibold">
        Things to do
      </h1>
      <UCard class="max-w-md w-full flex flex-col items-center">
        <div class="flex gap-2">
          <UFormGroup class="w-[200px]">
            <UInput v-model="state.title" placeholder="What you want to do?" />
          </UFormGroup>
          <UButton :loading="loading" icon="i-heroicons-plus" :disabled="!state.title" @click="addTodo" />
        </div>
        <ul class="mt-6 space-y-1">
          <li
            v-for="todo in todos" :key="todo.id" class="flex group justify-between items-center hover:bg-slate-100 dark:hover:bg-slate-700 transition p-1 rounded-md hover:cursor-pointer" :class="{
              'line-through bg-primary-100': todo.is_complete,
              'hover:cursor-wait': isUpdate,
            }" @click="updateTodo(todo)"
          >
            <span>
              {{ todo.title }}
            </span>
            <span class="group-hover:hidden">
              <UIcon v-if="todo.is_complete" name="i-heroicons-check" color="green" />
            </span>
            <span class="group-hover:block" :class="{ hidden: todo.is_complete }" @click="deleteTodo(todo)">
              <UIcon v-if="todo.is_complete" name="i-heroicons-trash" color="green" />
            </span>
          </li>
        </ul>
      </UCard>
    </div>
  </div>
</template>

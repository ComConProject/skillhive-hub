<script setup lang="ts">
import { TermGroup } from '../constants/'
import type { Database } from '~/database.types'
import type { CustomTerm, Term } from '~/types'

const { supabase } = useCustomSupabase()
const router = useRouter()
const category = shallowRef<CustomTerm[]>([])
const showModal = ref(false)

async function fetchCategory() {
  const { data, error } = await supabase.from('term').select('*').eq('group_id', TermGroup.CATEGORY).eq('active', true)
  if (error) {
    throw new Error(`[fetchCategory] ${error.message}`)
  }

  if (data) {
    category.value = organizeCategories(data)
  }
}

function organizeCategories(categories: CustomTerm[]) {
  const categoryMap = new Map()
  const rootCategories: Term[] = []

  // Initialize the map
  categories.forEach((cat) => {
    cat.children = []
    categoryMap.set(cat.id, cat)
  })

  // Organize categories into parent-child structure
  categories.forEach((cat) => {
    if (cat.parent_id) {
      const parent = categoryMap.get(cat.parent_id)
      if (parent) {
        parent.children.push(cat)
      }
    }
    else {
      rootCategories.push(cat)
    }
  })

  return rootCategories
}

// handleClick when user click add subcategory to query
function handleClick(subcategory: Term) {
  const router = useRouter()
}

onMounted(() => {
  fetchCategory()
})
</script>

<template>
  <div>
    <UButton icon="i-fluent-filter-12-regular" color="gray" variant="ghost" @click="showModal = true" />
    <UModal v-model="showModal" class="overflow-y-auto max-h-[calc(100vh-200px)]">
      <div class="p-4">
        <ul class="space-y-2">
          <li v-for="i in category" :key="i.id" class="p-4 bg-white rounded-lg shadow-md">
            <h3 class="text-lg font-semibold mb-4">
              {{ i.name }}
            </h3>
            <div>
              <div
                v-for="(subcategory, subIndex) in i.children"
                :key="subIndex"
                :title="subcategory.name"
                :subcategory="subcategory"
              >
                <button
                  class="select-none rounded-md p-3 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  @click="() => { }"
                >
                  <div className="text-sm text-gray-700 font-medium leading-none">
                    {{ subcategory.name }}
                  </div>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </UModal>
  </div>
</template>

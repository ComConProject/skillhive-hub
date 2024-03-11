<script setup lang="ts">
import type { Database } from '~/database.types'

interface IBase {
  id: number
  lo: string
  en: string
  is_active: boolean | null
}

interface Province extends IBase {

}

interface District extends IBase {
  provinces: Province | null
}

interface Village extends IBase {
  districts: District | null
}
const t = ref('')

const { provinces, fetchProvinces } = useLocation()
const { fetchDistricts, districts, search, fetchVillages } = useInlineLocation()

function useInlineLocation() {
  const supabase = useSupabaseClient<Database>()
  const search = ref('')

  const provinces = shallowRef<Province[]>([])
  async function fetchProvinces() {
    const { data, error } = await supabase.from('provinces').select().like('lo', `%${search.value}%`)
    if (error)
      throw new Error(error.message)

    provinces.value = data
    return data
  }

  const districts = shallowRef<District[]>([])
  async function fetchDistricts(provId: number) {
    const { data, error } = await supabase.from('districts').select(`id, lo, en, is_active, provinces(*)`).eq('prov_id', provId)
    if (error)
      throw new Error(error.message)

    districts.value = data
    return data
  }

  const villages = shallowRef<Village[]>([])
  async function fetchVillages(distId: number) {
    const { data, error } = await supabase.from('villages').select(`id, lo, en, is_active, districts(id, lo, en, is_active, provinces(*))`).eq('dist_id', distId)
    if (error)
      throw new Error(error.message)

    villages.value = data
    return data
  }

  onMounted(() => {
    fetchProvinces()
  })

  watch(search, () => {
    fetchProvinces()
  })

  return {
    districts,
    search,
    provinces,
    villages,
    fetchProvinces,
    fetchDistricts,
    fetchVillages,
  }
}

onMounted(() => {
  fetchProvinces()
})
</script>

<template>
  <div>
    Hello
    <CustomInput v-model:search="t" type="select" placeholder="Please input your number" />
    {{ t }}
    <div class="flex gap-10">
      <UInput v-model="search" />
      <ul>
        <li v-for="i in provinces" :key="i.id">
          <UButton :label="i.lo" @click="fetchDistricts(i.id)" />
        </li>
      </ul>
      <ul v-if="districts.length">
        <li v-for="i in districts" :key="i.id">
          <UButton :label="i.lo" @click="fetchVillages(i.id)" />
        </li>
      </ul>
    </div>
  </div>
</template>

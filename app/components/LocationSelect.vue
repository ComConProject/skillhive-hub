<script setup lang="ts">
import type { District, Province, Village } from '~/types'

const emits = defineEmits(['setLocation'])
const villageId = defineModel<number | undefined>('village')
const showModal = defineModel<boolean>('show')

const { fetchProvinces, provinces, fetchDistricts, fetchVillages, villages, districts } = useLocation()

const step = ref(1)
const selectedItem = ref({
  province: null as any,
  district: null as any,
  village: null as any,
})
const villageSearch = ref('')
const { locale } = useI18n()

const filteredItems = computed(() => {
  const query = villageSearch.value.toLocaleLowerCase()
  return villages.value.filter(i =>
    locale.value === 'lo' ? i.lo.toLocaleLowerCase().includes(query) : i.en.toLocaleLowerCase().includes(query),
  )
})

async function getDistricts(p: Province) {
  await fetchDistricts(`prov_id.eq.${p.id}`)
  const name = locale.value === 'lo' ? p.lo : p.en
  selectedItem.value.province = name
  step.value++
}

async function getVillages(d: District) {
  await fetchVillages(`dist_id.eq.${d.id}`)
  const name = locale.value === 'lo' ? d.lo : d.en
  selectedItem.value.district = name
  step.value++
}

function setVillage(v: Village) {
  villageId.value = v.id
  const name = locale.value === 'lo' ? v.lo : v.en
  selectedItem.value.village = name
  emits('setLocation', selectedItem.value)
  handleClose()
}

async function handleClose() {
  showModal.value = false
  step.value = 1
  districts.value = []
  villages.value = []
  provinces.value = []
  selectedItem.value = {
    province: null as any,
    district: null as any,
    village: null as any,
  }

  await fetchProvinces()
}

fetchProvinces()
</script>

<template>
  <div>
    <UModal v-model="showModal" class="max-w-[300px]" prevent-close>
      <UCard class="">
        <section class="flex flex-col gap-4">
          <div class="grid grid-cols-2 items-center">
            <div class="flex items-center gap-2">
              <UButton
                v-if="step > 1"
                variant="ghost" icon="i-fluent-chevron-left-24-regular" size="sm"
                color="gray" @click="step--"
              />
              <div>
                <UInput
                  v-model="villageSearch"
                  :placeholder="`${$t('location.village')}...`"
                  :disabled="villages.length === 0"
                  clearable
                >
                  <template #prefix>
                    <Icon name="fluent:search-16-regular" />
                  </template>
                </UInput>
              </div>
            </div>
            <div class="ml-auto">
              <UButton size="sm" variant="ghost" color="gray" @click="handleClose">
                <Icon name="material-symbols:cancel" size="20" />
              </UButton>
            </div>
          </div>
          <hr>
          <div class="flex flex-wrap items-center gap-1 text-xs">
            <span v-if="selectedItem.province">
              {{ selectedItem.province }}
            </span>
            <Icon
              v-if="selectedItem.district"
              name="fluent:chevron-right-24-regular"
            />
            <span v-if="selectedItem.district">
              {{ selectedItem.district }}
            </span>
            <Icon
              v-if="selectedItem.village"
              name="fluent:chevron-right-24-regular"
            />
            <span v-if="selectedItem.village">
              {{ selectedItem.village }}
            </span>
          </div>
          <ul class="flex flex-col gap-1">
            <TransitionGroup name="slide-left">
              <template v-if="step === 1">
                <li
                  v-for="p in provinces"
                  :key="p.id"
                  class="cursor-pointer px-1 transition hover:bg-slate-100"
                  @click="getDistricts(p)"
                >
                  <div class="flex w-full justify-between">
                    <div>{{ p.lo }}</div>
                    <div>
                      <Icon name="fluent:chevron-right-24-regular" />
                    </div>
                  </div>
                </li>
              </template>
              <template v-if="step === 2">
                <li
                  v-for="d in districts"
                  :key="d.id"
                  class="cursor-pointer px-1 transition hover:bg-slate-100"
                  @click="getVillages(d)"
                >
                  <div class="flex w-full justify-between">
                    <div>{{ d.lo }}</div>
                    <div>
                      <Icon name="fluent:chevron-right-24-regular" />
                    </div>
                  </div>
                </li>
              </template>
              <template v-if="step === 3">
                <li
                  v-for="v in filteredItems"
                  :key="v.id"
                  class="cursor-pointer px-1 transition hover:bg-slate-100"
                  @click="setVillage(v)"
                >
                  <div class="flex w-full justify-between">
                    <div>{{ v.lo }}</div>
                    <div>
                      <Icon name="fluent:chevron-right-24-regular" />
                    </div>
                  </div>
                </li>
              </template>
            </TransitionGroup>
          </ul>
        </section>
      </UCard>
    </UModal>
  </div>
</template>

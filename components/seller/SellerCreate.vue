<script setup lang="ts">
import { type InferType, object, string } from 'yup'
import { v4 as uuid } from 'uuid'
import type { Database } from '~/database.types'
import type { FormSubmitEvent } from '#ui/types'
import { TermGroup } from '~/constants'

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const { step, languages, handleUpload, handleCreateLanguage, onSubmit, schema, state, formatTerms, levelId } = useInlineForm()
const toast = useToast()

function useInlineForm() {
  const { terms, fetchTerms } = useTerm()
  const schema = object({
    firstname: string().required('First name is required'),
    lastname: string().required('Last name is required'),
    phone: string().required('Phone is required'),
    email: string().email('Invalid email').required('Email is required'),
    username: string().required('Username is required'),
  })

type Schema = InferType<typeof schema>

const state = useState('seller-form-state', () => ({
  firstname: undefined,
  lastname: undefined,
  phone: undefined,
  email: undefined,
  username: undefined,
  skills: undefined,
  profile: undefined,
  description: undefined,
  language: undefined,
}))

const step = ref(1)
const languages = ref<{
  name: string
  levelId: number
  levelName: string
}[]>([])
async function handleUpload(e: any) {
  const file = e[0]
  // Upload the file to Supabase
  const { data, error } = await supabase.storage.from('default').upload(`${user.value?.id}/${uuid()}`, file)

  if (error) {
    console.error(error)
    return
  }
  if (data) {
    console.log(data)
    state.value.profile = data.path as any
  }
}

const levelId = ref<any>(null)
async function handleCreateLanguage(levelId: number) {
  if (state.value.language === undefined) {
    console.log('sss')
    toast.add({
      id: 'language',
      title: 'Language is required',
      icon: 'i-fluent-warning-24-filled',
      color: 'red',
    })
    return
  }

  const level = terms.value.find(i => i.id === levelId)
  if (!level)
    return
  if (state.value.language) {
    languages.value.push({ name: state.value.language, levelId: level.id, levelName: level.name })
    state.value.language = undefined
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
}

async function getTerm() {
  await fetchTerms(TermGroup.LANGUAGE)
}

const formatTerms = computed(() => {
  return terms.value.map(i => ({
    id: i.id,
    label: i.name,
  }))
})

onMounted(() => {
  getTerm()
})

return {
  state,
  schema,
  formatTerms,
  terms,
  step,
  languages,
  levelId,
  handleUpload,
  handleCreateLanguage,
  onSubmit,
}
}
</script>

<template>
  <div>
    <UCard class="mx-auto max-w-6xl">
      <UForm :schema="schema" :state="state" @submit="onSubmit">
        <TransitionGroup name="slide-left">
          <section v-show="step === 1" key="1" class="grid grid-cols-2 gap-2">
            <!-- step -->
            <div class=" text-3xl col-span-2 font-bold text-slate-800 mb-4">
              Create your profile
            </div>
            <UFormGroup label="First Name" name="firstname" required>
              <UInput v-model="state.firstname" placeholder="Please input your first name" />
            </UFormGroup>
            <UFormGroup label="Last Name" name="lastname" required>
              <UInput v-model="state.lastname" placeholder="Please input your last name" />
            </UFormGroup>
            <UFormGroup label="Display Name" name="username" required>
              <UInput v-model="state.username" placeholder="Please input your display name" />
            </UFormGroup>
            <UFormGroup label="Description" name="description">
              <UTextarea v-model="state.description" placeholder="Please input your description" />
            </UFormGroup>
            <UFormGroup label="Phone" name="phone">
              <UInput v-model="state.phone" type="tel" placeholder="Please input your phone number" />
            </UFormGroup>
            <UFormGroup label="Profile" name="profile">
              <UInput type="file" @change="handleUpload" />
            </UFormGroup>
            <UFormGroup label="Languages" name="languages" class="col-span-2">
              <div class="flex gap-2">
                <UInput v-model="state.language" type="text" placeholder="Please input your language" />
                <USelectMenu
                  v-model="levelId" :options="formatTerms" value-attribute="id"
                  option-attribute="label"
                />
                <UButton @click="handleCreateLanguage(levelId)">
                  Add
                </UButton>
              </div>
            </UFormGroup>
            <div class="col-span-2">
              <table class="w-full table-auto text-left">
                <thead class="border-y border-slate-100 dark:border-slate-800">
                  <tr>
                    <th class="px-2 py-1.5">
                      */
                      //                      Language
                    </th>
                    <th class="px-2 py-1.5">
                      Level
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr v-for="(language, idx) in languages" :key="idx">
                    <td class="px-2 py-1.5">
                      {{ language.name }}
                    </td>
                    <td class="px-2 py-1.5">
                      {{ language.levelName }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section v-show="step === 2" key="2" class="">
            Hello World
          </section>
        </TransitionGroup>
        <div class="flex gap-1 mt-4 items-center col-span-2">
          <UButton v-if="step === 1" variant="outline" @click="$router.back()">
            Go back
          </UButton>
          <UButton v-if="step > 1" variant="outline" @click="step--">
            Go back
          </UButton>
          <UButton v-if="step < 3" @click="step++">
            Next
          </UButton>
          <UButton v-if="step === 3" type="submit">
            Submit
          </UButton>
        </div>
      </UForm>
    </UCard>
  </div>
</template>

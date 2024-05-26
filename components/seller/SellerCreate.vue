<script setup lang="ts">
import { type InferType, object, string } from 'yup'
import { v4 as uuid } from 'uuid'
import type { Database } from '~/database.types'
import type { FormSubmitEvent } from '#ui/types'
import { TermGroup } from '~/constants'
import type { Term } from '~/types'

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const { step, languages, handleUpload, handleCreateLanguage, onSubmit, schema, state, formatTerms, levelId, occupations, skillLevel, skills, skillsLevels, subOccupations, handleCreateSkill, handleCreateOccupation } = useInlineForm()
const toast = useToast()

const loading = ref(false)

function useInlineForm() {
  const { terms, fetchTerms } = useTerm()
  const schema = object({
    firstname: string().required('First name is required'),
    lastname: string().required('Last name is required'),
    phone: string().required('Phone is required'),
    email: string().email('Invalid email').required('Email is required'),
    username: string().required('Username is required'),
    description: string().notRequired(),
    profile: string().notRequired(),
    skill: string().notRequired(),
    language: string().notRequired(),
    occupation: string().notRequired(),
    personalWebsite: string().notRequired(),
  })

type Schema = InferType<typeof schema>

const state = useState('seller-form-state', () => ({
  firstname: undefined,
  lastname: undefined,
  phone: undefined,
  email: undefined,
  username: undefined,
  skill: undefined,
  profile: undefined,
  description: undefined,
  language: undefined,
  occupation: undefined,
  personalWebsite: undefined,
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
  if (data)
    state.value.profile = data.path as any
}

const levelId = ref<any>(null)
const skillLevel = ref<any>(null)
const languagesTerm = shallowRef<Term[]>([])
async function handleCreateLanguage(levelId: number) {
  if (state.value.language === undefined) {
    toast.add({
      id: 'language',
      title: 'Language is required',
      icon: 'i-fluent-warning-24-filled',
      color: 'red',
    })
    return
  }

  const level = languagesTerm.value.find(i => i.id === levelId)
  if (!level)
    return
  if (state.value.language) {
    languages.value.push({ name: state.value.language, levelId: level.id, levelName: level.name })
    state.value.language = undefined
  }
}
const subOccupations = ref<{
  name: string
  levelId: number
  levelName: string
  checked: boolean
}[]>([])

const skillsLevels = shallowRef<Term[]>([])
const skills = ref<{
  name: string
  levelId: number
  levelName: string
}[]>([])
async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
  loading.value = true
  const { data, error } = await supabase.from('freelancer').insert({
    firstname: event.data.firstname,
    lastname: event.data.lastname,
    phone: event.data.phone,
    email: event.data.email,
    username: event.data.username,
    description: event.data.description,
    profile_url: event.data.profile,
  }).select()
  if (error) {
    loading.value = false
    throw new Error(`[onSubmit] freelancer table ${error.message}`)
  }
  const freelancerId = data[0].id

  // create portfolio
  const { error: portfolioError } = await supabase.from('portfolio').insert({
    url: event.data.personalWebsite,
    freelancer_id: freelancerId,
    title: 'Personal website',
    description: 'Personal website',
  })

  if (portfolioError) {
    loading.value = false
    throw new Error(`[onSubmit] portfolio table ${portfolioError.message}`)
  }

  // create language
  const languageObjs = languages.value.map((i) => {
    return { name: i.levelName, term_id: i.levelId, freelancer_id: freelancerId }
  })
  const { error: languageError } = await supabase.from('language').insert(languageObjs)
  if (languageError) {
    loading.value = false
    throw new Error(`[onSubmit] language table ${languageError.message}`)
  }

  // create occupation
  const occupationObjs = subOccupations.value.filter(i => (i.checked)).map((e) => {
    return {
      seller_id: freelancerId,
      term_id: e.levelId,
      description: `${e.name} - ${e.levelName}`,
    }
  })
  const { error: occupationError } = await supabase.from('freelancer_occupation').insert([
    {
      seller_id: freelancerId,
      term_id: event.data.occupation as any,
      description: `${event.data.occupation} - ${event.data.occupation}`,
    },
    ...occupationObjs,
  ])

  if (occupationError) {
    loading.value = false
    throw new Error(`[onSubmit] occupation table ${occupationError.message}`)
  }

  // create skill
  const skillObjs = skills.value.map((i) => {
    return { name: i.name, level: `${i.levelId}`, freelancer_id: freelancerId, description: i.levelName }
  })
  const { error: skillError } = await supabase.from('skill').insert(skillObjs)
  if (skillError) {
    loading.value = false
    throw new Error(`[onSubmit] skill table ${skillError.message}`)
  }
  toast.add({
    id: 'success',
    title: 'Success',
    icon: 'i-fluent-checkmark-24-filled',
    color: 'green',
  })
  loading.value = false
}

async function getTerm() {
  languagesTerm.value = await fetchTerms(TermGroup.LANGUAGE)
}

const occupations = shallowRef<Term[]>([])

const childOccupations = shallowRef<Term[]>([])
async function getOccupation() {
  const data = await fetchTerms(TermGroup.CATEGORY)
  const parentData = data
  occupations.value = parentData.filter(i => i.parent_id === null)
  childOccupations.value = parentData.filter(i => i.parent_id !== null)
}

function handleCreateOccupation(occupationId: number) {
  if (state.value.occupation === undefined) {
    toast.add({
      id: 'occupation',
      title: 'Occupation is required',
      icon: 'i-fluent-warning-24-filled',
      color: 'red',
    })
    return
  }
  const level = childOccupations.value.filter(i => i.parent_id === occupationId)
  if (!level)
    return
  subOccupations.value = level.map(i => ({ name: i.name, levelId: i.id, levelName: i.name, checked: false }))
}

async function getSkillLevel() {
  const data = await fetchTerms(TermGroup.SKILL_LEVEL)
  skillsLevels.value = data
}

function handleCreateSkill(skillLevelId: number) {
  if (state.value.skill === undefined) {
    toast.add({
      id: 'skill',
      title: 'Skill is required',
      icon: 'i-fluent-warning-24-filled',
      color: 'red',
    })
    return
  }
  const level = skillsLevels.value.find(i => i.id === skillLevelId)
  if (!level)
    return
  if (state.value.skill)
    skills.value.push({ name: state.value.skill, levelId: level.id, levelName: level.name })
  state.value.skill = undefined
}

const formatTerms = computed(() => {
  return languagesTerm.value.map(i => ({
    id: i.id,
    label: i.name,
  }))
})

onMounted(() => {
  getTerm()
  getOccupation()
  getSkillLevel()
})

return {
  state,
  schema,
  formatTerms,
  terms,
  skillsLevels,
  step,
  skills,
  languages,
  subOccupations,
  handleCreateSkill,
  levelId,
  occupations,
  skillLevel,
  handleUpload,
  handleCreateOccupation,
  handleCreateLanguage,
  onSubmit,
}
}

if (user.value?.email)
  state.value.email = user.value?.email as any
</script>

<template>
  <div>
    <UCard class="mx-auto max-w-6xl">
      <UForm :schema="schema" :state="state" @submit="onSubmit">
        <TransitionGroup name="slide-left">
          <section v-show="step === 1" key="1" class="flex flex-col gap-2">
            <!-- step -->
            <div class=" text-3xl col-span-1 font-bold text-slate-800 mb-4">
              Create your profile
            </div>
            <UFormGroup :label="$t('firstname')" name="firstname" required>
              <UInput v-model="state.firstname" placeholder="Please input your first name" />
            </UFormGroup>
            <UFormGroup :label="$t('lastname')" name="lastname" required>
              <UInput v-model="state.lastname" placeholder="Please input your last name" />
            </UFormGroup>
            <UFormGroup :label="$t('username')" name="username" required>
              <UInput v-model="state.username" placeholder="Please input your display name" />
            </UFormGroup>
            <UFormGroup :label="$t('description')" name="description">
              <UTextarea v-model="state.description" placeholder="Please input your description" />
            </UFormGroup>

            <UFormGroup :label="$t('profile.profile')" name="profile">
              <UInput type="file" @change="handleUpload" />
            </UFormGroup>
            <UFormGroup :label="$t('language')" name="languages" class="col-span-2">
              <div class="flex gap-2">
                <UInput v-model="state.language" class="min-w-52" type="skill" placeholder="Please input your language" />
                <USelectMenu
                  v-model="levelId"
                  class="min-w-40" :options="formatTerms" value-attribute="id"
                  option-attribute="label"
                  placeholder="Language level"
                />
                <UButton @click="handleCreateLanguage(levelId)">
                  {{ $t('form.add') }}
                </UButton>
              </div>
            </UFormGroup>
            <div v-if="languages.length" class="col-span-2">
              <table class="w-full table-auto text-left">
                <thead class="border-y border-slate-100 dark:border-slate-800">
                  <tr>
                    <th class="px-2 py-1.5">
                      {{ $t('language') }}
                    </th>
                    <th class="px-2 py-1.5">
                      {{ $t('guide.level') }}
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
          <section v-show="step === 2" key="2" class="grid grid-cols-2 gap-2">
            <div class=" text-3xl col-span-2 font-bold text-slate-800 mb-4">
              Professional Information
            </div>
            <UFormGroup :label="$t('occupation')" name="occupation">
              <USelectMenu
                v-model="state.occupation"
                :options="occupations" value-attribute="id" option-attribute="name" placeholder="Please input your occupation" @change="handleCreateOccupation(state.occupation as any)"
              />
            </UFormGroup>
            <UFormGroup class="col-span-2" label="Select at least 2" name="subOccupations">
              <div>
                <ul class="grid grid-cols-4 gap-2">
                  <li v-for="(i, idx) in subOccupations" :key="idx">
                    <UCheckbox v-model="i.checked" :label="i.name" />
                  </li>
                </ul>
              </div>
            </UFormGroup>
            <UFormGroup :label="$t('skill')" name="skill" class="col-span-2">
              <div class="flex gap-2">
                <UInput v-model="state.skill" class="min-w-52" type="skill" placeholder="Please input your language" />
                <USelectMenu
                  v-model="skillLevel"
                  class="min-w-40" :options="skillsLevels" value-attribute="id"
                  option-attribute="name"
                  placeholder="Skill level"
                />
                <UButton @click="handleCreateSkill(skillLevel)">
                  {{ $t('form.add') }}
                </UButton>
              </div>
            </UFormGroup>
            <div v-if="skills.length" class="col-span-2">
              <table class="w-full table-auto text-left">
                <thead class="border-y border-slate-100 dark:border-slate-800">
                  <tr>
                    <th class="px-2 py-1.5">
                      {{ $t('skill') }}
                    </th>
                    <th class="px-2 py-1.5">
                      {{ $t('guide.level') }}
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr v-for="(skill, idx) in skills" :key="idx">
                    <td class="px-2 py-1.5">
                      {{ skill.name }}
                    </td>
                    <td class="px-2 py-1.5">
                      {{ skill.levelName }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <UFormGroup label="Personal Website" name="personalWebsite">
              <UInput v-model="state.personalWebsite" type="url" placeholder="your personal website" />
            </UFormGroup>
          </section>
          <section v-show="step === 3" key="3">
            <div class=" text-3xl col-span-2 font-bold text-slate-800 mb-4">
              Security
            </div>
            <UFormGroup :label="$t('email')" name="email" required>
              <UInput v-model="state.email" type="email" placeholder="Please input your email" />
            </UFormGroup>
            <UFormGroup :label="$t('phone')" name="phone" required>
              <UInput v-model="state.phone" type="tel" placeholder="Please input your phone number" />
            </UFormGroup>
          </section>
        </TransitionGroup>
        <div class="flex gap-1 mt-4 items-center col-span-2">
          <UButton v-if="step === 1" variant="outline" @click="$router.back()">
            {{ $t('go_back') }}
          </UButton>
          <UButton v-if="step > 1" variant="outline" @click="step--">
            {{ $t('go_back') }}
          </UButton>
          <UButton v-if="step < 3" @click="step++">
            {{ $t('next') }}
          </UButton>
          <UButton v-if="step === 3" type="submit" :loading="loading">
            {{ $t('form.submit') }}
          </UButton>
        </div>
      </UForm>
    </UCard>
  </div>
</template>

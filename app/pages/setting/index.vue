<script setup>
const form = ref({
  fullName: '',
  email: '',
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

function onSubmit() {
  // Handle form submission
  console.log('Form submitted:', form.value)
}

function onPasswordChange() {
  // Handle password change
  console.log('Password change submitted:', passwordForm.value)
}
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold mb-6">
      {{ $t('settings.your_account') }}
    </h1>

    <UCard class="mb-6">
      <template #header>
        <h2 class="text-xl font-semibold">
          {{ $t('settings.edit_profile') }}
        </h2>
      </template>

      <UForm :state="form" class="space-y-3" @submit="onSubmit">
        <UFormGroup :label="$t('name')" name="fullName">
          <UInput v-model="form.fullName" placeholder="Enter your full name" />
        </UFormGroup>

        <UFormGroup :label="$t('email')" name="email">
          <UInput v-model="form.email" type="email" placeholder="Enter your email" />
        </UFormGroup>

        <UButton type="submit" color="primary" class="mt-4">
          {{ $t('save') }}
        </UButton>
      </UForm>
    </UCard>

    <UCard class="mb-6">
      <template #header>
        <h2 class="text-xl font-semibold">
          {{ $t('settings.change_password') }}
        </h2>
      </template>

      <UForm :state="passwordForm" class="space-y-3" @submit="onPasswordChange">
        <UFormGroup :label="$t('current_password')" name="currentPassword">
          <UInput v-model="passwordForm.currentPassword" type="password" placeholder="Enter current password" />
        </UFormGroup>

        <UFormGroup :label="$t('new_password')" name="newPassword">
          <UInput v-model="passwordForm.newPassword" type="password" placeholder="Enter new password" />
        </UFormGroup>

        <UFormGroup :label="$t('confirm_password')" name="confirmPassword">
          <UInput v-model="passwordForm.confirmPassword" type="password" placeholder="Confirm new password" />
        </UFormGroup>

        <UButton type="submit" color="primary" class="mt-4">
          {{ $t('save') }}
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Back to Home -->
      <div class="text-left">
        <NuxtLink to="/" class="text-blue-600 hover:text-blue-500 font-medium flex items-center">
          ← Back to Home
        </NuxtLink>
      </div>

      <div>
        <h2 class="mt-2 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <NuxtLink to="/auth/login" class="font-medium text-blue-600 hover:text-blue-500">
            sign in to existing account
          </NuxtLink>
        </p>
      </div>

      <!-- User Type Selection -->
      <div class="grid grid-cols-3 gap-4 mb-6">
        <button
          v-for="type in userTypes"
          :key="type.value"
          @click="selectedType = type.value"
          :class="[
            'p-4 border rounded-lg text-center transition-colors',
            selectedType === type.value
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          ]"
        >
          <div class="text-2xl mb-2">{{ type.emoji }}</div>
          <div class="font-medium">{{ type.label }}</div>
        </button>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="full-name" class="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="full-name"
              v-model="form.fullName"
              type="text"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your full name"
            >
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
            >
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Create a password"
            >
          </div>
          <div>
            <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              id="confirm-password"
              v-model="form.confirmPassword"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Confirm your password"
            >
          </div>
        </div>

        <div class="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          >
          <label for="terms" class="ml-2 block text-sm text-gray-900">
            I agree to the 
            <NuxtLink to="/terms" class="text-blue-600 hover:text-blue-500">Terms</NuxtLink>
            and 
            <NuxtLink to="/privacy" class="text-blue-600 hover:text-blue-500">Privacy Policy</NuxtLink>
          </label>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Account as {{ selectedTypeLabel }}
          </button>
        </div>

        <!-- Sign In Prompt -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Already have an account? 
            <NuxtLink to="/auth/login" class="font-medium text-blue-600 hover:text-blue-500">
              Sign in here
            </NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const userTypes = [
  { value: 'brand', label: 'Brand', emoji: '🏢' },
  { value: 'influencer', label: 'Influencer', emoji: '⭐' },
  { value: 'agency', label: 'Agency', emoji: '🏢' }
]

const selectedType = ref('brand')

const form = ref({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const selectedTypeLabel = computed(() => {
  const type = userTypes.find(t => t.value === selectedType.value)
  return type?.label || 'User'
})

const handleRegister = () => {
  // TODO: Implement registration logic
  console.log('Registration attempt:', {
    ...form.value,
    userType: selectedType.value
  })
}
</script>
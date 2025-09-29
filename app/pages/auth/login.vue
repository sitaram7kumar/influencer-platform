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
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <NuxtLink to="/auth/register" class="font-medium text-blue-600 hover:text-blue-500">
            create a new account
          </NuxtLink>
        </p>
      </div>

      <!-- User Type Selection -->
      <div class="grid grid-cols-2 gap-4 mb-6">
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

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            >
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            >
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="form.rememberMe"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            >
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <NuxtLink to="/auth/forgot-password" class="font-medium text-blue-600 hover:text-blue-500">
              Forgot your password?
            </NuxtLink>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            :class="[
              'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors',
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            ]"
          >
            <span v-if="isLoading" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
            <span v-else>
              Sign in as {{ selectedTypeLabel }}
            </span>
          </button>
        </div>

        <!-- Demo Credentials -->
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 class="text-sm font-medium text-yellow-800 mb-2">Demo Credentials</h4>
          <p class="text-xs text-yellow-700">
            Email: any email<br>
            Password: <strong>password</strong>
          </p>
        </div>

        <!-- Sign Up Prompt -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Don't have an account? 
            <NuxtLink to="/auth/register" class="font-medium text-blue-600 hover:text-blue-500">
              Sign up here
            </NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
  middleware: 'guest'
})

const authStore = useAuthStore()
const router = useRouter()
// const { login, isLoading } = useAuth()

const userTypes = [
  { value: 'brand', label: 'Brand', emoji: '🏢' },
  { value: 'influencer', label: 'Influencer', emoji: '⭐' },
  { value: 'agency', label: 'Agency', emoji: '🏢' },
  { value: 'admin', label: 'Admin', emoji: '👨‍💼' }
]

const selectedType = ref('brand')
const form = ref({
  email: 'nike@example.com', // Pre-fill for testing
  password: 'password', // Pre-fill for testing
  rememberMe: false
})

watch(selectedType, (newType) => {
  const typeConfig = userTypes.find(t => t.value === newType)
  if (typeConfig) {
    form.value.email = typeConfig.email
  }
})


const selectedTypeLabel = computed(() => {
  const type = userTypes.find(t => t.value === selectedType.value)
  return type?.label || 'User'
})

const handleLogin = async () => {
  console.log('Login attempt:', form.value.email, selectedType.value)
  
  const result = await authStore.login(form.value.email, form.value.password, selectedType.value)
  
  if (result.success) {
    console.log('Login successful, redirecting...')
    setTimeout(() => {
      const redirectPath = getRedirectPath(result.user.type)
      navigateTo(redirectPath)
    }, 100)
  } else {
    alert(`Login failed: ${result.error}`)
  }
}

const getRedirectPath = (userType) => {
  const paths = {
    brand: '/brand/dashboard',
    influencer: '/influencer/dashboard',
    agency: '/agency/dashboard',
    admin: '/admin/dashboard'
  }
  return paths[userType] || '/'
}
</script>
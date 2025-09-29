<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">Auth Persistence Test</h1>
        
        <!-- Current State -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 class="font-semibold text-blue-800 mb-2">Vue Auth State</h3>
            <pre class="text-sm text-blue-700">{{ vueAuthState }}</pre>
          </div>
          
          <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 class="font-semibold text-green-800 mb-2">LocalStorage State</h3>
            <pre class="text-sm text-green-700">{{ localStorageState }}</pre>
          </div>
        </div>

        <!-- Actions -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button 
            @click="loginAsInfluencer"
            class="bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Login as Influencer
          </button>
          <button 
            @click="checkAuthState"
            class="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Check Auth State
          </button>
          <button 
            @click="logout"
            class="bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        <!-- Test Refresh -->
        <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 class="font-semibold text-yellow-800 mb-2">Refresh Test</h3>
          <p class="text-sm text-yellow-700 mb-4">
            After logging in, refresh this page. The auth state should persist.
          </p>
          <button 
            @click="refreshPage"
            class="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>

        <!-- Navigation Test -->
        <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg mt-6">
          <h3 class="font-semibold text-purple-800 mb-2">Navigation Test</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NuxtLink 
              to="/" 
              class="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors text-center"
            >
              Go to Home
            </NuxtLink>
            <NuxtLink 
              to="/influencer/dashboard" 
              class="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-center"
            >
              Go to Influencer Dashboard
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { user, isAuthenticated, login, logout, checkAuth } = useAuth()

const vueAuthState = computed(() => {
  return {
    isAuthenticated: isAuthenticated.value,
    user: user.value,
    userType: user.value?.type
  }
})

const localStorageState = computed(() => {
  if (process.client) {
    return {
      user: localStorage.getItem('user'),
      isAuthenticated: localStorage.getItem('isAuthenticated')
    }
  }
  return 'Client only'
})

const loginAsInfluencer = async () => {
  console.log('=== LOGIN AS INFLUENCER ===')
  const result = await login('sarah@example.com', 'password', 'influencer')
  
  if (result.success) {
    console.log('✅ Login successful')
    // Don't redirect - stay on this page to test persistence
  } else {
    alert(`Login failed: ${result.error}`)
  }
}

const checkAuthState = () => {
  console.log('=== CHECKING AUTH STATE ===')
  checkAuth()
  console.log('Current auth state:', vueAuthState.value)
}

const refreshPage = () => {
  window.location.reload()
}

// Log initial state
onMounted(() => {
  console.log('🔄 Auth Test Page mounted')
  console.log('Initial auth state:', vueAuthState.value)
})
</script>
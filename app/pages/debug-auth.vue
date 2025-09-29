<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">Auth Debug Info</h1>
        
        <!-- Current Auth State -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 class="font-semibold text-blue-800 mb-2">Auth State</h3>
            <pre class="text-sm text-blue-700">{{ authState }}</pre>
          </div>
          
          <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 class="font-semibold text-green-800 mb-2">Local Storage</h3>
            <pre class="text-sm text-green-700">{{ localStorageState }}</pre>
          </div>
        </div>

        <!-- Test Logins -->
        <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
          <h3 class="font-semibold text-yellow-800 mb-4">Test Logins</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              @click="loginAsInfluencer"
              class="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Login as Influencer
            </button>
            <button 
              @click="loginAsBrand"
              class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login as Brand
            </button>
          </div>
          <div class="mt-4 text-sm text-yellow-700">
            <p>Email: any email</p>
            <p>Password: <strong>password</strong></p>
          </div>
        </div>

        <!-- Test Routes -->
        <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 class="font-semibold text-purple-800 mb-4">Test Routes</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <NuxtLink 
              to="/influencer/test" 
              class="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-center"
            >
              Influencer Test
            </NuxtLink>
            <NuxtLink 
              to="/brand/dashboard" 
              class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              Brand Dashboard
            </NuxtLink>
            <NuxtLink 
              to="/influencer/dashboard" 
              class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center"
            >
              Influencer Dashboard
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { user, isAuthenticated, isLoading, login, logout } = useAuth()

const authState = computed(() => {
  return {
    isAuthenticated: isAuthenticated.value,
    isLoading: isLoading.value,
    user: user.value,
    userType: user.value?.type,
    hasRoleInfluencer: user.value?.type === 'influencer',
    hasRoleBrand: user.value?.type === 'brand'
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
  console.log('Login result:', result)
  
  if (result.success) {
    console.log('✅ Login successful, user:', result.user)
    // Force refresh to see updated state
    setTimeout(() => {
      window.location.reload()
    }, 500)
  } else {
    console.error('❌ Login failed:', result.error)
    alert(`Login failed: ${result.error}`)
  }
}

const loginAsBrand = async () => {
  console.log('=== LOGIN AS BRAND ===')
  const result = await login('nike@example.com', 'password', 'brand')
  console.log('Login result:', result)
  
  if (result.success) {
    console.log('✅ Login successful, user:', result.user)
    setTimeout(() => {
      window.location.reload()
    }, 500)
  } else {
    console.error('❌ Login failed:', result.error)
    alert(`Login failed: ${result.error}`)
  }
}
</script>
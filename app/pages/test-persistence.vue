<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">Persistence Test</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 class="font-semibold text-green-800 mb-2">Current State</h3>
            <pre class="text-sm text-green-700">{{ currentState }}</pre>
          </div>
          
          <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 class="font-semibold text-blue-800 mb-2">Test Actions</h3>
            <div class="space-y-2">
              <button 
                @click="loginAndStay"
                class="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
              >
                Login & Stay
              </button>
              <button 
                @click="goToInfluencerDashboard"
                class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Go to Influencer Dashboard
              </button>
              <button 
                @click="refresh"
                class="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>

        <!-- Instructions -->
        <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 class="font-semibold text-yellow-800 mb-2">Test Instructions</h3>
          <ol class="list-decimal list-inside text-sm text-yellow-700 space-y-1">
            <li>Click "Login & Stay"</li>
            <li>Click "Go to Influencer Dashboard" - should work</li>
            <li>Click "Refresh Page" - should stay on this page</li>
            <li>After refresh, click "Go to Influencer Dashboard" - should still work</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth-new', 
})

const { user, isAuthenticated, login } = useAuth()

const currentState = computed(() => {
  return {
    isAuthenticated: isAuthenticated.value,
    user: user.value,
    path: useRoute().path
  }
})

const loginAndStay = async () => {
  const result = await login('sarah@example.com', 'password', 'influencer')
  if (result.success) {
    console.log('✅ Logged in, staying on page')
  }
}

const goToInfluencerDashboard = () => {
  navigateTo('/influencer/dashboard')
}

const refresh = () => {
  window.location.reload()
}

onMounted(() => {
  console.log('Test page mounted - auth state:', currentState.value)
})
</script>
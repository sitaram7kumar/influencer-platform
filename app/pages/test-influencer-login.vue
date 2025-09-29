<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Test Influencer Login
        </h2>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-md">
        <p class="text-sm text-gray-600 mb-4">
          Use this page to test influencer login directly.
        </p>
        
        <button 
          @click="loginAsInfluencer"
          class="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Login as Influencer
        </button>
        
        <div class="mt-4 p-3 bg-gray-100 rounded">
          <p class="text-xs text-gray-600">
            Email: sarah@example.com<br>
            Password: password
          </p>
        </div>
        
        <!-- Debug Info -->
        <div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <h4 class="font-semibold text-yellow-800 mb-2">Debug Info:</h4>
          <p class="text-xs text-yellow-700">
            Is Authenticated: {{ isAuthenticated }}<br>
            User Type: {{ user?.type }}<br>
            User Name: {{ user?.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { login, user, isAuthenticated } = useAuth()

const loginAsInfluencer = async () => {
  console.log('Attempting influencer login...')
  
  const result = await login('sarah@example.com', 'password', 'influencer')
  
  if (result.success) {
    console.log('Influencer login successful!', result.user)
    // Redirect to influencer dashboard
    setTimeout(() => {
      navigateTo('/influencer/dashboard')
    }, 100)
  } else {
    console.error('Influencer login failed:', result.error)
    alert(`Login failed: ${result.error}`)
  }
}
</script>
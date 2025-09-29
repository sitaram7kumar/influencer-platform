<template>
  <div class="p-6">
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">🎉 Influencer Test Page</h1>
      
      <div class="p-4 bg-green-100 border border-green-300 rounded-lg mb-4">
        <p class="text-green-800 font-semibold">If you can see this page, the influencer layout is working!</p>
      </div>
      
      <div class="p-4 bg-blue-100 border border-blue-300 rounded-lg">
        <h3 class="font-semibold text-blue-800 mb-2">User Information:</h3>
        <pre class="text-sm text-blue-700">{{ userInfo }}</pre>
      </div>
      
      <div class="mt-4">
        <button 
          @click="goToDashboard"
          class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Go to Influencer Dashboard
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'influencer',
  middleware: 'auth-new', 
  requiredUserType: 'influencer'
})

const { user } = useAuth()
const router = useRouter()

const userInfo = computed(() => {
  return {
    name: user.value?.name,
    type: user.value?.type,
    email: user.value?.email,
    followers: user.value?.followers
  }
})

const goToDashboard = () => {
  navigateTo('/influencer/dashboard')
}

// Log when component mounts
onMounted(() => {
  console.log('🎯 Influencer Test Page mounted')
  console.log('User:', user.value)
})
</script>
<script setup>
definePageMeta({
  layout: 'default'
})

const authStore = useAuthStore()

// Optional: You can add a small banner for logged-in users
const isAuthenticated = computed(() => authStore.isAuthenticated)
const userType = computed(() => authStore.getUserType())
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Show a small banner for logged-in users -->
    <div v-if="isAuthenticated" class="bg-blue-50 border-b border-blue-200 py-2">
      <div class="container mx-auto px-4 text-center">
        <p class="text-sm text-blue-700">
          👋 Hello {{ authStore.user?.name }}! 
          <NuxtLink :to="getDashboardPath(userType)" class="font-semibold underline ml-2">
            Go to Dashboard
          </NuxtLink>
        </p>
      </div>
    </div>
    
    <div class="min-h-screen bg-white">
    <div class="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">About InfluenceHub</h1>
        <p class="text-xl text-gray-600 mb-8">
          Connecting brands with influencers for successful marketing campaigns.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl text-blue-600">🎯</span>
            </div>
            <h3 class="text-lg font-semibold mb-2">Our Mission</h3>
            <p class="text-gray-600">To create meaningful connections between brands and influencers.</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl text-green-600">🌟</span>
            </div>
            <h3 class="text-lg font-semibold mb-2">Our Vision</h3>
            <p class="text-gray-600">To be the leading platform for influencer marketing.</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl text-purple-600">🚀</span>
            </div>
            <h3 class="text-lg font-semibold mb-2">Our Values</h3>
            <p class="text-gray-600">Transparency, creativity, and successful partnerships.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
    <div class="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <!-- ... -->
    </div>
  </div>
</template>

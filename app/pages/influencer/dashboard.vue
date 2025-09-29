<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Influencer Dashboard</h1>
        <p class="text-gray-600">Welcome to your influencer dashboard! This is a placeholder page.</p>
        <div class="mt-4">
          <button 
            @click="logout"
            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  requiredUserType: 'influencer'
})

const { logout } = useAuth()
</script>
<template>
  <div class="space-y-6">
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h1 class="text-2xl font-bold text-gray-900">Campaigns</h1>
      <p class="text-gray-600">Discover and manage your campaigns</p>
    </div>
    
    <div class="bg-white rounded-lg shadow-sm p-6">
      <p class="text-gray-600">Campaign discovery page coming soon...</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'influencer',
  middleware: 'auth-new', 
  requiredUserType: 'influencer'
})
</script>
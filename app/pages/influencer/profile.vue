<template>
  <div class="space-y-6">
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h1 class="text-2xl font-bold text-gray-900">Influencer Profile</h1>
      <p class="text-gray-600">Manage your influencer profile and settings</p>
    </div>
    
    <div class="bg-white rounded-lg shadow-sm p-6">
      <p class="text-gray-600">Profile management page coming soon...</p>
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
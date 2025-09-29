<template>
  <div class="space-y-6">
    <!-- Welcome Section -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Welcome back, {{ user.name }}! 👋</h1>
      <p class="text-gray-600">Here's what's happening with your campaigns today.</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-lg">
            <span class="text-2xl text-blue-600">📊</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active Campaigns</p>
            <p class="text-2xl font-bold text-gray-900">12</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-lg">
            <span class="text-2xl text-green-600">💰</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Wallet Balance</p>
            <p class="text-2xl font-bold text-gray-900">$5,250</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-purple-100 rounded-lg">
            <span class="text-2xl text-purple-600">🤝</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Collaborations</p>
            <p class="text-2xl font-bold text-gray-900">47</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-orange-100 rounded-lg">
            <span class="text-2xl text-orange-600">⭐</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Pending Requests</p>
            <p class="text-2xl font-bold text-gray-900">8</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NuxtLink 
          to="/brand/campaigns/new" 
          class="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
        >
          <span class="text-2xl mb-2 block">➕</span>
          <span class="font-medium text-gray-700">Create Campaign</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/brand/influencers" 
          class="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-green-500 hover:bg-green-50 transition-colors"
        >
          <span class="text-2xl mb-2 block">🔍</span>
          <span class="font-medium text-gray-700">Find Influencers</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/brand/wallet" 
          class="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-purple-500 hover:bg-purple-50 transition-colors"
        >
          <span class="text-2xl mb-2 block">💳</span>
          <span class="font-medium text-gray-700">Add Funds</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Recent Campaigns -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-gray-900">Recent Campaigns</h2>
        <NuxtLink to="/brand/campaigns" class="text-blue-600 hover:text-blue-700 font-medium">
          View All →
        </NuxtLink>
      </div>
      <div class="space-y-4">
        <div v-for="campaign in recentCampaigns" :key="campaign.id" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h3 class="font-medium text-gray-900">{{ campaign.name }}</h3>
            <p class="text-sm text-gray-600">{{ campaign.type }} • {{ campaign.status }}</p>
          </div>
          <div class="text-right">
            <p class="font-semibold text-gray-900">${{ campaign.budget }}</p>
            <p class="text-sm text-gray-600">{{ campaign.influencers }} influencers</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'brand'
})

// Mock data
const user = ref({
  name: 'Nike Marketing'
})

const recentCampaigns = ref([
  { id: 1, name: 'Summer Collection 2024', type: 'Instagram Reels', status: 'Active', budget: 2500, influencers: 12 },
  { id: 2, name: 'New Running Shoes', type: 'YouTube Reviews', status: 'Pending', budget: 1800, influencers: 8 },
  { id: 3, name: 'Fitness Challenge', type: 'TikTok Campaign', status: 'Completed', budget: 3200, influencers: 15 }
])
</script>
<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Campaigns</h1>
          <p class="text-gray-600">Manage your influencer marketing campaigns</p>
        </div>
        <NuxtLink 
          to="/brand/campaigns/new" 
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <span>+</span>
          <span>Create Campaign</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Campaign Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-lg">
            <span class="text-2xl text-blue-600">📊</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Campaigns</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-lg">
            <span class="text-2xl text-green-600">🎯</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.active }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-yellow-100 rounded-lg">
            <span class="text-2xl text-yellow-600">⏳</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Pending</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.pending }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-purple-100 rounded-lg">
            <span class="text-2xl text-purple-600">💰</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Budget</p>
            <p class="text-2xl font-bold text-gray-900">${{ stats.totalBudget.toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Campaigns Table -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-900">All Campaigns</h2>
          
          <!-- Filters -->
          <div class="flex space-x-4">
            <select 
              v-model="statusFilter" 
              class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option v-for="status in campaignStatuses" :key="status.value" :value="status.value">
                {{ status.label }}
              </option>
            </select>
            
            <select 
              v-model="typeFilter" 
              class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option v-for="type in campaignTypes" :key="type.value" :value="type.value">
                {{ type.label }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Influencers</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="campaign in filteredCampaigns" :key="campaign.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ campaign.name }}</div>
                  <div class="text-sm text-gray-500">Created {{ formatDate(campaign.createdAt) }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span class="text-lg mr-2">{{ getCampaignTypeIcon(campaign.type) }}</span>
                  <span class="text-sm text-gray-900">{{ getCampaignTypeLabel(campaign.type) }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', getStatusClasses(campaign.status)]">
                  {{ getStatusLabel(campaign.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${{ campaign.budget.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ campaign.influencers }} influencers
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(campaign.startDate) }} - {{ formatDate(campaign.endDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <NuxtLink 
                    :to="`/brand/campaigns/${campaign.id}`" 
                    class="text-blue-600 hover:text-blue-900"
                  >
                    View
                  </NuxtLink>
                  <button 
                    @click="editCampaign(campaign.id)" 
                    class="text-green-600 hover:text-green-900"
                  >
                    Edit
                  </button>
                  <button 
                    @click="deleteCampaign(campaign.id)" 
                    class="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <!-- Empty State -->
        <div v-if="filteredCampaigns.length === 0" class="text-center py-12">
          <div class="text-gray-400 text-6xl mb-4">📊</div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
          <p class="text-gray-600 mb-4">Get started by creating your first campaign.</p>
          <NuxtLink 
            to="/brand/campaigns/new" 
            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Campaign
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'brand'
})

// Use our campaigns composable
const { 
  campaigns, 
  campaignTypes, 
  campaignStatuses,
  getCampaignStats,
  deleteCampaign: deleteCampaignAction 
} = useCampaigns()

// Filters
const statusFilter = ref('')
const typeFilter = ref('')

// Computed properties
const stats = computed(() => getCampaignStats())

const filteredCampaigns = computed(() => {
  return campaigns.value.filter(campaign => {
    const statusMatch = !statusFilter.value || campaign.status === statusFilter.value
    const typeMatch = !typeFilter.value || campaign.type === typeFilter.value
    return statusMatch && typeMatch
  })
})

// Helper methods
const getCampaignTypeIcon = (type) => {
  const campaignType = campaignTypes.find(t => t.value === type)
  return campaignType ? campaignType.icon : '🎯'
}

const getCampaignTypeLabel = (type) => {
  const campaignType = campaignTypes.find(t => t.value === type)
  return campaignType ? campaignType.label : 'Unknown'
}

const getStatusLabel = (status) => {
  const statusObj = campaignStatuses.find(s => s.value === status)
  return statusObj ? statusObj.label : 'Unknown'
}

const getStatusClasses = (status) => {
  const statusObj = campaignStatuses.find(s => s.value === status)
  if (!statusObj) return 'bg-gray-100 text-gray-800'
  
  const colorMap = {
    gray: 'bg-gray-100 text-gray-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    green: 'bg-green-100 text-green-800',
    orange: 'bg-orange-100 text-orange-800',
    blue: 'bg-blue-100 text-blue-800',
    red: 'bg-red-100 text-red-800'
  }
  
  return colorMap[statusObj.color] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Actions
const editCampaign = (id) => {
  // Navigate to edit page
  navigateTo(`/brand/campaigns/${id}/edit`)
}

const deleteCampaign = async (id) => {
  if (confirm('Are you sure you want to delete this campaign?')) {
    const deleted = deleteCampaignAction(id)
    if (deleted) {
      // Show success message (we'll add toast notifications later)
      alert('Campaign deleted successfully!')
    }
  }
}
</script>
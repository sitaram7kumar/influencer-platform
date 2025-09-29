<template>
  <div v-if="campaign" class="space-y-6">
    <!-- Navigation -->
    <div class="flex items-center space-x-4 text-sm text-gray-600">
      <NuxtLink to="/influencer/campaigns" class="text-purple-600 hover:text-purple-700 flex items-center">
        ← Back to Campaigns
      </NuxtLink>
    </div>

    <!-- Campaign Header -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex justify-between items-start">
        <div class="flex-1">
          <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ campaign.name }}</h1>
          <div class="flex items-center space-x-4 text-gray-600">
            <span class="text-lg font-semibold">{{ campaign.brand }}</span>
            <span>•</span>
            <span class="flex items-center">
              <span class="text-lg mr-1">{{ getCampaignTypeIcon(campaign.type) }}</span>
              {{ getCampaignTypeLabel(campaign.type) }}
            </span>
            <span>•</span>
            <span>{{ campaign.location }}</span>
          </div>
        </div>
        <div class="text-right">
          <div class="text-3xl font-bold text-green-600 mb-2">${{ campaign.payment }}</div>
          <div class="text-sm text-gray-600">{{ campaign.applicants }} applicants</div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Campaign Description -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Campaign Description</h2>
          <p class="text-gray-700 leading-relaxed">{{ campaign.description }}</p>
        </div>

        <!-- Content Guidelines -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Content Guidelines</h2>
          <p class="text-gray-700 mb-4">{{ campaign.contentGuidelines }}</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 class="font-medium text-gray-900 mb-2">Target Audience</h3>
              <p class="text-gray-600">{{ campaign.targetAudience }}</p>
            </div>
            <div>
              <h3 class="font-medium text-gray-900 mb-2">Requirements</h3>
              <p class="text-gray-600">{{ campaign.requirements }}</p>
            </div>
          </div>
        </div>

        <!-- Hashtags -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Required Hashtags</h2>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="hashtag in campaign.hashtags" 
              :key="hashtag"
              class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ hashtag }}
            </span>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Campaign Details -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Campaign Details</h2>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Category</span>
              <span class="font-medium text-gray-900 capitalize">{{ campaign.category }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Duration</span>
              <span class="font-medium text-gray-900">{{ campaign.duration }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Start Date</span>
              <span class="font-medium text-gray-900">{{ formatDate(campaign.startDate) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">End Date</span>
              <span class="font-medium text-gray-900">{{ formatDate(campaign.endDate) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Location</span>
              <span class="font-medium text-gray-900">{{ campaign.location }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Applicants</span>
              <span class="font-medium text-gray-900">{{ campaign.applicants }} / {{ campaign.maxInfluencers }}</span>
            </div>
          </div>
        </div>

        <!-- Apply Section -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Apply to Campaign</h2>
          <p class="text-gray-600 mb-4">Think you're a good fit for this campaign?</p>
          
          <button 
            @click="applyToCampaign"
            class="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Apply Now - ${{ campaign.payment }}
          </button>
          
          <p class="text-xs text-gray-500 mt-3 text-center">
            The brand will review your profile and get back to you
          </p>
        </div>

        <!-- Similar Campaigns -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Similar Campaigns</h2>
          <div class="space-y-3">
            <div 
              v-for="similar in similarCampaigns" 
              :key="similar.id"
              class="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              @click="navigateToCampaign(similar.id)"
            >
              <h3 class="font-medium text-gray-900 text-sm">{{ similar.name }}</h3>
              <p class="text-gray-600 text-xs">{{ similar.brand }}</p>
              <p class="text-green-600 font-semibold text-sm">${{ similar.payment }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div v-else class="flex items-center justify-center min-h-96">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading campaign details...</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'influencer',
  middleware: 'auth-new',
  requiredUserType: 'influencer'
})

const route = useRoute()
const campaignId = route.params.id

const authStore = useAuthStore()
const { getAvailableCampaigns, applyToCampaignAsInfluencer, campaignTypes } = useCampaigns()

// State
const campaign = ref(null)
const similarCampaigns = ref([])

// Methods
const getCampaignTypeIcon = (type) => {
  const campaignType = campaignTypes.find(t => t.value === type)
  return campaignType ? campaignType.icon : '🎯'
}

const getCampaignTypeLabel = (type) => {
  const campaignType = campaignTypes.find(t => t.value === type)
  return campaignType ? campaignType.label : 'Unknown'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const applyToCampaign = async () => {
  if (!campaign.value) return
  
  const message = `I'm interested in collaborating on your "${campaign.value.name}" campaign. I believe my ${authStore.user.followers} followers and ${authStore.user.engagement}% engagement rate would be a great fit!`
  
  try {
    const result = await applyToCampaignAsInfluencer(campaign.value.id, authStore.user.id, message)
    if (result.success) {
      alert('Application submitted successfully! The brand will review your profile.')
    }
  } catch (error) {
    alert('Failed to submit application. Please try again.')
  }
}

const navigateToCampaign = (id) => {
  navigateTo(`/influencer/campaigns/${id}`)
}

// Fetch campaign data
onMounted(() => {
  // Simulate API call
  setTimeout(() => {
    const campaigns = getAvailableCampaigns()
    campaign.value = campaigns.find(c => c.id === parseInt(campaignId))
    
    if (campaign.value) {
      // Get similar campaigns (same category, excluding current)
      similarCampaigns.value = campaigns
        .filter(c => c.category === campaign.value.category && c.id !== campaign.value.id)
        .slice(0, 3)
    }
  }, 1000)
})
</script>
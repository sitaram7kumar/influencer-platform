<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Discover Campaigns</h1>
          <p class="text-gray-600">Find campaigns that match your audience and style</p>
        </div>
        <div class="flex items-center space-x-4">
          <button 
            @click="showFilters = !showFilters"
            class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <span>🔍</span>
            <span>Filters</span>
          </button>
          <NuxtLink 
            to="/influencer/campaigns/applications" 
            class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <span>📨</span>
            <span>My Applications</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Filters Panel -->
      <div v-if="showFilters" class="mt-6 p-6 bg-gray-50 rounded-lg">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Category Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select 
              v-model="filters.category" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">All Categories</option>
              <option value="fashion">Fashion</option>
              <option value="beauty">Beauty</option>
              <option value="tech">Technology</option>
              <option value="fitness">Fitness</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="lifestyle">Lifestyle</option>
            </select>
          </div>

          <!-- Campaign Type Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
            <select 
              v-model="filters.type" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">All Types</option>
              <option value="instagram_reels">Instagram Reels</option>
              <option value="instagram_posts">Instagram Posts</option>
              <option value="instagram_stories">Instagram Stories</option>
              <option value="youtube_reviews">YouTube Reviews</option>
              <option value="youtube_shorts">YouTube Shorts</option>
              <option value="tiktok_campaign">TikTok Content</option>
            </select>
          </div>

          <!-- Payment Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Min Payment</label>
            <select 
              v-model="filters.minPayment" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Any Payment</option>
              <option value="100">$100+</option>
              <option value="250">$250+</option>
              <option value="500">$500+</option>
              <option value="1000">$1,000+</option>
            </select>
          </div>

          <!-- Location Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input 
              v-model="filters.location" 
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., Global, USA, Europe"
            >
          </div>
        </div>

        <!-- Search Filter -->
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <input 
            v-model="filters.search" 
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Search campaigns, brands, or keywords..."
          >
        </div>

        <!-- Filter Actions -->
        <div class="flex justify-end space-x-4 mt-6">
          <button 
            @click="resetFilters"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Reset
          </button>
          <button 
            @click="applyFilters"
            class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Campaigns Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <div 
        v-for="campaign in filteredCampaigns" 
        :key="campaign.id"
        class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
      >
        <!-- Campaign Header -->
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ campaign.name }}</h3>
              <p class="text-gray-600">{{ campaign.brand }}</p>
            </div>
            <span class="text-lg font-bold text-green-600">${{ campaign.payment }}</span>
          </div>
          
          <div class="flex items-center space-x-4 text-sm text-gray-600">
            <span class="flex items-center">
              <span class="text-lg mr-1">{{ getCampaignTypeIcon(campaign.type) }}</span>
              {{ getCampaignTypeLabel(campaign.type) }}
            </span>
            <span>•</span>
            <span>{{ campaign.duration }}</span>
            <span>•</span>
            <span>{{ campaign.location }}</span>
          </div>
        </div>

        <!-- Campaign Details -->
        <div class="p-6">
          <p class="text-gray-700 mb-4 line-clamp-3">{{ campaign.description }}</p>
          
          <!-- Requirements -->
          <div class="mb-4">
            <p class="text-sm font-medium text-gray-900 mb-1">Requirements:</p>
            <p class="text-sm text-gray-600">{{ campaign.requirements }}</p>
          </div>

          <!-- Campaign Stats -->
          <div class="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p class="text-gray-600">Applicants</p>
              <p class="font-semibold text-gray-900">{{ campaign.applicants }} / {{ campaign.maxInfluencers }}</p>
            </div>
            <div>
              <p class="text-gray-600">Category</p>
              <p class="font-semibold text-gray-900 capitalize">{{ campaign.category }}</p>
            </div>
          </div>

          <!-- Hashtags -->
          <div class="mb-4">
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="hashtag in campaign.hashtags" 
                :key="hashtag"
                class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {{ hashtag }}
              </span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex space-x-2">
            <button 
              @click="viewCampaignDetails(campaign.id)"
              class="flex-1 bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              View Details
            </button>
            <button 
              @click="applyToCampaign(campaign)"
              class="flex-1 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredCampaigns.length === 0" class="text-center py-12">
      <div class="text-gray-400 text-6xl mb-4">🔍</div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
      <p class="text-gray-600 mb-4">Try adjusting your filters to find more results.</p>
      <button 
        @click="resetFilters"
        class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'influencer',
  middleware: 'auth-new',
  requiredUserType: 'influencer'
})

const authStore = useAuthStore()

const { getAvailableCampaigns, applyToCampaignAsInfluencer, campaignTypes } = useCampaigns()

// State
const showFilters = ref(true)
const filters = ref({
  category: '',
  type: '',
  minPayment: '',
  location: '',
  search: ''
})

// Computed
const filteredCampaigns = computed(() => {
  return getAvailableCampaigns(filters.value)
})

// Methods
const getCampaignTypeIcon = (type) => {
  const campaignType = campaignTypes.find(t => t.value === type)
  return campaignType ? campaignType.icon : '🎯'
}

const getCampaignTypeLabel = (type) => {
  const campaignType = campaignTypes.find(t => t.value === type)
  return campaignType ? campaignType.label : 'Unknown'
}

const resetFilters = () => {
  filters.value = {
    category: '',
    type: '',
    minPayment: '',
    location: '',
    search: ''
  }
}

const applyFilters = () => {
  // Filters are applied automatically through computed property
  showFilters.value = false
}

const viewCampaignDetails = (campaignId) => {
  navigateTo(`/influencer/campaigns/${campaignId}`)
}

const applyToCampaign = async (campaign) => {
  const message = `I'm interested in collaborating on your "${campaign.name}" campaign. I believe my audience would be a great fit!`
  
  try {
    const result = await applyToCampaignAsInfluencer(campaign.id, authStore.user.id, message)
    if (result.success) {
      alert('Application submitted successfully! The brand will review your profile.')
    }
  } catch (error) {
    alert('Failed to submit application. Please try again.')
  }
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
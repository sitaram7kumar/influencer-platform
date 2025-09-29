<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Discover Influencers</h1>
          <p class="text-gray-600">Find the perfect influencers for your campaigns</p>
        </div>
        <div class="flex space-x-4">
          <!-- Filters Toggle -->
          <button 
            @click="showFilters = !showFilters"
            class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <span>🔍</span>
            <span>Filters</span>
          </button>
        </div>
      </div>

      <!-- Filters Panel -->
      <div v-if="showFilters" class="mt-6 p-6 bg-gray-50 rounded-lg">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Platform Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Platform</label>
            <select 
              v-model="filters.platform" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Platforms</option>
              <option v-for="platform in platforms" :key="platform.value" :value="platform.value">
                {{ platform.icon }} {{ platform.label }}
              </option>
            </select>
          </div>

          <!-- Category Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select 
              v-model="filters.category" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category.value" :value="category.value">
                {{ category.label }}
              </option>
            </select>
          </div>

          <!-- Followers Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Min Followers</label>
            <select 
              v-model="filters.minFollowers" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any</option>
              <option value="10000">10K+</option>
              <option value="50000">50K+</option>
              <option value="100000">100K+</option>
              <option value="500000">500K+</option>
            </select>
          </div>

          <!-- Price Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Max Budget</label>
            <select 
              v-model="filters.maxPrice" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any</option>
              <option value="100">$100</option>
              <option value="500">$500</option>
              <option value="1000">$1,000</option>
              <option value="5000">$5,000</option>
            </select>
          </div>
        </div>

        <!-- Additional Filters -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <!-- Location Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input 
              v-model="filters.location" 
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., New York"
            >
          </div>

          <!-- Search Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input 
              v-model="filters.search" 
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name, username, or category"
            >
          </div>

          <!-- Verified Filter -->
          <div class="flex items-end">
            <label class="flex items-center space-x-2">
              <input 
                v-model="filters.verifiedOnly" 
                type="checkbox" 
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              >
              <span class="text-sm text-gray-700">Verified only</span>
            </label>
          </div>
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
            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Influencers Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div 
        v-for="influencer in filteredInfluencers" 
        :key="influencer.id"
        class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
      >
        <!-- Influencer Header -->
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {{ influencer.name.split(' ').map(n => n[0]).join('') }}
            </div>
            <div class="flex-1">
              <div class="flex items-center space-x-2">
                <h3 class="font-semibold text-gray-900">{{ influencer.name }}</h3>
                <span v-if="influencer.verified" class="text-blue-500" title="Verified">✓</span>
              </div>
              <p class="text-gray-600 text-sm">{{ influencer.username }}</p>
              <p class="text-gray-500 text-xs">{{ influencer.location }}</p>
            </div>
          </div>
        </div>

        <!-- Influencer Stats -->
        <div class="p-6">
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-gray-600">Platform</p>
              <p class="font-semibold text-gray-900">{{ getPlatformLabel(influencer.platform) }}</p>
            </div>
            <div>
              <p class="text-gray-600">Followers</p>
              <p class="font-semibold text-gray-900">{{ formatNumber(influencer.followers) }}</p>
            </div>
            <div>
              <p class="text-gray-600">Engagement</p>
              <p class="font-semibold text-gray-900">{{ influencer.engagement }}%</p>
            </div>
            <div>
              <p class="text-gray-600">Rating</p>
              <p class="font-semibold text-gray-900">{{ influencer.rating }}/5</p>
            </div>
          </div>

          <!-- Price Range -->
          <div class="mt-4 p-3 bg-gray-50 rounded-lg">
            <p class="text-xs text-gray-600 mb-1">Price Range</p>
            <p class="font-semibold text-gray-900">${{ influencer.priceRange.min }} - ${{ influencer.priceRange.max }}</p>
          </div>

          <!-- Actions -->
          <div class="mt-4 flex space-x-2">
            <button 
              @click="viewInfluencer(influencer.id)"
              class="flex-1 bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              View Profile
            </button>
            <button 
              @click="sendRequest(influencer.id)"
              class="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Collaborate
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredInfluencers.length === 0" class="text-center py-12">
      <div class="text-gray-400 text-6xl mb-4">🔍</div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No influencers found</h3>
      <p class="text-gray-600 mb-4">Try adjusting your filters to find more results.</p>
      <button 
        @click="resetFilters"
        class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'brand'
})

// Composables
const { 
  influencers, 
  platforms, 
  categories, 
  filterInfluencers,
  sendCollaborationRequest 
} = useInfluencers()

// State
const showFilters = ref(true)
const filters = ref({
  platform: '',
  category: '',
  minFollowers: '',
  maxPrice: '',
  location: '',
  search: '',
  verifiedOnly: false
})

// Computed
const filteredInfluencers = computed(() => {
  return filterInfluencers(filters.value)
})

// Methods
const getPlatformLabel = (platform) => {
  const platformObj = platforms.find(p => p.value === platform)
  return platformObj ? platformObj.label : platform
}

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

const resetFilters = () => {
  filters.value = {
    platform: '',
    category: '',
    minFollowers: '',
    maxPrice: '',
    location: '',
    search: '',
    verifiedOnly: false
  }
}

const applyFilters = () => {
  // Filters are applied automatically through computed property
  showFilters.value = false
}

const viewInfluencer = (id) => {
  navigateTo(`/brand/influencers/${id}`)
}

const sendRequest = async (influencerId) => {
  // In a real app, you would select a campaign first
  const campaignId = 1 // Mock campaign ID
  const message = "Hi! I'd love to collaborate with you on our upcoming campaign."
  
  try {
    const result = await sendCollaborationRequest(influencerId, campaignId, message)
    alert('Collaboration request sent successfully!')
  } catch (error) {
    alert('Failed to send request. Please try again.')
  }
}
</script>
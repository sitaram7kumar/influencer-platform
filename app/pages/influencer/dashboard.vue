<template>
  <div v-if="showContent" class="space-y-6">
    <!-- Your dashboard content -->
    <div class="space-y-6">
    <!-- Welcome Section -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Welcome back, {{ user?.name }}! 🌟</h1>
          <p class="text-gray-600">Here's what's happening with your influencer campaigns today.</p>
        </div>
        <div class="flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-lg">
          <span class="text-purple-600">⭐</span>
          <span class="font-semibold text-purple-700">Influencer Level: Pro</span>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-lg">
            <span class="text-2xl text-green-600">💰</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Available Balance</p>
            <p class="text-2xl font-bold text-gray-900">$1,250</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-lg">
            <span class="text-2xl text-blue-600">🎯</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active Campaigns</p>
            <p class="text-2xl font-bold text-gray-900">4</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-purple-100 rounded-lg">
            <span class="text-2xl text-purple-600">📨</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Pending Requests</p>
            <p class="text-2xl font-bold text-gray-900">2</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-orange-100 rounded-lg">
            <span class="text-2xl text-orange-600">📊</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Avg. Engagement</p>
            <p class="text-2xl font-bold text-gray-900">4.8%</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Campaigns -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-900">Active Campaigns</h2>
          <NuxtLink to="/influencer/campaigns" class="text-purple-600 hover:text-purple-700 font-medium text-sm">
            View All →
          </NuxtLink>
        </div>
        <div class="space-y-4">
          <div 
            v-for="campaign in activeCampaigns" 
            :key="campaign.id"
            class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="flex-1">
              <h3 class="font-medium text-gray-900">{{ campaign.name }}</h3>
              <p class="text-sm text-gray-600">{{ campaign.brand }} • {{ campaign.type }}</p>
              <div class="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <span>Deadline: {{ campaign.deadline }}</span>
                <span>Payment: ${{ campaign.payment }}</span>
              </div>
            </div>
            <div class="text-right">
              <span :class="['px-2 py-1 rounded-full text-xs font-medium', campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800']">
                {{ campaign.status }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Requests -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-900">Collaboration Requests</h2>
          <NuxtLink to="/influencer/requests" class="text-purple-600 hover:text-purple-700 font-medium text-sm">
            View All →
          </NuxtLink>
        </div>
        <div class="space-y-4">
          <div 
            v-for="request in collaborationRequests" 
            :key="request.id"
            class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="flex justify-between items-start mb-2">
              <div>
                <h3 class="font-medium text-gray-900">{{ request.brand }}</h3>
                <p class="text-sm text-gray-600">{{ request.campaign }}</p>
              </div>
              <span class="text-lg font-semibold text-green-600">${{ request.payment }}</span>
            </div>
            <p class="text-sm text-gray-700 mb-3">{{ request.description }}</p>
            <div class="flex space-x-2">
              <button 
                @click="acceptRequest(request.id)"
                class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
              >
                Accept
              </button>
              <button 
                @click="declineRequest(request.id)"
                class="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
              >
                Decline
              </button>
              <button class="text-purple-600 hover:text-purple-700 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <NuxtLink 
          to="/influencer/campaigns" 
          class="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-purple-500 hover:bg-purple-50 transition-colors group"
        >
          <span class="text-2xl mb-2 block group-hover:scale-110 transition-transform">🔍</span>
          <span class="font-medium text-gray-700">Find Campaigns</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/influencer/requests" 
          class="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-green-500 hover:bg-green-50 transition-colors group"
        >
          <span class="text-2xl mb-2 block group-hover:scale-110 transition-transform">📨</span>
          <span class="font-medium text-gray-700">View Requests</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/influencer/content" 
          class="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-500 hover:bg-blue-50 transition-colors group"
        >
          <span class="text-2xl mb-2 block group-hover:scale-110 transition-transform">📱</span>
          <span class="font-medium text-gray-700">Submit Content</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/influencer/earnings" 
          class="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-yellow-500 hover:bg-yellow-50 transition-colors group"
        >
          <span class="text-2xl mb-2 block group-hover:scale-110 transition-transform">💸</span>
          <span class="font-medium text-gray-700">Withdraw Earnings</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Performance Metrics -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center p-4">
          <div class="text-3xl font-bold text-purple-600 mb-2">125K</div>
          <div class="text-gray-600">Followers</div>
          <div class="text-green-600 text-sm mt-1">+2.4% this month</div>
        </div>
        <div class="text-center p-4">
          <div class="text-3xl font-bold text-blue-600 mb-2">4.8%</div>
          <div class="text-gray-600">Engagement Rate</div>
          <div class="text-green-600 text-sm mt-1">+0.3% this month</div>
        </div>
        <div class="text-center p-4">
          <div class="text-3xl font-bold text-green-600 mb-2">24</div>
          <div class="text-gray-600">Completed Campaigns</div>
          <div class="text-green-600 text-sm mt-1">98% success rate</div>
        </div>
      </div>
    </div>
    </div>
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h1 class="text-2xl font-bold text-gray-900">Welcome, {{ authStore.user?.name }}! 🌟</h1>
      <p class="text-gray-600">Influencer dashboard loaded successfully!</p>
      <p class="text-sm text-green-600 mt-2">✅ Auth persistence is working!</p>
    </div>
  </div>
  
  <div v-else class="flex items-center justify-center min-h-96">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Checking authentication...</p>
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

// Handle case where auth isn't initialized yet
const showContent = ref(false)


const { user } = useAuth()
const isInitializing = ref(true)

// Mock data
const activeCampaigns = ref([
  {
    id: 1,
    name: 'Summer Fashion Launch',
    brand: 'Nike',
    type: 'Instagram Reels',
    deadline: '2024-02-15',
    payment: 450,
    status: 'active'
  },
  {
    id: 2,
    name: 'Tech Product Review',
    brand: 'Apple',
    type: 'YouTube Video',
    deadline: '2024-02-20',
    payment: 800,
    status: 'active'
  },
  {
    id: 3,
    name: 'Fitness Challenge',
    brand: 'Gymshark',
    type: 'TikTok Series',
    deadline: '2024-02-25',
    payment: 600,
    status: 'content_pending'
  }
])

const collaborationRequests = ref([
  {
    id: 1,
    brand: 'Adidas',
    campaign: 'Spring Collection Promotion',
    payment: 550,
    description: 'Create 3 Instagram posts showcasing our new spring collection...'
  },
  {
    id: 2,
    brand: 'Samsung',
    campaign: 'Phone Camera Review',
    payment: 700,
    description: 'Review the camera features of our new smartphone model...'
  }
])

const acceptRequest = (requestId) => {
  const request = collaborationRequests.value.find(r => r.id === requestId)
  if (request) {
    alert(`Accepted collaboration request from ${request.brand}`)
    collaborationRequests.value = collaborationRequests.value.filter(r => r.id !== requestId)
  }
}

const declineRequest = (requestId) => {
  const request = collaborationRequests.value.find(r => r.id === requestId)
  if (request) {
    if (confirm(`Are you sure you want to decline the request from ${request.brand}?`)) {
      collaborationRequests.value = collaborationRequests.value.filter(r => r.id !== requestId)
      alert('Request declined')
    }
  }
}

onMounted(() => {
  console.log('Influencer Dashboard mounted - auth state:', {
    isAuthenticated: authStore.isAuthenticated,
    isInitialized: authStore.isInitialized,
    user: authStore.user
  })
  
  // If auth is initialized and user is not influencer, redirect
  if (authStore.isInitialized && authStore.getUserType() !== 'influencer') {
    console.log('Redirecting from page level...')
    navigateTo('/')
    return
  }
  
  showContent.value = true
})
</script>
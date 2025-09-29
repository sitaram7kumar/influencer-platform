<template>
  <div v-if="campaign" class="space-y-6">
    <!-- Page Header -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex justify-between items-start">
        <div class="flex-1">
          <NuxtLink to="/brand/campaigns" class="text-blue-600 hover:text-blue-500 font-medium flex items-center mb-2">
            ← Back to Campaigns
          </NuxtLink>
          <div class="flex items-center space-x-4">
            <div class="flex-1">
              <h1 class="text-2xl font-bold text-gray-900">{{ campaign.name }}</h1>
              <div class="flex items-center space-x-4 mt-2">
                <span :class="['inline-flex items-center px-3 py-1 rounded-full text-sm font-medium', statusClasses]">
                  {{ statusLabel }}
                </span>
                <span class="text-gray-600 flex items-center">
                  <span class="text-lg mr-1">{{ campaignTypeIcon }}</span>
                  {{ campaignTypeLabel }}
                </span>
                <span class="text-gray-600">Created {{ formatDate(campaign.createdAt) }}</span>
              </div>
            </div>
            <div class="flex space-x-3">
              <NuxtLink 
                :to="`/brand/campaigns/${campaign.id}/edit`" 
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <span>✏️</span>
                <span>Edit</span>
              </NuxtLink>
              <button 
                @click="toggleCampaignStatus" 
                :class="[
                  'px-4 py-2 rounded-lg transition-colors flex items-center space-x-2',
                  campaign.status === 'active' 
                    ? 'bg-orange-600 text-white hover:bg-orange-700' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                ]"
              >
                <span>{{ campaign.status === 'active' ? '⏸️' : '▶️' }}</span>
                <span>{{ campaign.status === 'active' ? 'Pause' : 'Activate' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Campaign Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-lg">
            <span class="text-2xl text-blue-600">💰</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Budget</p>
            <p class="text-2xl font-bold text-gray-900">${{ campaign.budget.toLocaleString() }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-lg">
            <span class="text-2xl text-green-600">⭐</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Influencers</p>
            <p class="text-2xl font-bold text-gray-900">{{ campaign.influencers }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ campaign.targetInfluencers || 10 }} targeted</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-purple-100 rounded-lg">
            <span class="text-2xl text-purple-600">📅</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Duration</p>
            <p class="text-2xl font-bold text-gray-900">{{ campaignDuration }} days</p>
            <p class="text-xs text-gray-500 mt-1">{{ formatDate(campaign.startDate) }} - {{ formatDate(campaign.endDate) }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-orange-100 rounded-lg">
            <span class="text-2xl text-orange-600">📊</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Engagement</p>
            <p class="text-2xl font-bold text-gray-900">24.5%</p>
            <p class="text-xs text-gray-500 mt-1">Average rate</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column - Campaign Details -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Campaign Description -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Campaign Description</h2>
          <p class="text-gray-700 leading-relaxed">{{ campaign.description || 'No description provided.' }}</p>
        </div>

        <!-- Influencers Section -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-semibold text-gray-900">Campaign Influencers</h2>
            <NuxtLink 
              to="/brand/influencers" 
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <span>🔍</span>
              <span>Find Influencers</span>
            </NuxtLink>
          </div>

          <!-- Influencers List -->
          <div v-if="campaignInfluencers.length > 0" class="space-y-4">
            <div 
              v-for="influencer in campaignInfluencers" 
              :key="influencer.id"
              class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {{ influencer.name.split(' ').map(n => n[0]).join('') }}
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">{{ influencer.name }}</h3>
                  <p class="text-sm text-gray-600">{{ influencer.platform }} • {{ influencer.followers }} followers</p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <span :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  influencer.status === 'accepted' ? 'bg-green-100 text-green-800' :
                  influencer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                ]">
                  {{ influencer.status }}
                </span>
                <div class="text-right">
                  <p class="font-semibold text-gray-900">${{ influencer.payment }}</p>
                  <p class="text-xs text-gray-600">{{ influencer.contentType }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-8">
            <div class="text-gray-400 text-6xl mb-4">👥</div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No influencers yet</h3>
            <p class="text-gray-600 mb-4">Start by finding influencers for your campaign.</p>
            <NuxtLink 
              to="/brand/influencers" 
              class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
            >
              <span>🔍</span>
              <span>Discover Influencers</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Content Submissions -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Content Submissions</h2>
          <div class="space-y-4">
            <div 
              v-for="submission in contentSubmissions" 
              :key="submission.id"
              class="border border-gray-200 rounded-lg p-4"
            >
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="font-medium text-gray-900">{{ submission.influencerName }}</h3>
                  <p class="text-sm text-gray-600">{{ formatDate(submission.submittedAt) }}</p>
                </div>
                <span :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                  submission.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                ]">
                  {{ submission.status }}
                </span>
              </div>
              <p class="text-gray-700 mb-3">{{ submission.content }}</p>
              <div class="flex space-x-2">
                <button 
                  v-if="submission.status === 'pending'"
                  @click="approveSubmission(submission.id)"
                  class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
                <button 
                  v-if="submission.status === 'pending'"
                  @click="rejectSubmission(submission.id)"
                  class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  Reject
                </button>
                <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Actions & Info -->
      <div class="space-y-6">
        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div class="space-y-3">
            <button 
              @click="shareCampaign"
              class="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span class="text-xl">📤</span>
              <span class="flex-1">
                <span class="block font-medium text-gray-900">Share Campaign</span>
                <span class="text-sm text-gray-600">Get campaign link</span>
              </span>
            </button>

            <button 
              @click="viewAnalytics"
              class="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span class="text-xl">📊</span>
              <span class="flex-1">
                <span class="block font-medium text-gray-900">View Analytics</span>
                <span class="text-sm text-gray-600">Performance metrics</span>
              </span>
            </button>

            <button 
              @click="exportData"
              class="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span class="text-xl">📁</span>
              <span class="flex-1">
                <span class="block font-medium text-gray-900">Export Data</span>
                <span class="text-sm text-gray-600">Download reports</span>
              </span>
            </button>

            <button 
              @click="duplicateCampaign"
              class="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span class="text-xl">⎘</span>
              <span class="flex-1">
                <span class="block font-medium text-gray-900">Duplicate</span>
                <span class="text-sm text-gray-600">Create similar campaign</span>
              </span>
            </button>
          </div>
        </div>

        <!-- Campaign Timeline -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Campaign Timeline</h2>
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div class="flex-1">
                <p class="font-medium text-gray-900">Campaign Created</p>
                <p class="text-sm text-gray-600">{{ formatDate(campaign.createdAt) }}</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div class="flex-1">
                <p class="font-medium text-gray-900">Campaign Started</p>
                <p class="text-sm text-gray-600">{{ formatDate(campaign.startDate) }}</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
              <div class="flex-1">
                <p class="font-medium text-gray-900">Campaign Ends</p>
                <p class="text-sm text-gray-600">{{ formatDate(campaign.endDate) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Campaign Settings -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Campaign Settings</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Content Requirements</label>
              <p class="text-sm text-gray-600">{{ campaign.contentRequirements || 'Flexible' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
              <p class="text-sm text-gray-600">
                {{ campaign.targetGender || 'Any' }} • 
                {{ campaign.targetAge || 'Any age' }} • 
                {{ campaign.targetLocations || 'Global' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div v-else class="flex items-center justify-center min-h-96">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading campaign details...</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'brand',
  middleware: 'auth',
  requiredUserType: 'brand'
})

const { user } = useAuth()

// Get route parameters
const route = useRoute()
const campaignId = route.params.id

// Composables
const { 
  campaigns, 
  campaignTypes, 
  campaignStatuses,
  getCampaign,
  updateCampaign 
} = useCampaigns()

// State
const campaign = ref(null)
const campaignInfluencers = ref([])
const contentSubmissions = ref([])

// Mock data for influencers and submissions
const mockInfluencers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    platform: 'Instagram',
    followers: '125K',
    status: 'accepted',
    payment: 450,
    contentType: 'Reel & Story'
  },
  {
    id: 2,
    name: 'Mike Chen',
    platform: 'YouTube',
    followers: '89K',
    status: 'pending',
    payment: 800,
    contentType: 'Product Review'
  },
  {
    id: 3,
    name: 'Emma Davis',
    platform: 'TikTok',
    followers: '210K',
    status: 'accepted',
    payment: 600,
    contentType: 'Dance Challenge'
  }
]

const mockSubmissions = [
  {
    id: 1,
    influencerName: 'Sarah Johnson',
    submittedAt: '2024-01-15',
    content: 'Just launched the new summer collection! Loving these vibrant colors and comfortable fit. Perfect for active lifestyles!',
    status: 'approved'
  },
  {
    id: 2,
    influencerName: 'Emma Davis',
    submittedAt: '2024-01-14',
    content: 'Check out this fun dance challenge with the new collection! So much energy and style in these pieces.',
    status: 'pending'
  }
]

// Computed properties
const statusLabel = computed(() => {
  const status = campaignStatuses.find(s => s.value === campaign.value?.status)
  return status ? status.label : 'Unknown'
})

const statusClasses = computed(() => {
  const status = campaignStatuses.find(s => s.value === campaign.value?.status)
  if (!status) return 'bg-gray-100 text-gray-800'
  
  const colorMap = {
    gray: 'bg-gray-100 text-gray-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    green: 'bg-green-100 text-green-800',
    orange: 'bg-orange-100 text-orange-800',
    blue: 'bg-blue-100 text-blue-800',
    red: 'bg-red-100 text-red-800'
  }
  
  return colorMap[status.color] || 'bg-gray-100 text-gray-800'
})

const campaignTypeLabel = computed(() => {
  const type = campaignTypes.find(t => t.value === campaign.value?.type)
  return type ? type.label : 'Unknown'
})

const campaignTypeIcon = computed(() => {
  const type = campaignTypes.find(t => t.value === campaign.value?.type)
  return type ? type.icon : '🎯'
})

const campaignDuration = computed(() => {
  if (!campaign.value?.startDate || !campaign.value?.endDate) return 0
  const start = new Date(campaign.value.startDate)
  const end = new Date(campaign.value.endDate)
  const diffTime = Math.abs(end - start)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
})

// Methods
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const toggleCampaignStatus = async () => {
  if (!campaign.value) return
  
  const newStatus = campaign.value.status === 'active' ? 'paused' : 'active'
  const updated = updateCampaign(campaign.value.id, { status: newStatus })
  
  if (updated) {
    campaign.value.status = newStatus
    alert(`Campaign ${newStatus === 'active' ? 'activated' : 'paused'} successfully!`)
  }
}

const shareCampaign = () => {
  const campaignUrl = `${window.location.origin}/brand/campaigns/${campaign.value.id}`
  navigator.clipboard.writeText(campaignUrl)
  alert('Campaign link copied to clipboard!')
}

const viewAnalytics = () => {
  alert('Opening analytics dashboard...')
}

const exportData = () => {
  alert('Exporting campaign data...')
}

const duplicateCampaign = () => {
  alert('Duplicating campaign...')
}

const approveSubmission = (submissionId) => {
  const submission = contentSubmissions.value.find(s => s.id === submissionId)
  if (submission) {
    submission.status = 'approved'
    alert('Content approved!')
  }
}

const rejectSubmission = (submissionId) => {
  const submission = contentSubmissions.value.find(s => s.id === submissionId)
  if (submission) {
    submission.status = 'rejected'
    alert('Content rejected.')
  }
}

// Fetch campaign data
onMounted(() => {
  // Simulate API call
  setTimeout(() => {
    const foundCampaign = getCampaign(campaignId)
    if (foundCampaign) {
      campaign.value = foundCampaign
      campaignInfluencers.value = mockInfluencers
      contentSubmissions.value = mockSubmissions
    } else {
      // Redirect if campaign not found
      navigateTo('/brand/campaigns')
    }
  }, 1000)
})
</script>
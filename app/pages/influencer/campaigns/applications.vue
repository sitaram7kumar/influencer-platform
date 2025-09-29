<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">My Applications</h1>
          <p class="text-gray-600">Track your campaign applications and status</p>
        </div>
        <NuxtLink 
          to="/influencer/campaigns" 
          class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
        >
          <span>🔍</span>
          <span>Discover More</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Application Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-lg">
            <span class="text-2xl text-blue-600">📨</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Applications</p>
            <p class="text-2xl font-bold text-gray-900">{{ applications.length }}</p>
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
            <p class="text-2xl font-bold text-gray-900">{{ pendingCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-lg">
            <span class="text-2xl text-green-600">✅</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Accepted</p>
            <p class="text-2xl font-bold text-gray-900">{{ acceptedCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center">
          <div class="p-3 bg-red-100 rounded-lg">
            <span class="text-2xl text-red-600">❌</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Rejected</p>
            <p class="text-2xl font-bold text-gray-900">{{ rejectedCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Applications Table -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">Application History</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="application in applications" :key="application.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ application.campaignName }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ application.brand }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(application.appliedAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${{ application.payment }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', getStatusClasses(application.status)]">
                  {{ getStatusLabel(application.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <NuxtLink 
                    :to="`/influencer/campaigns/${application.campaignId}`" 
                    class="text-purple-600 hover:text-purple-900"
                  >
                    View
                  </NuxtLink>
                  <button 
                    v-if="application.status === 'accepted'"
                    @click="startCollaboration(application)"
                    class="text-green-600 hover:text-green-900"
                  >
                    Start Work
                  </button>
                  <button 
                    v-if="application.status === 'pending'"
                    @click="withdrawApplication(application.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Withdraw
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="applications.length === 0" class="text-center py-12">
        <div class="text-gray-400 text-6xl mb-4">📨</div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
        <p class="text-gray-600 mb-4">Start by applying to campaigns that match your style.</p>
        <NuxtLink 
          to="/influencer/campaigns" 
          class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Discover Campaigns
        </NuxtLink>
      </div>
    </div>

    <!-- Application Tips -->
    <div class="bg-blue-50 rounded-lg shadow-sm p-6">
      <h2 class="text-lg font-semibold text-blue-900 mb-4">💡 Application Tips</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
        <div class="flex items-start space-x-2">
          <span class="text-blue-600">✓</span>
          <span>Apply to campaigns that match your audience demographics</span>
        </div>
        <div class="flex items-start space-x-2">
          <span class="text-blue-600">✓</span>
          <span>Customize your application message for each campaign</span>
        </div>
        <div class="flex items-start space-x-2">
          <span class="text-blue-600">✓</span>
          <span>Follow up on pending applications after 3-5 days</span>
        </div>
        <div class="flex items-start space-x-2">
          <span class="text-blue-600">✓</span>
          <span>Maintain a professional portfolio of your best work</span>
        </div>
      </div>
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
const { getInfluencerApplications } = useCampaigns()

// State
const applications = ref([])

// Computed
const pendingCount = computed(() => {
  return applications.value.filter(app => app.status === 'pending').length
})

const acceptedCount = computed(() => {
  return applications.value.filter(app => app.status === 'accepted').length
})

const rejectedCount = computed(() => {
  return applications.value.filter(app => app.status === 'rejected').length
})

// Methods
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStatusLabel = (status) => {
  const statusMap = {
    pending: 'Under Review',
    accepted: 'Accepted',
    rejected: 'Not Selected'
  }
  return statusMap[status] || status
}

const getStatusClasses = (status) => {
  const statusMap = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  }
  return statusMap[status] || 'bg-gray-100 text-gray-800'
}

const startCollaboration = (application) => {
  alert(`Starting collaboration with ${application.brand} for $${application.payment}! You'll be redirected to the collaboration workspace.`)
  // In real app, this would navigate to collaboration interface
}

const withdrawApplication = (applicationId) => {
  if (confirm('Are you sure you want to withdraw this application?')) {
    applications.value = applications.value.filter(app => app.id !== applicationId)
    alert('Application withdrawn successfully.')
  }
}

// Fetch applications
onMounted(() => {
  // Simulate API call
  setTimeout(() => {
    applications.value = getInfluencerApplications(authStore.user.id)
  }, 1000)
})
</script>
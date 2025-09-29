<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Influencer Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <!-- Logo & Influencer Info -->
          <div class="flex items-center space-x-4">
            <NuxtLink to="/influencer" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-blue-600 rounded-lg"></div>
              <span class="text-xl font-bold text-gray-900">InfluenceHub</span>
            </NuxtLink>
            <span class="text-gray-400">|</span>
            <span class="text-lg font-semibold text-gray-700">Influencer Dashboard</span>
          </div>

          <!-- User Menu -->
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <button class="p-2 text-gray-600 hover:text-blue-600 relative">
              <span class="text-lg">🔔</span>
              <span v-if="unreadNotifications > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {{ unreadNotifications }}
              </span>
            </button>

            <!-- User Dropdown -->
            <div class="relative group">
              <button class="flex items-center space-x-2 text-gray-700">
                <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {{ userInitials }}
                </div>
                <span>{{ user?.name }}</span>
                <span>▼</span>
              </button>
              
              <!-- Dropdown Menu -->
              <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="p-2">
                  <div class="px-3 py-2 text-sm text-gray-600 border-b border-gray-100">
                    <strong>{{ user?.name }}</strong>
                    <div class="text-xs">{{ user?.followers?.toLocaleString() }} followers</div>
                  </div>
                  <NuxtLink 
                    to="/influencer/profile" 
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                  >
                    👤 Your Profile
                  </NuxtLink>
                  <NuxtLink 
                    to="/influencer/earnings" 
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                  >
                    💰 Earnings
                  </NuxtLink>
                  <NuxtLink 
                    to="/influencer/settings" 
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                  >
                    ⚙️ Settings
                  </NuxtLink>
                  <button 
                    @click="handleLogout"
                    class="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded mt-1"
                  >
                    🚪 Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-6">
      <div class="flex">
        <!-- Sidebar -->
        <aside class="w-64 bg-white rounded-lg shadow-sm p-4 mr-6">
          <nav class="space-y-2">
            <NuxtLink 
              to="/influencer/dashboard" 
              class="flex items-center space-x-3 p-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
            >
              <span>📊</span>
              <span>Dashboard</span>
            </NuxtLink>
            <NuxtLink 
              to="/influencer/campaigns" 
              class="flex items-center space-x-3 p-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
            >
              <span>🎯</span>
              <span>Discover Campaigns</span>
            </NuxtLink>
            <NuxtLink 
              to="/influencer/campaigns/applications" 
              class="flex items-center space-x-3 p-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
            >
              <span>📨</span>
              <span>My Applications</span>
              <span v-if="pendingApplications > 0" class="bg-orange-500 text-white text-xs rounded-full px-2 py-1 ml-auto">
                {{ pendingApplications }}
              </span>
            </NuxtLink>
            <NuxtLink 
              to="/influencer/dashboard" 
              class="flex items-center space-x-3 p-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
            >
              <span>📊</span>
              <span>Dashboard</span>
            </NuxtLink>
            <NuxtLink 
              to="/influencer/campaigns" 
              class="flex items-center space-x-3 p-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
            >
              <span>🎯</span>
              <span>Campaigns</span>
            </NuxtLink>
            <NuxtLink 
              to="/influencer/requests" 
              class="flex items-center space-x-3 p-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
            >
              <span>📨</span>
              <span>Requests</span>
              <span v-if="pendingRequests > 0" class="bg-orange-500 text-white text-xs rounded-full px-2 py-1 ml-auto">
                {{ pendingRequests }}
              </span>
            </NuxtLink>
            <NuxtLink 
              to="/influencer/content" 
              class="flex items-center space-x-3 p-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
            >
              <span>📱</span>
              <span>Content</span>
            </NuxtLink>
            <NuxtLink 
              to="/influencer/earnings" 
              class="flex items-center space-x-3 p-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
            >
              <span>💰</span>
              <span>Earnings</span>
            </NuxtLink>
            <NuxtLink 
              to="/influencer/analytics" 
              class="flex items-center space-x-3 p-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
            >
              <span>📈</span>
              <span>Analytics</span>
            </NuxtLink>
            <NuxtLink 
              to="/influencer/profile" 
              class="flex items-center space-x-3 p-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
            >
              <span>👤</span>
              <span>Profile</span>
            </NuxtLink>
          </nav>

          <!-- Quick Stats -->
          <div class="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 class="font-medium text-gray-900 mb-3">Quick Stats</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Balance</span>
                <span class="font-semibold">${{ currentBalance }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Active Campaigns</span>
                <span class="font-semibold">{{ activeCampaigns }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Pending</span>
                <span class="font-semibold">{{ pendingContent }}</span>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="flex-1">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
// Add auth protection to influencer layout
definePageMeta({
  middleware: 'auth-new', 
  requiredUserType: 'influencer'
})

const { user, logout }  = useAuthStore()

// Mock data for dashboard stats
const unreadNotifications = ref(3)
const pendingRequests = ref(2)
const currentBalance = ref(1250)
const activeCampaigns = ref(4)
const pendingContent = ref(1)
const pendingApplications = ref(2)

const userInitials = computed(() => {
  return user.value?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'I'
})

const handleLogout = () => {
  if (confirm('Are you sure you want to sign out?')) {
    logout()
  }
}
</script>
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Brand Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <!-- Logo & Brand Name -->
          <div class="flex items-center space-x-4">
            <NuxtLink to="/brand" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-blue-600 rounded-lg"></div>
              <span class="text-xl font-bold text-gray-900">InfluenceHub</span>
            </NuxtLink>
            <span class="text-gray-400">|</span>
            <span class="text-lg font-semibold text-gray-700">Brand Dashboard</span>
          </div>

          <!-- User Menu -->
          <div class="flex items-center space-x-4">
            <button class="p-2 text-gray-600 hover:text-blue-600">
              <span class="text-lg">🔔</span>
            </button>
            <div class="relative group">
              <button class="flex items-center space-x-2 text-gray-700">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {{ userInitials }}
                </div>
                <span>{{ user?.name }}</span>
                <span>▼</span>
              </button>
              
              <!-- Dropdown Menu -->
              <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="p-2">
                  <div class="px-3 py-2 text-sm text-gray-600 border-b border-gray-100">
                    Signed in as <strong>{{ user?.email }}</strong>
                  </div>
                  <NuxtLink 
                    to="/brand/profile" 
                    class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                  >
                    👤 Your Profile
                  </NuxtLink>
                  <NuxtLink 
                    to="/brand/settings" 
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
              to="/brand/dashboard" 
              class="flex items-center space-x-3 p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
            >
              <span>📊</span>
              <span>Dashboard</span>
            </NuxtLink>
            <NuxtLink 
              to="/brand/campaigns" 
              class="flex items-center space-x-3 p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
            >
              <span>🎯</span>
              <span>Campaigns</span>
            </NuxtLink>
            <NuxtLink 
              to="/brand/influencers" 
              class="flex items-center space-x-3 p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
            >
              <span>⭐</span>
              <span>Influencers</span>
            </NuxtLink>
            <NuxtLink 
              to="/brand/wallet" 
              class="flex items-center space-x-3 p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
            >
              <span>💰</span>
              <span>Wallet</span>
            </NuxtLink>
            <NuxtLink 
              to="/brand/profile" 
              class="flex items-center space-x-3 p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
            >
              <span>👤</span>
              <span>Profile</span>
            </NuxtLink>
            <NuxtLink 
              to="/brand/settings" 
              class="flex items-center space-x-3 p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
            >
              <span>⚙️</span>
              <span>Settings</span>
            </NuxtLink>
          </nav>
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
// Add auth protection to brand layout
definePageMeta({
  middleware: 'auth-new', 
  requiredUserType: 'brand'
})

const { user, logout }  = useAuthStore()

const userInitials = computed(() => {
  return user?.value?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'
})

const handleLogout = () => {
  if (confirm('Are you sure you want to sign out?')) {
    logout()
  }
}
</script>
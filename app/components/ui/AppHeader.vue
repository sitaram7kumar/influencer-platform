<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-blue-600 rounded-lg"></div>
            <span class="text-xl font-bold text-gray-900">InfluenceHub</span>
          </NuxtLink>
        </div>

        <!-- Debug Info (remove after testing) -->
        <div class="text-xs text-gray-500" v-if="isAuthenticated">
          Debug: Authenticated as {{ user?.name }} ({{ user?.type }})
        </div>

        <!-- Navigation - Different for authenticated vs guest -->
        <nav class="hidden md:flex space-x-8" v-if="!isAuthenticated">
          <!-- Public Navigation -->
          <NuxtLink 
            to="/" 
            class="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="text-gray-600 hover:text-blue-600 transition-colors"
          >
            About
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            class="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Contact
          </NuxtLink>
          <NuxtLink 
            to="/pricing" 
            class="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Pricing
          </NuxtLink>
        </nav>

        <nav class="hidden md:flex space-x-8" v-else>
          <!-- Authenticated User Navigation -->
          <NuxtLink 
            :to="dashboardPath" 
            class="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Dashboard
          </NuxtLink>
          <NuxtLink 
            to="/discover" 
            class="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Discover
          </NuxtLink>
          <NuxtLink 
            to="/help" 
            class="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Help
          </NuxtLink>
        </nav>

        <!-- Auth Buttons - Different for authenticated vs guest -->
        <div class="flex items-center space-x-4" v-if="!isAuthenticated">
          <!-- Guest Buttons -->
          <NuxtLink 
            to="/auth/login" 
            class="text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            Sign In
          </NuxtLink>
          <NuxtLink 
            to="/auth/register" 
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Get Started
          </NuxtLink>
        </div>

        <div class="flex items-center space-x-4" v-else>
          <!-- Authenticated User Info -->
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {{ userInitials }}
            </div>
            <div class="hidden sm:block">
              <p class="text-sm font-medium text-gray-900">{{ user?.name }}</p>
              <p class="text-xs text-gray-500 capitalize">{{ user?.type }}</p>
            </div>
          </div>
          
          <button 
            @click="handleLogout"
            class="text-gray-600 hover:text-red-600 transition-colors font-medium text-sm"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const { user, isAuthenticated, logout } = useAuth()

// Debug logging
console.log('AppHeader - isAuthenticated:', isAuthenticated.value)
console.log('AppHeader - user:', user.value)

const userInitials = computed(() => {
  return user.value?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'
})

const dashboardPath = computed(() => {
  const userType = user.value?.type
  const paths = {
    brand: '/brand/dashboard',
    influencer: '/influencer/dashboard',
    agency: '/agency/dashboard',
    admin: '/admin/dashboard'
  }
  return paths[userType] || '/'
})

const handleLogout = () => {
  if (confirm('Are you sure you want to sign out?')) {
    logout()
  }
}
</script>
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

        <!-- Debug Info -->
        <div class="text-xs text-gray-500" v-if="authStore.isAuthenticated">
          Debug: {{ authStore.user?.name }} ({{ authStore.user?.type }})
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-8" v-if="!authStore.isAuthenticated">
          <NuxtLink to="/" class="text-gray-600 hover:text-blue-600 transition-colors">Home</NuxtLink>
          <NuxtLink to="/about" class="text-gray-600 hover:text-blue-600 transition-colors">About</NuxtLink>
          <NuxtLink to="/contact" class="text-gray-600 hover:text-blue-600 transition-colors">Contact</NuxtLink>
          <NuxtLink to="/pricing" class="text-gray-600 hover:text-blue-600 transition-colors">Pricing</NuxtLink>
        </nav>

        <nav class="hidden md:flex space-x-8" v-else>
          <NuxtLink :to="dashboardPath" class="text-gray-600 hover:text-blue-600 transition-colors">Dashboard</NuxtLink>
          <NuxtLink to="/discover" class="text-gray-600 hover:text-blue-600 transition-colors">Discover</NuxtLink>
          <NuxtLink to="/help" class="text-gray-600 hover:text-blue-600 transition-colors">Help</NuxtLink>
        </nav>

        <!-- Auth Buttons -->
        <div class="flex items-center space-x-4" v-if="!authStore.isAuthenticated">
          <NuxtLink to="/auth/login" class="text-gray-600 hover:text-blue-600 transition-colors font-medium">Sign In</NuxtLink>
          <NuxtLink to="/auth/register" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">Get Started</NuxtLink>
        </div>

        <div class="flex items-center space-x-4" v-else>
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm" :class="userType === 'influencer' ? 'bg-gradient-to-br from-purple-400 to-pink-500' : 'bg-blue-500'">
              {{ userInitials }}
            </div>
            <div class="hidden sm:block">
              <p class="text-sm font-medium text-gray-900">{{ authStore.user?.name }}</p>
              <p class="text-xs text-gray-500 capitalize">{{ authStore.user?.type }}</p>
            </div>
          </div>
          <button @click="handleLogout" class="text-gray-600 hover:text-red-600 transition-colors font-medium text-sm">Sign Out</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const authStore = useAuthStore()

const userType = computed(() => authStore.getUserType())

const userInitials = computed(() => {
  return authStore.user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'
})

const dashboardPath = computed(() => {
  const paths = {
    brand: '/brand/dashboard',
    influencer: '/influencer/dashboard',
    agency: '/agency/dashboard',
    admin: '/admin/dashboard'
  }
  return paths[userType.value] || '/'
})

const handleLogout = () => {
  if (confirm('Are you sure you want to sign out?123')) {
    authStore.logout()
  }
}

// Log header state
onMounted(() => {
  console.log('AppHeader - Auth state:', {
    isAuthenticated: authStore.isAuthenticated,
    user: authStore.user
  })
})
</script>
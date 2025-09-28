<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-blue-600 rounded-lg"></div>
          <span class="text-xl font-bold text-gray-900">InfluenceHub</span>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-8">
          <NuxtLink 
            to="/" 
            class="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/discover" 
            class="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Discover
          </NuxtLink>
          <NuxtLink 
            to="/pricing" 
            class="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Pricing
          </NuxtLink>
        </nav>

        <!-- Auth Buttons -->
        <div class="flex items-center space-x-4">
          <NuxtLink 
            to="/auth/login" 
            class="btn-secondary"
          >
            Sign In
          </NuxtLink>
          <NuxtLink 
            to="/auth/register" 
            class="btn-primary"
          >
            Get Started
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
// Component logic will go here later
</script>
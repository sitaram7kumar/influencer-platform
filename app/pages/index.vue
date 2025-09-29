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
      </div>
    </div>
  </header>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
    <!-- Hero Section -->
    <section class="max-w-6xl mx-auto px-4 py-16 text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Connect Brands & Influencers
      </h1>
      <p class="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
        The ultimate platform for influencer marketing campaigns. Create, manage, and track campaigns seamlessly.
      </p>
      
      <!-- Primary CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <NuxtLink 
          to="/auth/register?type=brand" 
          class="bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-700 transition-colors shadow-md"
        >
          I'm a Brand
        </NuxtLink>
        <NuxtLink 
          to="/auth/register?type=influencer" 
          class="border border-gray-300 bg-white text-gray-800 px-6 py-3 rounded-lg text-base font-medium hover:bg-gray-50 transition-colors shadow-sm"
        >
          I'm an Influencer
        </NuxtLink>
      </div>

      <!-- Secondary Auth Links -->
      <div class="flex justify-center items-center space-x-4 text-sm text-gray-600">
        <span>Already have an account?</span>
        <NuxtLink 
          to="/auth/login" 
          class="text-blue-600 hover:text-blue-700 font-medium underline"
        >
          Sign In
        </NuxtLink>
        <span class="text-gray-400">|</span>
        <NuxtLink 
          to="/auth/register" 
          class="text-green-600 hover:text-green-700 font-medium underline"
        >
          Create Account
        </NuxtLink>
      </div>
    </section>

    <!-- Features Section -->
    <section class="max-w-6xl mx-auto px-4 py-16 bg-white rounded-2xl shadow-sm mt-8">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center p-6 rounded-lg bg-blue-50">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">🎯</span>
          </div>
          <h3 class="text-xl font-semibold mb-2 text-gray-900">Create Campaigns</h3>
          <p class="text-gray-600">Brands create targeted campaigns with specific requirements and budgets.</p>
        </div>
        
        <div class="text-center p-6 rounded-lg bg-green-50">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">🤝</span>
          </div>
          <h3 class="text-xl font-semibold mb-2 text-gray-900">Connect & Collaborate</h3>
          <p class="text-gray-600">Influencers discover relevant campaigns and apply to collaborate.</p>
        </div>
        
        <div class="text-center p-6 rounded-lg bg-purple-50">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">💸</span>
          </div>
          <h3 class="text-xl font-semibold mb-2 text-gray-900">Secure Payments</h3>
          <p class="text-gray-600">Automated wallet system ensures secure and timely payments for all parties.</p>
        </div>
      </div>

      <!-- Quick Access Buttons -->
      <div class="mt-12 text-center">
        <p class="text-gray-600 mb-4">Quick access:</p>
        <div class="flex flex-wrap justify-center gap-3">
          <NuxtLink 
            to="/auth/login" 
            class="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Login
          </NuxtLink>
          <NuxtLink 
            to="/auth/register?type=brand" 
            class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            Brand Signup
          </NuxtLink>
          <NuxtLink 
            to="/auth/register?type=influencer" 
            class="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
          >
            Influencer Signup
          </NuxtLink>
          <NuxtLink 
            to="/auth/register?type=agency" 
            class="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors"
          >
            Agency Signup
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})
</script>
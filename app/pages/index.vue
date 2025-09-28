<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Hero Section -->
    <section class="container mx-auto px-4 py-16 text-center">
      <h1 class="text-5xl font-bold text-gray-900 mb-6">
        Connect Brands & Influencers
      </h1>
      <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        The ultimate platform for influencer marketing campaigns. Create, manage, and track campaigns seamlessly.
      </p>
      <div class="space-x-4">
        <NuxtLink to="/auth/register?type=brand" class="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-blue-700 transition-colors font-medium">
          I'm a Brand
        </NuxtLink>
        <NuxtLink to="/auth/register?type=influencer" class="border border-gray-300 bg-white px-8 py-4 rounded-lg text-lg hover:bg-gray-50 transition-colors font-medium">
          I'm an Influencer
        </NuxtLink>
      </div>
    </section>

    <!-- Features Section -->
    <section class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center p-6">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">🎯</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">Create Campaigns</h3>
          <p class="text-gray-600">Brands create targeted campaigns with specific requirements and budgets.</p>
        </div>
        
        <div class="text-center p-6">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">🤝</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">Connect & Collaborate</h3>
          <p class="text-gray-600">Influencers discover relevant campaigns and apply to collaborate.</p>
        </div>
        
        <div class="text-center p-6">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">💸</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">Secure Payments</h3>
          <p class="text-gray-600">Automated wallet system ensures secure and timely payments for all parties.</p>
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
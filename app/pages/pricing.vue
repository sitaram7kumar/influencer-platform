<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">Pricing</h1>
        <p class="text-xl text-gray-600 mb-8">
          Choose the plan that works best for your business.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div class="border border-gray-200 rounded-lg p-6">
            <h3 class="text-xl font-semibold mb-4">Starter</h3>
            <p class="text-3xl font-bold text-gray-900 mb-4">$99<span class="text-lg text-gray-600">/mo</span></p>
            <ul class="text-gray-600 space-y-2 mb-6">
              <li>• Up to 5 campaigns</li>
              <li>• Basic analytics</li>
              <li>• Email support</li>
            </ul>
            <button class="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors">
              Get Started
            </button>
          </div>
          
          <div class="border-2 border-blue-500 rounded-lg p-6 bg-blue-50">
            <h3 class="text-xl font-semibold mb-4">Professional</h3>
            <p class="text-3xl font-bold text-gray-900 mb-4">$299<span class="text-lg text-gray-600">/mo</span></p>
            <ul class="text-gray-600 space-y-2 mb-6">
              <li>• Up to 20 campaigns</li>
              <li>• Advanced analytics</li>
              <li>• Priority support</li>
            </ul>
            <button class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>
          
          <div class="border border-gray-200 rounded-lg p-6">
            <h3 class="text-xl font-semibold mb-4">Enterprise</h3>
            <p class="text-3xl font-bold text-gray-900 mb-4">Custom</p>
            <ul class="text-gray-600 space-y-2 mb-6">
              <li>• Unlimited campaigns</li>
              <li>• Custom analytics</li>
              <li>• Dedicated support</li>
            </ul>
            <button class="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})
</script>
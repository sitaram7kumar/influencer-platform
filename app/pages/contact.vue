<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
        <p class="text-xl text-gray-600 mb-8">
          Get in touch with our team for any questions or support.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div class="bg-gray-50 rounded-lg p-6">
            <h3 class="text-lg font-semibold mb-4">Support</h3>
            <p class="text-gray-600 mb-2">Email: support@influencehub.com</p>
            <p class="text-gray-600">Response time: 24 hours</p>
          </div>
          
          <div class="bg-gray-50 rounded-lg p-6">
            <h3 class="text-lg font-semibold mb-4">Partnerships</h3>
            <p class="text-gray-600 mb-2">Email: partnerships@influencehub.com</p>
            <p class="text-gray-600">For brand collaborations</p>
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
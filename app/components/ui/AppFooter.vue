<template>
  <footer class="bg-gray-800 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company -->
        <div>
          <h3 class="text-lg font-semibold mb-4">InfluenceHub</h3>
          <p class="text-gray-400">
            Connecting brands with influencers for successful campaigns.
          </p>
        </div>

        <!-- Links -->
        <div>
          <h4 class="font-semibold mb-4">Platform</h4>
          <ul class="space-y-2 text-gray-400">
            <li><NuxtLink to="/discover" class="hover:text-white">Discover</NuxtLink></li>
            <li><NuxtLink to="/pricing" class="hover:text-white">Pricing</NuxtLink></li>
            <li><NuxtLink to="/features" class="hover:text-white">Features</NuxtLink></li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h4 class="font-semibold mb-4">Support</h4>
          <ul class="space-y-2 text-gray-400">
            <li><NuxtLink to="/help" class="hover:text-white">Help Center</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-white">Contact</NuxtLink></li>
            <li><NuxtLink to="/privacy" class="hover:text-white">Privacy</NuxtLink></li>
          </ul>
        </div>

        <!-- User Types -->
        <div>
          <h4 class="font-semibold mb-4">Join As</h4>
          <div class="space-y-2">
            <NuxtLink 
              to="/auth/register?type=brand" 
              class="block text-gray-400 hover:text-white"
            >
              Brand
            </NuxtLink>
            <NuxtLink 
              to="/auth/register?type=influencer" 
              class="block text-gray-400 hover:text-white"
            >
              Influencer
            </NuxtLink>
            <NuxtLink 
              to="/auth/register?type=agency" 
              class="block text-gray-400 hover:text-white"
            >
              Agency
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2024 InfluenceHub. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer logic
</script>
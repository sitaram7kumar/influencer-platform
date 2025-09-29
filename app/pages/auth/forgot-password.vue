<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Back to Login -->
      <div class="text-left">
        <NuxtLink to="/auth/login" class="text-blue-600 hover:text-blue-500 font-medium flex items-center">
          ← Back to Sign In
        </NuxtLink>
      </div>

      <div>
        <h2 class="mt-2 text-center text-3xl font-extrabold text-gray-900">
          Reset your password
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Enter your email and we'll send you a reset link
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleResetPassword">
        <div>
          <label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
          <input
            id="email-address"
            v-model="form.email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your email address"
          >
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Send Reset Link
          </button>
        </div>

        <!-- Support Contact -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Need help? 
            <NuxtLink to="/contact" class="font-medium text-blue-600 hover:text-blue-500">
              Contact support
            </NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const form = ref({
  email: ''
})

const handleResetPassword = () => {
  // TODO: Implement password reset logic
  console.log('Password reset requested for:', form.value.email)
  alert('Reset link would be sent to: ' + form.value.email)
}
</script>
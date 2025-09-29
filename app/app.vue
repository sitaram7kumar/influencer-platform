<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const authStore = useAuthStore()

// Initialize auth immediately when app starts
onMounted(() => {
  console.log('🚀 App mounted - initializing auth store...')
  authStore.initializeAuth()
})

// Also initialize on client side
if (process.client) {
  authStore.initializeAuth()
}
</script>
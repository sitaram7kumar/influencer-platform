<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const { checkAuth } = useAuth()

// Initialize auth state when app starts
onMounted(() => {
  checkAuth()
})
</script>
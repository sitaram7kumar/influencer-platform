// Client-side auth plugin - runs before everything else
export default defineNuxtPlugin(() => {
  console.log('🔌 Auth plugin running...')
  
  // Create auth store
  const authStore = useAuthStore()
  
  // Initialize auth immediately when plugin loads
  authStore.initializeAuth()
  
  console.log('✅ Auth plugin completed - isAuthenticated:', authStore.isAuthenticated)
})
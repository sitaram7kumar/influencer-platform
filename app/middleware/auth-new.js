// New middleware that handles auth initialization properly
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  console.log('🔄 auth-new middleware running for:', to.path)
  console.log('Auth state:', {
    isAuthenticated: authStore.isAuthenticated,
    isInitialized: authStore.isInitialized,
    userType: authStore.getUserType()
  })
  
  // If auth isn't initialized yet, we can't make decisions
  // Let the page render and handle it there
  if (!authStore.isInitialized) {
    console.log('⚠️ Auth not initialized yet, allowing page render')
    return
  }
  
  // Now we can check auth properly
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log('🚫 Redirecting to login: not authenticated')
    return navigateTo('/auth/login')
  }
  
  if (to.meta.requiredUserType) {
    const userType = authStore.getUserType()
    if (userType !== to.meta.requiredUserType) {
      console.log(`🚫 Redirecting: user type "${userType}" doesn't match required "${to.meta.requiredUserType}"`)
      const redirectPath = getDashboardPath(userType) || '/'
      return navigateTo(redirectPath)
    }
  }
  
  console.log('✅ Access granted to:', to.path)
})

function getDashboardPath(userType) {
  const paths = {
    brand: '/brand/dashboard',
    influencer: '/influencer/dashboard',
    agency: '/agency/dashboard',
    admin: '/admin/dashboard'
  }
  return paths[userType]
}
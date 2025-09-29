// New auth middleware that works with Pinia store
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  console.log('🔐 AUTH2 MIDDLEWARE:', {
    to: to.path,
    isAuthenticated: authStore.isAuthenticated,
    userType: authStore.getUserType(),
    requiresAuth: to.meta.requiresAuth,
    requiredUserType: to.meta.requiredUserType
  })
  
  // If route requires auth but user is not authenticated
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log('🚫 Redirecting to login: not authenticated')
    return navigateTo('/auth/login')
  }
  
  // Check user type for route access
  if (to.meta.requiredUserType) {
    const userType = authStore.getUserType()
    if (userType !== to.meta.requiredUserType) {
      console.log(`🚫 Redirecting: user type "${userType}" doesn't match required "${to.meta.requiredUserType}"`)
      const redirectPath = getDashboardPath(userType) || '/'
      return navigateTo(redirectPath)
    }
  }
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
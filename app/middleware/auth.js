// Authentication middleware - protect routes that require auth
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated, getUserType, checkAuth } = useAuth()
  
  // Wait for auth state to be initialized from localStorage
  if (process.client) {
    // Ensure auth state is loaded from localStorage
    checkAuth()
    
    // Small delay to allow state to be restored
    await new Promise(resolve => setTimeout(resolve, 10))
  }
  
  const debugInfo = {
    to: to.path,
    from: from.path,
    isAuthenticated: isAuthenticated.value,
    userType: getUserType(),
    requiresAuth: to.meta.requiresAuth,
    requiredUserType: to.meta.requiredUserType
  }
  
  console.log('🔐 AUTH MIDDLEWARE DEBUG:', debugInfo)
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    console.log('🚫 Redirecting to login: not authenticated')
    return navigateTo('/auth/login')
  }
  
  // Check user type for route access
  if (to.meta.requiredUserType) {
    const userType = getUserType()
    if (userType !== to.meta.requiredUserType) {
      console.log(`🚫 Redirecting: user type "${userType}" doesn't match required "${to.meta.requiredUserType}"`)
      const redirectPath = getDashboardPath(userType) || '/'
      console.log(`📍 Redirecting to: ${redirectPath}`)
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
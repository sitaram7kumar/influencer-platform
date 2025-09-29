// Guest middleware - redirect authenticated users away from auth pages
export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated, getUserType } = useAuth()
  
  // If user is authenticated, redirect to their dashboard
  if (isAuthenticated.value) {
    const userType = getUserType()
    const redirectPath = getDashboardPath(userType)
    return navigateTo(redirectPath)
  }
})

function getDashboardPath(userType) {
  const paths = {
    brand: '/brand/dashboard',
    influencer: '/influencer/dashboard',
    agency: '/agency/dashboard',
    admin: '/admin/dashboard'
  }
  return paths[userType] || '/'
}
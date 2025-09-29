// Authentication middleware
// export default defineNuxtRouteMiddleware((to, from) => {
//   const { isAuthenticated, getUserType } = useAuth()
  
//   // Check if route requires authentication
//   if (to.meta.requiresAuth && !isAuthenticated.value) {
//     return navigateTo('/auth/login')
//   }
  
//   // Check if route is for guests only (like login/register)
//   if (to.meta.guest && isAuthenticated.value) {
//     const userType = getUserType()
//     const redirectPath = getDashboardPath(userType)
//     return navigateTo(redirectPath)
//   }
  
//   // Check user type for route access
//   if (to.meta.requiredUserType) {
//     const userType = getUserType()
//     if (userType !== to.meta.requiredUserType) {
//       const redirectPath = getDashboardPath(userType)
//       return navigateTo(redirectPath)
//     }
//   }
// })

// function getDashboardPath(userType) {
//   const paths = {
//     brand: '/brand/dashboard',
//     influencer: '/influencer/dashboard',
//     agency: '/agency/dashboard',
//     admin: '/admin/dashboard'
//   }
//   return paths[userType] || '/'
// }

// Authentication middleware - protect routes that require auth
export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated, getUserType } = useAuth()
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return navigateTo('/auth/login')
  }
  
  // Check user type for route access
  if (to.meta.requiredUserType) {
    const userType = getUserType()
    if (userType !== to.meta.requiredUserType) {
      const redirectPath = getDashboardPath(userType)
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
  return paths[userType] || '/'
}
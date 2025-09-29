export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)
  const isInitialized = ref(false) // Track if auth is initialized

  // Mock user data (same as before)
  const mockUsers = {
    brand: {
      id: 1,
      name: 'Nike Marketing',
      email: 'nike@example.com',
      type: 'brand',
      avatar: null,
      company: 'Nike Inc.',
      plan: 'premium'
    },
    influencer: {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      type: 'influencer',
      avatar: null,
      followers: 125000,
      platform: 'instagram',
      engagement: 4.8,
      category: 'fashion'
    }
  }

  const login = async (email, password, userType) => {
    isLoading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      let userData = null
      switch (userType) {
        case 'brand':
          userData = { ...mockUsers.brand, email }
          break
        case 'influencer':
          userData = { ...mockUsers.influencer, email }
          break
        default:
          throw new Error('Invalid user type')
      }
      
      if (password !== 'password') {
        throw new Error('Invalid credentials')
      }
      
      user.value = userData
      isAuthenticated.value = true
      
      if (process.client) {
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('isAuthenticated', 'true')
      }
      
      return { success: true, user: userData }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }

const logout = () => {
    console.log(33333, 22222)
  // Clear state immediately
  user.value = null
  isAuthenticated.value = false
  isInitialized.value = true
  console.log(44444, 22222)
  // Clear localStorage
  if (process.client) {
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
    console.log('✅ Auth state cleared from localStorage')
  }
  console.log(111111111, 22222)
  
  // Use window.location for immediate redirect to avoid any state conflicts
  if (process.client) {
    window.location.href = '/'
  }
}

  // Initialize auth state from localStorage
  const initializeAuth = () => {
    if (process.client && !isInitialized.value) {
      console.log('🔄 initializeAuth called')
      const storedUser = localStorage.getItem('user')
      const storedAuth = localStorage.getItem('isAuthenticated')
      
      console.log('Stored data:', { storedUser, storedAuth })
      
      if (storedUser && storedAuth === 'true') {
        try {
          user.value = JSON.parse(storedUser)
          isAuthenticated.value = true
          console.log('✅ Auth initialized from localStorage:', user.value)
        } catch (error) {
          console.error('Error parsing stored user:', error)
          localStorage.removeItem('user')
          localStorage.removeItem('isAuthenticated')
        }
      }
      isInitialized.value = true
    }
  }

  const getUserType = () => {
    return user.value?.type
  }

  return {
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),
    isInitialized: readonly(isInitialized),
    login,
    logout,
    initializeAuth,
    getUserType
  }
})
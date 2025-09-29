// Composable for authentication
export const useAuth = () => {
  const user = ref(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)

  // Mock user data - in real app, this would come from API
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
      platform: 'instagram'
    },
    agency: {
      id: 3,
      name: 'Creative Agency',
      email: 'agency@example.com',
      type: 'agency',
      avatar: null,
      clients: 15
    },
    admin: {
      id: 4,
      name: 'Platform Admin',
      email: 'admin@influencehub.com',
      type: 'admin',
      avatar: null
    }
  }

  // Login function
  const login = async (email, password, userType) => {
    isLoading.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock authentication logic
      let userData = null
      
      switch (userType) {
        case 'brand':
          userData = mockUsers.brand
          break
        case 'influencer':
          userData = mockUsers.influencer
          break
        case 'agency':
          userData = mockUsers.agency
          break
        case 'admin':
          userData = mockUsers.admin
          break
        default:
          throw new Error('Invalid user type')
      }
      
      // Mock password check (in real app, this would be server-side)
      if (password !== 'password') {
        throw new Error('Invalid credentials')
      }
      
      user.value = userData
      isAuthenticated.value = true
      
      // Store in localStorage (in real app, use secure token)
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('isAuthenticated', 'true')
      
      return { success: true, user: userData }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }

  // Register function
  const register = async (userData) => {
    isLoading.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock registration logic
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        ...userData,
        createdAt: new Date().toISOString()
      }
      
      user.value = newUser
      isAuthenticated.value = true
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(newUser))
      localStorage.setItem('isAuthenticated', 'true')
      
      return { success: true, user: newUser }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }

  // Logout function
  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
    navigateTo('/auth/login')
  }

  // Check if user is authenticated
  const checkAuth = () => {
    const storedUser = localStorage.getItem('user')
    const storedAuth = localStorage.getItem('isAuthenticated')
    
    if (storedUser && storedAuth === 'true') {
      user.value = JSON.parse(storedUser)
      isAuthenticated.value = true
    }
  }

  // Get user type
  const getUserType = () => {
    return user.value?.type
  }

  // Check if user has specific role
  const hasRole = (role) => {
    return user.value?.type === role
  }

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      user.value = { ...user.value, ...updates }
      localStorage.setItem('user', JSON.stringify(user.value))
      
      return { success: true, user: user.value }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Initialize auth state
  onMounted(() => {
    checkAuth()
  })

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    checkAuth,
    getUserType,
    hasRole,
    updateProfile
  }
}
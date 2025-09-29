// Composable for API calls
export const useApi = () => {
  const config = useRuntimeConfig()
  
  // Generic API call function
  const apiCall = async (endpoint, options = {}) => {
    const baseURL = config.public.apiBase || 'http://localhost:3001/api'
    
    try {
      const response = await $fetch(`${baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          // Add auth token here later
          ...options.headers
        },
        ...options
      })
      
      return response
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  // Specific API methods
  const get = (endpoint) => apiCall(endpoint, { method: 'GET' })
  
  const post = (endpoint, data) => apiCall(endpoint, {
    method: 'POST',
    body: data
  })
  
  const put = (endpoint, data) => apiCall(endpoint, {
    method: 'PUT',
    body: data
  })
  
  const del = (endpoint) => apiCall(endpoint, { method: 'DELETE' })

  return {
    apiCall,
    get,
    post,
    put,
    delete: del
  }
}
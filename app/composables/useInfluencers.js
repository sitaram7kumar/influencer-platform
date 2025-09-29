// Composable for influencer-related operations
export const useInfluencers = () => {
  // Mock influencers data
  const influencers = ref([
    {
      id: 1,
      name: 'Sarah Johnson',
      username: '@sarahj',
      platform: 'instagram',
      followers: 125000,
      engagement: 4.2,
      category: 'fashion',
      location: 'New York, USA',
      avatar: null,
      priceRange: { min: 300, max: 800 },
      verified: true,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Mike Chen',
      username: '@mikechen',
      platform: 'youtube',
      followers: 89000,
      engagement: 5.1,
      category: 'tech',
      location: 'San Francisco, USA',
      avatar: null,
      priceRange: { min: 500, max: 1200 },
      verified: true,
      rating: 4.9
    },
    {
      id: 3,
      name: 'Emma Davis',
      username: '@emmad',
      platform: 'tiktok',
      followers: 210000,
      engagement: 8.7,
      category: 'dance',
      location: 'Los Angeles, USA',
      avatar: null,
      priceRange: { min: 400, max: 900 },
      verified: false,
      rating: 4.6
    },
    {
      id: 4,
      name: 'Alex Rodriguez',
      username: '@alexr',
      platform: 'instagram',
      followers: 75000,
      engagement: 3.8,
      category: 'fitness',
      location: 'Miami, USA',
      avatar: null,
      priceRange: { min: 200, max: 500 },
      verified: true,
      rating: 4.7
    }
  ])

  // Platform options
  const platforms = [
    { value: 'instagram', label: 'Instagram', icon: '📸' },
    { value: 'youtube', label: 'YouTube', icon: '🎥' },
    { value: 'tiktok', label: 'TikTok', icon: '🎵' },
    { value: 'twitter', label: 'Twitter', icon: '🐦' }
  ]

  // Category options
  const categories = [
    { value: 'fashion', label: 'Fashion' },
    { value: 'beauty', label: 'Beauty' },
    { value: 'tech', label: 'Technology' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'food', label: 'Food' },
    { value: 'travel', label: 'Travel' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'gaming', label: 'Gaming' }
  ]

  // Get influencer by ID
  const getInfluencer = (id) => {
    return influencers.value.find(influencer => influencer.id === parseInt(id))
  }

  // Filter influencers
  const filterInfluencers = (filters = {}) => {
    return influencers.value.filter(influencer => {
      let matches = true

      if (filters.platform && influencer.platform !== filters.platform) {
        matches = false
      }

      if (filters.category && influencer.category !== filters.category) {
        matches = false
      }

      if (filters.minFollowers && influencer.followers < filters.minFollowers) {
        matches = false
      }

      if (filters.maxPrice && influencer.priceRange.min > filters.maxPrice) {
        matches = false
      }

      if (filters.location && !influencer.location.toLowerCase().includes(filters.location.toLowerCase())) {
        matches = false
      }

      if (filters.verifiedOnly && !influencer.verified) {
        matches = false
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const matchesSearch = 
          influencer.name.toLowerCase().includes(searchTerm) ||
          influencer.username.toLowerCase().includes(searchTerm) ||
          influencer.category.toLowerCase().includes(searchTerm)
        
        if (!matchesSearch) {
          matches = false
        }
      }

      return matches
    })
  }

  // Send collaboration request
  const sendCollaborationRequest = (influencerId, campaignId, message) => {
    // Simulate API call
    console.log('Sending collaboration request:', { influencerId, campaignId, message })
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          requestId: Math.random().toString(36).substr(2, 9),
          message: 'Collaboration request sent successfully'
        })
      }, 1000)
    })
  }

  // Calculate influencer score (for ranking)
  const calculateInfluencerScore = (influencer) => {
    const engagementScore = influencer.engagement * 10
    const followerScore = Math.log10(influencer.followers) * 5
    const ratingScore = influencer.rating * 10
    const verifiedBonus = influencer.verified ? 20 : 0
    
    return engagementScore + followerScore + ratingScore + verifiedBonus
  }

  return {
    influencers,
    platforms,
    categories,
    getInfluencer,
    filterInfluencers,
    sendCollaborationRequest,
    calculateInfluencerScore
  }
}
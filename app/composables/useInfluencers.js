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

  // Add these functions to your existing useCampaigns composable

// Get campaigns available for influencers (public campaigns)
const getAvailableCampaigns = (filters = {}) => {
  // Mock data - in real app, this would come from API
  const availableCampaigns = [
    {
      id: 101,
      name: 'Summer Fashion Launch 2024',
      brand: 'Nike',
      brandLogo: null,
      type: 'instagram_reels',
      budget: 2500,
      payment: 450, // Payment per influencer
      description: 'Launch our new summer collection with creative reels showcasing the vibrant colors and comfortable fit.',
      requirements: 'Minimum 50K followers, 3% engagement rate',
      category: 'fashion',
      location: 'Global',
      duration: '30 days',
      startDate: '2024-03-01',
      endDate: '2024-03-30',
      status: 'active',
      applicants: 24,
      maxInfluencers: 10,
      createdAt: '2024-02-15',
      contentGuidelines: 'Showcase product features, lifestyle integration, creative transitions',
      targetAudience: '18-35 age group, fashion enthusiasts',
      hashtags: ['#SummerStyle', '#NikeFashion', '#NewCollection']
    },
    {
      id: 102,
      name: 'Tech Gadget Review',
      brand: 'Apple',
      brandLogo: null,
      type: 'youtube_reviews',
      budget: 5000,
      payment: 800,
      description: 'Honest review of our latest tech gadget focusing on camera features and battery life.',
      requirements: 'Tech-focused content, minimum 25K subscribers',
      category: 'tech',
      location: 'USA, UK, Canada',
      duration: '14 days',
      startDate: '2024-02-25',
      endDate: '2024-03-10',
      status: 'active',
      applicants: 15,
      maxInfluencers: 5,
      createdAt: '2024-02-10',
      contentGuidelines: 'Focus on camera performance, battery life, unique features',
      targetAudience: 'Tech enthusiasts, early adopters',
      hashtags: ['#TechReview', '#AppleGadget', '#CameraTest']
    },
    {
      id: 103,
      name: 'Fitness Challenge 2024',
      brand: 'Gymshark',
      brandLogo: null,
      type: 'tiktok_campaign',
      budget: 3000,
      payment: 600,
      description: '30-day fitness challenge showcasing our activewear and fitness routines.',
      requirements: 'Fitness content, minimum 100K followers',
      category: 'fitness',
      location: 'Global',
      duration: '30 days',
      startDate: '2024-03-05',
      endDate: '2024-04-04',
      status: 'active',
      applicants: 42,
      maxInfluencers: 15,
      createdAt: '2024-02-20',
      contentGuidelines: 'Daily workout routines, progress updates, outfit features',
      targetAudience: 'Fitness enthusiasts, gym-goers',
      hashtags: ['#FitnessChallenge', '#Gymshark', '#WorkoutRoutine']
    },
    {
      id: 104,
      name: 'Beauty Product Launch',
      brand: 'Sephora',
      brandLogo: null,
      type: 'instagram_posts',
      budget: 4000,
      payment: 350,
      description: 'Launch of our new skincare line with before/after results and routine demonstrations.',
      requirements: 'Beauty/lifestyle content, minimum 30K followers',
      category: 'beauty',
      location: 'Global',
      duration: '21 days',
      startDate: '2024-03-10',
      endDate: '2024-03-31',
      status: 'active',
      applicants: 38,
      maxInfluencers: 12,
      createdAt: '2024-02-18',
      contentGuidelines: 'Skincare routine demonstration, product benefits, honest reviews',
      targetAudience: 'Beauty enthusiasts, skincare routine followers',
      hashtags: ['#Skincare', '#BeautyLaunch', '#Sephora']
    }
  ]

  // Apply filters
  return availableCampaigns.filter(campaign => {
    let matches = true

    if (filters.category && campaign.category !== filters.category) {
      matches = false
    }

    if (filters.type && campaign.type !== filters.type) {
      matches = false
    }

    if (filters.minPayment && campaign.payment < filters.minPayment) {
      matches = false
    }

    if (filters.location && !campaign.location.toLowerCase().includes(filters.location.toLowerCase())) {
      matches = false
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      const matchesSearch = 
        campaign.name.toLowerCase().includes(searchTerm) ||
        campaign.brand.toLowerCase().includes(searchTerm) ||
        campaign.description.toLowerCase().includes(searchTerm)
      
      if (!matchesSearch) {
        matches = false
      }
    }

    return matches
  })
}

// Apply to campaign
const applyToCampaign = async (campaignId, influencerId, message = '') => {
  console.log('Applying to campaign:', { campaignId, influencerId, message })
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  return {
    success: true,
    applicationId: Math.random().toString(36).substr(2, 9),
    message: 'Application submitted successfully!'
  }
}

// Get influencer's applications
const getInfluencerApplications = (influencerId) => {
  // Mock data
  return [
    {
      id: 1,
      campaignId: 101,
      campaignName: 'Summer Fashion Launch 2024',
      brand: 'Nike',
      appliedAt: '2024-02-20T10:30:00Z',
      status: 'pending', // pending, accepted, rejected
      payment: 450
    },
    {
      id: 2,
      campaignId: 102,
      campaignName: 'Tech Gadget Review',
      brand: 'Apple',
      appliedAt: '2024-02-18T14:20:00Z',
      status: 'accepted',
      payment: 800
    }
  ]
}
  return {
    influencers,
    platforms,
    categories,
    getInfluencer,
    filterInfluencers,
    sendCollaborationRequest,
    calculateInfluencerScore,
    getAvailableCampaigns,
    applyToCampaign,
    getInfluencerApplications
  }
}
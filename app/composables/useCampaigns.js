// Composable for campaign-related operations
export const useCampaigns = () => {
  // Mock data - will be replaced with API calls
  const campaigns = ref([
    {
      id: 1,
      name: 'Summer Collection 2024',
      type: 'instagram_reels',
      status: 'active',
      budget: 2500,
      influencers: 12,
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      createdAt: '2024-05-15'
    },
    {
      id: 2,
      name: 'New Running Shoes Launch',
      type: 'youtube_reviews',
      status: 'pending',
      budget: 1800,
      influencers: 8,
      startDate: '2024-07-01',
      endDate: '2024-07-31',
      createdAt: '2024-06-10'
    },
    {
      id: 3,
      name: 'Fitness Challenge',
      type: 'tiktok_campaign',
      status: 'completed',
      budget: 3200,
      influencers: 15,
      startDate: '2024-04-01',
      endDate: '2024-04-30',
      createdAt: '2024-03-20'
    }
  ])

  // Campaign types
  const campaignTypes = [
    { value: 'instagram_reels', label: 'Instagram Reels', icon: '🎬' },
    { value: 'instagram_posts', label: 'Instagram Posts', icon: '📸' },
    { value: 'instagram_stories', label: 'Instagram Stories', icon: '📱' },
    { value: 'youtube_reviews', label: 'YouTube Reviews', icon: '🎥' },
    { value: 'youtube_shorts', label: 'YouTube Shorts', icon: '⏱️' },
    { value: 'tiktok_campaign', label: 'TikTok Campaign', icon: '🎵' },
    { value: 'physical_visit', label: 'Physical Visit', icon: '🏢' },
    { value: 'performance', label: 'Performance', icon: '🎭' }
  ]

  // Campaign statuses
  const campaignStatuses = [
    { value: 'draft', label: 'Draft', color: 'gray' },
    { value: 'pending', label: 'Pending', color: 'yellow' },
    { value: 'active', label: 'Active', color: 'green' },
    { value: 'paused', label: 'Paused', color: 'orange' },
    { value: 'completed', label: 'Completed', color: 'blue' },
    { value: 'cancelled', label: 'Cancelled', color: 'red' }
  ]

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

  // Apply to campaign (for influencers)
  const applyToCampaignAsInfluencer = async (campaignId, influencerId, message = '') => {
    console.log('Influencer applying to campaign:', { campaignId, influencerId, message })
    
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

  // Get campaign by ID
  const getCampaign = (id) => {
    return campaigns.value.find(campaign => campaign.id === parseInt(id))
  }

  // Get campaigns by status
  const getCampaignsByStatus = (status) => {
    return campaigns.value.filter(campaign => campaign.status === status)
  }

  // Create new campaign (for brands)
  const createCampaign = (campaignData) => {
    const newCampaign = {
      id: Math.max(...campaigns.value.map(c => c.id)) + 1,
      ...campaignData,
      createdAt: new Date().toISOString().split('T')[0]
    }
    campaigns.value.push(newCampaign)
    return newCampaign
  }

  // Update campaign
  const updateCampaign = (id, updates) => {
    const index = campaigns.value.findIndex(campaign => campaign.id === parseInt(id))
    if (index !== -1) {
      campaigns.value[index] = { ...campaigns.value[index], ...updates }
      return campaigns.value[index]
    }
    return null
  }

  // Delete campaign
  const deleteCampaign = (id) => {
    const index = campaigns.value.findIndex(campaign => campaign.id === parseInt(id))
    if (index !== -1) {
      return campaigns.value.splice(index, 1)[0]
    }
    return null
  }

  // Get campaign statistics
  const getCampaignStats = () => {
    const total = campaigns.value.length
    const active = campaigns.value.filter(c => c.status === 'active').length
    const pending = campaigns.value.filter(c => c.status === 'pending').length
    const completed = campaigns.value.filter(c => c.status === 'completed').length
    const totalBudget = campaigns.value.reduce((sum, campaign) => sum + campaign.budget, 0)
    
    return {
      total,
      active,
      pending,
      completed,
      totalBudget
    }
  }

  return {
    campaigns,
    campaignTypes,
    campaignStatuses,
    getCampaign,
    getCampaignsByStatus,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    getCampaignStats,
    // Influencer-specific functions
    getAvailableCampaigns,
    applyToCampaignAsInfluencer,
    getInfluencerApplications
  }
}
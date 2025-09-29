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

  // Get campaign by ID
  const getCampaign = (id) => {
    return campaigns.value.find(campaign => campaign.id === parseInt(id))
  }

  // Get campaigns by status
  const getCampaignsByStatus = (status) => {
    return campaigns.value.filter(campaign => campaign.status === status)
  }

  // Create new campaign
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
    getCampaignStats
  }
}
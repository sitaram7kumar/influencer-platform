<template>
  <div v-if="campaign" class="space-y-6">
    <!-- Page Header -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex justify-between items-center">
        <div>
          <NuxtLink :to="`/brand/campaigns/${campaign.id}`" class="text-blue-600 hover:text-blue-500 font-medium flex items-center mb-2">
            ← Back to Campaign
          </NuxtLink>
          <h1 class="text-2xl font-bold text-gray-900">Edit Campaign</h1>
          <p class="text-gray-600">Update your campaign details</p>
        </div>
        <div class="flex space-x-4">
          <button 
            @click="resetForm" 
            class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Reset
          </button>
          <button 
            @click="updateCampaign" 
            :disabled="isSubmitting || !isFormValid"
            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {{ isSubmitting ? 'Updating...' : 'Update Campaign' }}
          </button>
        </div>
      </div>

      <!-- Validation Summary -->
      <div v-if="showValidationErrors && !isFormValid" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 class="text-red-800 font-semibold mb-2">Please fix the following errors:</h3>
        <ul class="list-disc list-inside text-red-700 space-y-1">
          <li v-for="error in validationErrors" :key="error">{{ error }}</li>
        </ul>
      </div>
    </div>

    <!-- Edit Form (Reusing our campaign creation form structure) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Form -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Basic Information -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Campaign Name *
                <span v-if="errors.name" class="text-red-500 text-xs ml-1">({{ errors.name }})</span>
              </label>
              <input 
                v-model="form.name" 
                @blur="validateField('name')"
                type="text" 
                :class="inputClasses('name')"
                placeholder="e.g., Summer Collection 2024"
              >
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Type *
                  <span v-if="errors.type" class="text-red-500 text-xs ml-1">({{ errors.type }})</span>
                </label>
                <select 
                  v-model="form.type" 
                  @blur="validateField('type')"
                  :class="inputClasses('type')"
                >
                  <option value="">Select Type</option>
                  <option v-for="campaignType in campaignTypes" :key="campaignType.value" :value="campaignType.value">
                    {{ campaignType.icon }} {{ campaignType.label }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Budget ($) *
                  <span v-if="errors.budget" class="text-red-500 text-xs ml-1">({{ errors.budget }})</span>
                </label>
                <input 
                  v-model.number="form.budget" 
                  @blur="validateField('budget')"
                  type="number" 
                  :class="inputClasses('budget')"
                  placeholder="e.g., 5000"
                  min="0"
                >
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Campaign Description *
                <span v-if="errors.description" class="text-red-500 text-xs ml-1">({{ errors.description }})</span>
              </label>
              <textarea 
                v-model="form.description" 
                @blur="validateField('description')"
                rows="4" 
                :class="inputClasses('description')"
                placeholder="Describe your campaign goals, target audience, and requirements..."
              ></textarea>
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>Minimum 100 characters</span>
                <span :class="form.description.length < 100 ? 'text-red-500' : 'text-green-500'">
                  {{ form.description.length }}/100
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Campaign Details -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Campaign Details</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
                <span v-if="errors.startDate" class="text-red-500 text-xs ml-1">({{ errors.startDate }})</span>
              </label>
              <input 
                v-model="form.startDate" 
                @blur="validateField('startDate')"
                type="date" 
                :class="inputClasses('startDate')"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                End Date *
                <span v-if="errors.endDate" class="text-red-500 text-xs ml-1">({{ errors.endDate }})</span>
              </label>
              <input 
                v-model="form.endDate" 
                @blur="validateField('endDate')"
                type="date" 
                :class="inputClasses('endDate')"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Target Influencers *
                <span v-if="errors.targetInfluencers" class="text-red-500 text-xs ml-1">({{ errors.targetInfluencers }})</span>
              </label>
              <input 
                v-model.number="form.targetInfluencers" 
                @blur="validateField('targetInfluencers')"
                type="number" 
                :class="inputClasses('targetInfluencers')"
                placeholder="e.g., 10"
                min="1"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select 
                v-model="form.status" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option v-for="status in campaignStatuses" :key="status.value" :value="status.value">
                  {{ status.label }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Campaign Summary -->
        <div class="bg-white rounded-lg shadow-sm p-6 sticky top-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Campaign Summary</h2>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">Status:</span>
              <span class="font-medium">{{ form.status }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Type:</span>
              <span class="font-medium">{{ getCampaignTypeLabel(form.type) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Budget:</span>
              <span class="font-medium">${{ form.budget || 0 }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Duration:</span>
              <span class="font-medium">{{ calculateDuration() }} days</span>
            </div>
          </div>

          <!-- Validation Status -->
          <div class="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 class="font-medium text-gray-900 mb-2">Validation Status</h3>
            <div class="space-y-2">
              <div v-for="field in validationFields" :key="field.name" class="flex items-center justify-between">
                <span class="text-sm text-gray-600">{{ field.label }}</span>
                <span :class="field.valid ? 'text-green-500' : 'text-red-500'">
                  {{ field.valid ? '✓' : '✗' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Danger Zone -->
        <div class="bg-red-50 rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-red-900 mb-4">⚠️ Danger Zone</h2>
          <p class="text-sm text-red-700 mb-4">These actions are irreversible. Please be cautious.</p>
          <button 
            @click="deleteCampaign"
            class="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete Campaign
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div v-else class="flex items-center justify-center min-h-96">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading campaign...</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'brand'
})

// Get route parameters
const route = useRoute()
const campaignId = route.params.id

// Composables
const { 
  getCampaign, 
  updateCampaign: updateCampaignAction,
  deleteCampaign: deleteCampaignAction,
  campaignTypes,
  campaignStatuses
} = useCampaigns()
const { rules, validateField: validateFieldUtil, validateForm } = useValidation()

// State
const campaign = ref(null)
const isSubmitting = ref(false)
const errors = ref({})
const showValidationErrors = ref(false)

// Form state
const form = ref({
  name: '',
  type: '',
  description: '',
  budget: null,
  startDate: '',
  endDate: '',
  targetInfluencers: null,
  status: 'draft'
})

// Validation schema
const validationSchema = {
  name: [rules.required, rules.minLength(3)],
  type: [rules.required],
  description: [rules.required, rules.minLength(100)],
  budget: [rules.required, rules.number, rules.minValue(100)],
  startDate: [rules.required],
  endDate: [rules.required],
  targetInfluencers: [rules.required, rules.number, rules.minValue(1)]
}

// Computed properties
const isFormValid = computed(() => {
  const { isValid } = validateForm(form.value, validationSchema)
  return isValid
})

const validationErrors = computed(() => {
  return Object.values(errors.value).filter(error => error)
})

const validationFields = computed(() => [
  { name: 'name', label: 'Campaign Name', valid: !errors.value.name && form.value.name },
  { name: 'type', label: 'Campaign Type', valid: !errors.value.type && form.value.type },
  { name: 'description', label: 'Description', valid: !errors.value.description && form.value.description?.length >= 100 },
  { name: 'budget', label: 'Budget', valid: !errors.value.budget && form.value.budget >= 100 },
  { name: 'dates', label: 'Dates', valid: !errors.value.startDate && !errors.value.endDate && form.value.startDate && form.value.endDate }
])

// Helper methods
const inputClasses = (fieldName) => {
  const baseClasses = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
  return errors.value[fieldName] 
    ? `${baseClasses} border-red-300 bg-red-50` 
    : `${baseClasses} border-gray-300`
}

const getCampaignTypeLabel = (type) => {
  const campaignType = campaignTypes.find(t => t.value === type)
  return campaignType ? campaignType.label : 'Not selected'
}

const calculateDuration = () => {
  if (!form.value.startDate || !form.value.endDate) return 0
  const start = new Date(form.value.startDate)
  const end = new Date(form.value.endDate)
  const diffTime = Math.abs(end - start)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// Validation
const validateField = (fieldName) => {
  const rule = validationSchema[fieldName]
  if (rule) {
    errors.value[fieldName] = validateFieldUtil(form.value[fieldName], rule)
  }
}

const validateAll = () => {
  const { errors: newErrors } = validateForm(form.value, validationSchema)
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

// Actions
const resetForm = () => {
  if (campaign.value) {
    Object.keys(form.value).forEach(key => {
      form.value[key] = campaign.value[key]
    })
  }
  errors.value = {}
  showValidationErrors.value = false
}

const updateCampaign = async () => {
  showValidationErrors.value = true
  
  if (!validateAll()) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  
  isSubmitting.value = true
  
  try {
    const updated = updateCampaignAction(campaign.value.id, form.value)
    
    if (updated) {
      alert('Campaign updated successfully!')
      navigateTo(`/brand/campaigns/${campaign.value.id}`)
    }
  } catch (error) {
    console.error('Error updating campaign:', error)
    alert('Failed to update campaign. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

const deleteCampaign = () => {
  if (confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
    const deleted = deleteCampaignAction(campaign.value.id)
    if (deleted) {
      alert('Campaign deleted successfully!')
      navigateTo('/brand/campaigns')
    }
  }
}

// Fetch campaign data
onMounted(() => {
  setTimeout(() => {
    const foundCampaign = getCampaign(campaignId)
    if (foundCampaign) {
      campaign.value = foundCampaign
      // Initialize form with campaign data
      Object.keys(form.value).forEach(key => {
        if (foundCampaign[key] !== undefined) {
          form.value[key] = foundCampaign[key]
        }
      })
    } else {
      navigateTo('/brand/campaigns')
    }
  }, 1000)
})
</script>
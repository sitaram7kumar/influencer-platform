<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex justify-between items-center">
        <div>
          <NuxtLink to="/brand/campaigns" class="text-blue-600 hover:text-blue-500 font-medium flex items-center mb-2">
            ← Back to Campaigns
          </NuxtLink>
          <h1 class="text-2xl font-bold text-gray-900">Create New Campaign</h1>
          <p class="text-gray-600">Set up your influencer marketing campaign</p>
        </div>
        <div class="flex space-x-4">
          <button 
            @click="saveAsDraft" 
            :disabled="isSubmitting"
            class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            Save as Draft
          </button>
          <button 
            @click="publishCampaign" 
            :disabled="isSubmitting || !isFormValid"
            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {{ isSubmitting ? 'Creating...' : 'Create Campaign' }}
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
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Content Requirements
              </label>
              <select 
                v-model="form.contentRequirements" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="flexible">Flexible - Influencer's Creative Freedom</option>
                <option value="moderate">Moderate - Some Guidelines</option>
                <option value="strict">Strict - Specific Requirements</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Target Audience -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Target Audience</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Target Gender</label>
              <select 
                v-model="form.targetGender" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="any">Any Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Target Age Range</label>
              <select 
                v-model="form.targetAge" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="any">Any Age</option>
                <option value="13-17">13-17</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45+">45+</option>
              </select>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Target Locations (comma separated)</label>
              <input 
                v-model="form.targetLocations" 
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., USA, UK, Canada, Australia"
              >
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
              <span class="font-medium">{{ form.status === 'draft' ? 'Draft' : 'Active' }}</span>
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
            <div class="flex justify-between">
              <span class="text-gray-600">Target Influencers:</span>
              <span class="font-medium">{{ form.targetInfluencers || 0 }}</span>
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
            <div class="mt-3 pt-3 border-t border-gray-200">
              <div class="flex justify-between text-sm">
                <span class="font-medium">Overall:</span>
                <span :class="isFormValid ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'">
                  {{ isFormValid ? 'Ready to Publish' : 'Needs Attention' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Tips & Guidelines -->
        <div class="bg-blue-50 rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">💡 Campaign Tips</h2>
          <ul class="space-y-2 text-sm text-gray-700">
            <li>• Be specific about your campaign goals</li>
            <li>• Set a realistic budget for your target influencers</li>
            <li>• Provide clear content requirements</li>
            <li>• Consider your target audience demographics</li>
            <li>• Set achievable timelines</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'brand',
  middleware: 'auth-new', 
  requiredUserType: 'brand'
})

const { user } = useAuth()

// Composables
const { campaignTypes, createCampaign } = useCampaigns()
const { rules, validateField: validateFieldUtil, validateForm } = useValidation()

// Form state
const form = ref({
  name: '',
  type: '',
  description: '',
  budget: null,
  startDate: '',
  endDate: '',
  targetInfluencers: null,
  contentRequirements: 'flexible',
  targetGender: 'any',
  targetAge: 'any',
  targetLocations: '',
  status: 'draft'
})

const isSubmitting = ref(false)
const errors = ref({})
const showValidationErrors = ref(false)

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
  { name: 'dates', label: 'Dates', valid: !errors.value.startDate && !errors.value.endDate && form.value.startDate && form.value.endDate },
  { name: 'influencers', label: 'Target Influencers', valid: !errors.value.targetInfluencers && form.value.targetInfluencers >= 1 }
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
const saveAsDraft = async () => {
  form.value.status = 'draft'
  await submitCampaign()
}

const publishCampaign = async () => {
  form.value.status = 'active'
  showValidationErrors.value = true
  
  if (!validateAll()) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  
  await submitCampaign()
}

const submitCampaign = async () => {
  isSubmitting.value = true
  
  try {
    // Create campaign using our composable
    const newCampaign = createCampaign({
      ...form.value,
      influencers: 0 // Start with 0 influencers
    })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Success
    alert(`Campaign "${newCampaign.name}" created successfully!`)
    navigateTo('/brand/campaigns')
    
  } catch (error) {
    console.error('Error creating campaign:', error)
    alert('Failed to create campaign. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>
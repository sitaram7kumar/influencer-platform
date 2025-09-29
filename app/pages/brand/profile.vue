<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Brand Profile</h1>
          <p class="text-gray-600">Manage your company information and settings</p>
        </div>
        <button 
          @click="saveProfile" 
          :disabled="isSaving || !isFormValid"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isSaving ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>
      
      <!-- Validation Summary -->
      <div v-if="showValidationErrors" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 class="text-red-800 font-semibold mb-2">Please fix the following errors:</h3>
        <ul class="list-disc list-inside text-red-700 space-y-1">
          <li v-for="error in validationErrors" :key="error">{{ error }}</li>
        </ul>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column - Brand Logo & Basic Info -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Brand Logo -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Brand Logo</h2>
          <div class="flex flex-col items-center space-y-4">
            <div class="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
              <img 
                v-if="profile.logo" 
                :src="profile.logo" 
                alt="Brand Logo" 
                class="w-full h-full object-cover"
              >
              <span v-else class="text-4xl text-gray-400">🏢</span>
            </div>
            <div class="space-y-2 w-full">
              <input 
                type="file" 
                ref="fileInput"
                @change="handleLogoUpload" 
                accept="image/*" 
                class="hidden"
              >
              <button 
                @click="$refs.fileInput.click()"
                class="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Upload Logo
              </button>
              <button 
                v-if="profile.logo"
                @click="removeLogo"
                class="w-full bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
              >
                Remove Logo
              </button>
            </div>
            <p class="text-xs text-gray-500 text-center">Recommended: 500x500px, PNG or JPG, max 2MB</p>
          </div>
        </div>

        <!-- Validation Status -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Profile Status</h2>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Profile Completion</span>
              <span :class="['font-semibold', completionPercentage >= 80 ? 'text-green-600' : completionPercentage >= 50 ? 'text-yellow-600' : 'text-red-600']">
                {{ completionPercentage }}%
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="h-2 rounded-full transition-all duration-300"
                :class="completionPercentage >= 80 ? 'bg-green-500' : completionPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'"
                :style="{ width: `${completionPercentage}%` }"
              ></div>
            </div>
            <div class="text-sm text-gray-600">
              <div v-if="completionPercentage < 100" class="space-y-1">
                <p class="font-medium">To complete:</p>
                <ul class="list-disc list-inside space-y-1">
                  <li v-if="!profile.companyName">Company name</li>
                  <li v-if="!profile.industry">Industry</li>
                  <li v-if="!profile.description">Company description</li>
                  <li v-if="!profile.contactPerson">Contact person</li>
                  <li v-if="!profile.contactEmail">Contact email</li>
                </ul>
              </div>
              <p v-else class="text-green-600 font-medium">🎉 Profile complete!</p>
            </div>
          </div>
        </div>

        <!-- Company Stats -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Company Stats</h2>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Total Campaigns</span>
              <span class="font-semibold">24</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Active Campaigns</span>
              <span class="font-semibold text-green-600">12</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Total Spent</span>
              <span class="font-semibold">$45,200</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Collaborations</span>
              <span class="font-semibold">156</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Form Sections -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Basic Information -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
                <span v-if="errors.companyName" class="text-red-500 text-xs ml-1">({{ errors.companyName }})</span>
              </label>
              <input 
                v-model="profile.companyName" 
                @blur="validateField('companyName')"
                type="text" 
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
                  errors.companyName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                ]"
                placeholder="Enter company name"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Industry *
                <span v-if="errors.industry" class="text-red-500 text-xs ml-1">({{ errors.industry }})</span>
              </label>
              <select 
                v-model="profile.industry" 
                @blur="validateField('industry')"
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
                  errors.industry ? 'border-red-300 bg-red-50' : 'border-gray-300'
                ]"
              >
                <option value="">Select Industry</option>
                <option value="fashion">Fashion & Apparel</option>
                <option value="beauty">Beauty & Cosmetics</option>
                <option value="tech">Technology</option>
                <option value="food">Food & Beverage</option>
                <option value="fitness">Fitness & Wellness</option>
                <option value="travel">Travel & Tourism</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Website
                <span v-if="errors.website" class="text-red-500 text-xs ml-1">({{ errors.website }})</span>
              </label>
              <input 
                v-model="profile.website" 
                @blur="validateField('website')"
                type="url" 
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
                  errors.website ? 'border-red-300 bg-red-50' : 'border-gray-300'
                ]"
                placeholder="https://example.com"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
              <select 
                v-model="profile.companySize" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Company Description *
                <span v-if="errors.description" class="text-red-500 text-xs ml-1">({{ errors.description }})</span>
              </label>
              <textarea 
                v-model="profile.description" 
                @blur="validateField('description')"
                rows="4" 
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
                  errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                ]"
                placeholder="Describe your company and what you do..."
              ></textarea>
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>Minimum 50 characters</span>
                <span :class="profile.description.length < 50 ? 'text-red-500' : 'text-green-500'">
                  {{ profile.description.length }}/50
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Contact Person *
                <span v-if="errors.contactPerson" class="text-red-500 text-xs ml-1">({{ errors.contactPerson }})</span>
              </label>
              <input 
                v-model="profile.contactPerson" 
                @blur="validateField('contactPerson')"
                type="text" 
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
                  errors.contactPerson ? 'border-red-300 bg-red-50' : 'border-gray-300'
                ]"
                placeholder="Full name"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Contact Email *
                <span v-if="errors.contactEmail" class="text-red-500 text-xs ml-1">({{ errors.contactEmail }})</span>
              </label>
              <input 
                v-model="profile.contactEmail" 
                @blur="validateField('contactEmail')"
                type="email" 
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
                  errors.contactEmail ? 'border-red-300 bg-red-50' : 'border-gray-300'
                ]"
                placeholder="email@company.com"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
                <span v-if="errors.phone" class="text-red-500 text-xs ml-1">({{ errors.phone }})</span>
              </label>
              <input 
                v-model="profile.phone" 
                @blur="validateField('phone')"
                type="tel" 
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
                  errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                ]"
                placeholder="+1 (555) 123-4567"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input 
                v-model="profile.location" 
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="City, Country"
              >
            </div>
          </div>
        </div>

        <!-- Social Media Links -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Social Media Links</h2>
          <div class="space-y-4">
            <div v-for="(social, index) in profile.socialLinks" :key="index" class="flex items-center space-x-4">
              <div class="w-32">
                <select 
                  v-model="social.platform" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="youtube">YouTube</option>
                  <option value="tiktok">TikTok</option>
                </select>
              </div>
              <input 
                v-model="social.url" 
                type="url" 
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :placeholder="`Enter ${social.platform} URL`"
              >
              <button 
                @click="removeSocialLink(index)" 
                class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                :disabled="profile.socialLinks.length === 1"
                :class="profile.socialLinks.length === 1 ? 'opacity-50 cursor-not-allowed' : ''"
              >
                🗑️
              </button>
            </div>
            <button 
              @click="addSocialLink" 
              class="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <span>+</span>
              <span>Add Social Media Link</span>
            </button>
          </div>
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

// Reactive profile data
const profile = ref({
  companyName: 'Nike Inc.',
  industry: 'fashion',
  website: 'https://nike.com',
  companySize: '1000+',
  description: 'Just do it. Nike is a global leader in athletic footwear, apparel, equipment, and accessories.',
  contactPerson: 'John Smith',
  contactEmail: 'john.smith@nike.com',
  phone: '+1 (555) 123-4567',
  location: 'Beaverton, Oregon, USA',
  logo: null,
  socialLinks: [
    { platform: 'instagram', url: 'https://instagram.com/nike' },
    { platform: 'twitter', url: 'https://twitter.com/nike' }
  ]
})

const isSaving = ref(false)
const fileInput = ref(null)
const errors = ref({})
const showValidationErrors = ref(false)

// Computed properties
const completionPercentage = computed(() => {
  const requiredFields = [
    profile.value.companyName,
    profile.value.industry,
    profile.value.description,
    profile.value.contactPerson,
    profile.value.contactEmail
  ]
  
  const completed = requiredFields.filter(field => field && field.length > 0).length
  return Math.round((completed / requiredFields.length) * 100)
})

const isFormValid = computed(() => {
  return Object.keys(errors.value).length === 0 && 
         profile.value.companyName && 
         profile.value.industry &&
         profile.value.description &&
         profile.value.contactPerson &&
         profile.value.contactEmail &&
         profile.value.description.length >= 50
})

const validationErrors = computed(() => {
  const errorMessages = []
  
  if (!profile.value.companyName) errorMessages.push('Company name is required')
  if (!profile.value.industry) errorMessages.push('Industry is required')
  if (!profile.value.description) errorMessages.push('Company description is required')
  if (profile.value.description && profile.value.description.length < 50) errorMessages.push('Company description must be at least 50 characters')
  if (!profile.value.contactPerson) errorMessages.push('Contact person is required')
  if (!profile.value.contactEmail) errorMessages.push('Contact email is required')
  if (errors.value.contactEmail) errorMessages.push('Contact email must be valid')
  if (errors.value.website) errorMessages.push('Website must be a valid URL')
  
  return errorMessages
})

// Validation rules
const validationRules = {
  companyName: (value) => !value ? 'Required' : value.length < 2 ? 'Too short' : null,
  industry: (value) => !value ? 'Required' : null,
  description: (value) => !value ? 'Required' : value.length < 50 ? 'Minimum 50 characters' : null,
  contactPerson: (value) => !value ? 'Required' : value.length < 2 ? 'Too short' : null,
  contactEmail: (value) => {
    if (!value) return 'Required'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return !emailRegex.test(value) ? 'Invalid email' : null
  },
  website: (value) => {
    if (!value) return null
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
    return !urlRegex.test(value) ? 'Invalid URL' : null
  },
  phone: (value) => {
    if (!value) return null
    const phoneRegex = /^\+?[\d\s-()]{10,}$/
    return !phoneRegex.test(value) ? 'Invalid phone number' : null
  }
}

// Methods
const validateField = (fieldName) => {
  const value = profile.value[fieldName]
  const rule = validationRules[fieldName]
  
  if (rule) {
    errors.value[fieldName] = rule(value)
  } else {
    delete errors.value[fieldName]
  }
}

const validateAll = () => {
  Object.keys(validationRules).forEach(fieldName => {
    validateField(fieldName)
  })
  return Object.keys(errors.value).length === 0
}

const handleLogoUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Check file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size must be less than 2MB')
      return
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      profile.value.logo = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const removeLogo = () => {
  profile.value.logo = null
}

const addSocialLink = () => {
  profile.value.socialLinks.push({ platform: 'instagram', url: '' })
}

const removeSocialLink = (index) => {
  if (profile.value.socialLinks.length > 1) {
    profile.value.socialLinks.splice(index, 1)
  }
}

const saveProfile = async () => {
  showValidationErrors.value = true
  validateAll()
  
  if (!isFormValid.value) {
    // Scroll to top to show validation errors
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  
  isSaving.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('Profile saved:', profile.value)
  isSaving.value = false
  showValidationErrors.value = false
  
  // Show success message
  alert('Profile updated successfully!')
}
</script>
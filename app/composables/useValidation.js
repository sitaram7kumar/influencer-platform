// Reusable validation composable
export const useValidation = () => {
  // Validation rules
  const rules = {
    required: (value) => !value ? 'This field is required' : null,
    email: (value) => {
      if (!value) return null
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return !emailRegex.test(value) ? 'Please enter a valid email' : null
    },
    url: (value) => {
      if (!value) return null
      const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
      return !urlRegex.test(value) ? 'Please enter a valid URL' : null
    },
    minLength: (min) => (value) => {
      if (!value) return null
      return value.length < min ? `Minimum ${min} characters required` : null
    },
    maxLength: (max) => (value) => {
      if (!value) return null
      return value.length > max ? `Maximum ${max} characters allowed` : null
    },
    number: (value) => {
      if (!value) return null
      return isNaN(value) ? 'Please enter a valid number' : null
    },
    minValue: (min) => (value) => {
      if (!value) return null
      return parseFloat(value) < min ? `Value must be at least ${min}` : null
    },
    maxValue: (max) => (value) => {
      if (!value) return null
      return parseFloat(value) > max ? `Value must be less than ${max}` : null
    }
  }

  // Validate a field against multiple rules
  const validateField = (value, fieldRules) => {
    for (const rule of fieldRules) {
      const error = rule(value)
      if (error) return error
    }
    return null
  }

  // Validate entire form
  const validateForm = (formData, validationSchema) => {
    const errors = {}
    let isValid = true

    Object.keys(validationSchema).forEach(field => {
      const value = formData[field]
      const fieldRules = validationSchema[field]
      const error = validateField(value, fieldRules)
      
      if (error) {
        errors[field] = error
        isValid = false
      }
    })

    return { isValid, errors }
  }

  return {
    rules,
    validateField,
    validateForm
  }
}
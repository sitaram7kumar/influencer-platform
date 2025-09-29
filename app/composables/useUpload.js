// Composable for file uploads
export const useUpload = () => {
  const uploadFile = async (file, options = {}) => {
    const {
      maxSize = 5 * 1024 * 1024, // 5MB default
      allowedTypes = ['image/jpeg', 'image/png', 'image/gif'],
      onProgress = null
    } = options

    // Validate file size
    if (file.size > maxSize) {
      throw new Error(`File size must be less than ${maxSize / 1024 / 1024}MB`)
    }

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      throw new Error(`File type not allowed. Allowed types: ${allowedTypes.join(', ')}`)
    }

    // Create form data
    const formData = new FormData()
    formData.append('file', file)

    try {
      // Simulate upload (replace with actual API call)
      if (onProgress) {
        // Simulate progress
        for (let progress = 0; progress <= 100; progress += 10) {
          setTimeout(() => onProgress(progress), progress * 20)
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Return mock response (replace with actual API response)
      return {
        success: true,
        url: URL.createObjectURL(file),
        filename: file.name,
        size: file.size,
        type: file.type
      }
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    }
  }

  const uploadMultiple = async (files, options = {}) => {
    const uploads = files.map(file => uploadFile(file, options))
    return Promise.all(uploads)
  }

  const validateImage = (file, options = {}) => {
    const {
      maxWidth = 5000,
      maxHeight = 5000,
      minWidth = 100,
      minHeight = 100
    } = options

    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        if (img.width < minWidth || img.height < minHeight) {
          reject(new Error(`Image must be at least ${minWidth}x${minHeight} pixels`))
        } else if (img.width > maxWidth || img.height > maxHeight) {
          reject(new Error(`Image must be less than ${maxWidth}x${maxHeight} pixels`))
        } else {
          resolve(true)
        }
      }
      img.onerror = () => reject(new Error('Invalid image file'))
      img.src = URL.createObjectURL(file)
    })
  }

  return {
    uploadFile,
    uploadMultiple,
    validateImage
  }
}
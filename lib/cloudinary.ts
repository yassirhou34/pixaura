/**
 * Cloudinary Configuration and Utilities
 * 
 * This file provides utilities to generate optimized Cloudinary URLs
 * for images and videos with automatic optimization.
 */

// Cloudinary configuration
export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ''
export const CLOUDINARY_FOLDER = 'pixaura' // Folder name in Cloudinary

/**
 * Generate optimized Cloudinary URL for images
 * @param publicId - The public ID of the image in Cloudinary (without folder prefix)
 * @param options - Transformation options
 */
export function getCloudinaryImageUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: number | 'auto'
    format?: 'auto' | 'webp' | 'jpg' | 'png'
    crop?: 'fill' | 'fit' | 'scale' | 'thumb'
    gravity?: 'auto' | 'face' | 'center'
  } = {}
): string {
  if (!CLOUDINARY_CLOUD_NAME) {
    console.warn('Cloudinary cloud name not configured. Using fallback.')
    return `/Banque d_images/${publicId}`
  }

  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
  } = options

  // Build transformation string
  const transformations: string[] = []

  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  if (crop) transformations.push(`c_${crop}`)
  if (gravity && crop === 'fill') transformations.push(`g_${gravity}`)
  if (quality) transformations.push(`q_${quality}`)
  if (format) transformations.push(`f_${format}`)

  // Add automatic optimization flags
  transformations.push('fl_auto_quality') // Auto quality
  transformations.push('fl_progressive') // Progressive JPEG
  transformations.push('fl_immutable_cache') // Cache optimization

  const transformationString = transformations.join(',')
  const folderPath = `${CLOUDINARY_FOLDER}/${publicId}`

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformationString}/${folderPath}`
}

/**
 * Generate optimized Cloudinary URL for videos
 * @param publicId - The public ID of the video in Cloudinary (without folder prefix)
 * @param options - Transformation options
 */
export function getCloudinaryVideoUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: number | 'auto'
    format?: 'auto' | 'mp4' | 'webm'
    bitRate?: number | 'auto'
    streaming?: boolean
  } = {}
): string {
  if (!CLOUDINARY_CLOUD_NAME) {
    console.warn('Cloudinary cloud name not configured. Using fallback.')
    return `/Banque d_images/${publicId}`
  }

  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    bitRate = 'auto',
    streaming = false,
  } = options

  // Build transformation string
  const transformations: string[] = []

  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  if (quality) transformations.push(`q_${quality}`)
  if (bitRate && bitRate !== 'auto') transformations.push(`br_${bitRate}`)
  if (format) transformations.push(`f_${format}`)

  // Add video optimization flags
  transformations.push('fl_immutable_cache') // Cache optimization
  if (streaming) {
    transformations.push('sp_auto') // Streaming profile
  }

  const transformationString = transformations.join(',')
  const folderPath = `${CLOUDINARY_FOLDER}/${publicId}`
  const resourceType = streaming ? 'video' : 'video/upload'

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/${resourceType}/${transformationString}/${folderPath}`
}

/**
 * Get optimized image URL for Next.js Image component
 * Automatically selects best format and size based on device
 */
export function getOptimizedImageUrl(publicId: string, width?: number, height?: number): string {
  return getCloudinaryImageUrl(publicId, {
    width,
    height,
    quality: 'auto',
    format: 'auto',
    crop: width && height ? 'fill' : 'fit',
    gravity: 'auto',
  })
}

/**
 * Get optimized video URL with automatic quality
 * Best for background videos and carousels
 */
export function getOptimizedVideoUrl(publicId: string, width?: number, height?: number): string {
  return getCloudinaryVideoUrl(publicId, {
    width,
    height,
    quality: 'auto',
    format: 'auto',
    bitRate: 'auto',
    streaming: false,
  })
}

/**
 * Get streaming video URL (HLS/DASH) for better performance
 * Use this for large videos that need adaptive bitrate
 */
export function getStreamingVideoUrl(publicId: string): string {
  return getCloudinaryVideoUrl(publicId, {
    quality: 'auto',
    format: 'auto',
    streaming: true,
  })
}

/**
 * Helper to extract public ID from local path
 * Example: "/Banque d_images/video.mp4" -> "video"
 */
export function extractPublicId(localPath: string): string {
  // Remove leading slash and folder name
  const parts = localPath.split('/')
  const filename = parts[parts.length - 1]
  // Remove extension
  return filename.replace(/\.[^/.]+$/, '')
}

/**
 * Map of local paths to Cloudinary public IDs
 * This allows gradual migration - you can keep local paths and they'll be converted
 */
export const ASSET_MAP: Record<string, string> = {
  // Videos
  '/Banque d_images/rally1.mp4': 'rally1',
  '/Banque d_images/Immobilier.mp4': 'immobilier',
  '/Banque d_images/halowen.mp4': 'halowen',
  '/Banque d_images/pod1.mp4': 'pod1',
  '/Banque d_images/rally2.mp4': 'rally2',
  '/Banque d_images/stageMMa.mp4': 'stage-mma',
  '/Banque d_images/noir.mp4': 'noir',
  '/Banque d_images/background-web-desktop.mp4': 'background-web-desktop', // Alias for realisations page
  '/Banque d_images/Backv2.mp4': 'backv2',
  '/Banque d_images/Copie de BACKGROUND WEB DESKTOP.mp4': 'background-web-desktop',
  
  // Images
  '/Banque d_images/Copie de M7_03225.jpg': 'm7-03225',
  '/Banque d_images/StageUfc.jpg': 'stage-ufc',
  '/Banque d_images/Copie de M7_01248.jpg': 'm7-01248',
  '/Banque d_images/ippppp1.png': 'background-placeholder',
  '/Banque d_images/backnoiree.png': 'back-noiree',
  '/Banque d_images/PIXaura-soft white.png': 'pixaura-logo',
  '/Banque d_images/humind-white.png': 'humind-logo',
  '/Banque d_images/Copie de IMG_7149.jpg': 'img-7149',
  '/Banque d_images/art1.jpg': 'art1',
  '/Banque d_images/Copie de M7_00487.jpg': 'm7-00487',
  '/Banque d_images/Copie de M7_02930.jpg': 'm7-02930',
  '/Banque d_images/Copie de M7_09197.jpg': 'm7-09197',
  // Add more mappings as needed
}

/**
 * Get Cloudinary URL from local path
 * Automatically converts local paths to Cloudinary URLs if mapped
 */
export function getAssetUrl(localPath: string, type: 'image' | 'video' = 'image'): string {
  const publicId = ASSET_MAP[localPath] || extractPublicId(localPath)
  
  if (!CLOUDINARY_CLOUD_NAME) {
    // Fallback to local path if Cloudinary not configured
    return localPath
  }

  if (type === 'video') {
    return getOptimizedVideoUrl(publicId)
  } else {
    return getOptimizedImageUrl(publicId)
  }
}


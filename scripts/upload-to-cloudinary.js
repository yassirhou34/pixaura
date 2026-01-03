/**
 * Script to upload all assets from public/Banque d_images to Cloudinary
 * 
 * Usage:
 * 1. Set environment variables:
 *    CLOUDINARY_CLOUD_NAME=your_cloud_name
 *    CLOUDINARY_API_KEY=your_api_key
 *    CLOUDINARY_API_SECRET=your_api_secret
 * 
 * 2. Run: node scripts/upload-to-cloudinary.js
 */

const cloudinary = require('cloudinary').v2
const fs = require('fs')
const path = require('path')

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const ASSETS_FOLDER = path.join(__dirname, '../public/Banque d_images')
const CLOUDINARY_FOLDER = 'pixaura'

// Mapping of filenames to cleaner public IDs
const PUBLIC_ID_MAP = {
  // Videos
  'rally1.mp4': 'rally1',
  'Immobilier.mp4': 'immobilier',
  'halowen.mp4': 'halowen',
  'pod1.mp4': 'pod1',
  'rally2.mp4': 'rally2',
  'stageMMa.mp4': 'stage-mma',
  'noir.mp4': 'noir',
  'Backv2.mp4': 'backv2',
  'back3.mp4': 'back3',
  'Copie de BACKGROUND WEB DESKTOP.mp4': 'background-web-desktop',
  'i3.mp4': 'i3',
  
  // Images
  'Copie de M7_03225.jpg': 'm7-03225',
  'StageUfc.jpg': 'stage-ufc',
  'Copie de M7_01248.jpg': 'm7-01248',
  'ippppp1.png': 'background-placeholder',
  'backnoiree.png': 'back-noiree',
  'PIXaura-soft white.png': 'pixaura-logo',
  'humind-white.png': 'humind-logo',
  'Copie de IMG_7149.jpg': 'img-7149',
  'art1.jpg': 'art1',
  'art2.jpg': 'art2',
  'art3.jpg': 'art3',
  'art5.jpg': 'art5',
  'art6.jpg': 'art6',
  'Copie de M7_00487.jpg': 'm7-00487',
  'Copie de M7_02930.jpg': 'm7-02930',
  'Copie de M7_09197.jpg': 'm7-09197',
  'Copie de DSC04614.jpg': 'dsc04614',
  'Copie de DSC04678.jpg': 'dsc04678',
  'Copie de DSC04758.jpg': 'dsc04758',
  'Copie de DSC04796.jpg': 'dsc04796',
  'Copie de DSC07052 - Copie.jpg': 'dsc07052',
  'Copie de LDP_5161.jpg': 'ldp-5161',
  'Copie de LDP_5182.jpg': 'ldp-5182',
  'Copie de M7_00197.jpg': 'm7-00197',
  'Copie de M7_00259.jpg': 'm7-00259',
  'Copie de M7_00487.jpg': 'm7-00487',
  'Copie de M7_02930.jpg': 'm7-02930',
  'Copie de M7_03008.jpg': 'm7-03008',
  'Copie de M7_03194.jpg': 'm7-03194',
  'Copie de M7_03372.jpg': 'm7-03372',
  'Copie de M7_03385.jpg': 'm7-03385',
  'Copie de M7_09214.jpg': 'm7-09214',
  'Copie de M7_09236.jpg': 'm7-09236',
}

async function uploadFile(filePath, publicId) {
  const fileExtension = path.extname(filePath).toLowerCase()
  const isVideo = ['.mp4', '.webm', '.mov'].includes(fileExtension)
  const isImage = ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(fileExtension)
  
  if (!isVideo && !isImage) {
    console.log(`⏭️  Skipping ${path.basename(filePath)} (not an image or video)`)
    return null
  }

  try {
    const options = {
      folder: CLOUDINARY_FOLDER,
      public_id: publicId,
      overwrite: false, // Set to true if you want to overwrite existing files
      resource_type: isVideo ? 'video' : 'image',
    }

    // Add optimization options for images
    if (isImage) {
      options.quality = 'auto'
      options.fetch_format = 'auto'
    }

    // Add optimization options for videos
    if (isVideo) {
      options.quality = 'auto'
      // Don't set codec to auto for MP4 files - let Cloudinary handle it
      options.eager_async = true // Process large videos asynchronously
      options.eager = [
        { quality: 'auto', format: 'mp4' },
        { quality: 'auto', format: 'webm' }
      ]
    }

    console.log(`📤 Uploading ${path.basename(filePath)} as ${publicId}...`)
    
    const result = await cloudinary.uploader.upload(filePath, options)
    
    console.log(`✅ Uploaded: ${result.secure_url}`)
    return result
  } catch (error) {
    if (error.http_code === 409) {
      console.log(`⚠️  Already exists: ${publicId}`)
    } else {
      console.error(`❌ Error uploading ${path.basename(filePath)}:`, error.message)
    }
    return null
  }
}

async function uploadAllAssets() {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('❌ Error: Cloudinary credentials not set!')
    console.log('\nPlease set the following environment variables:')
    console.log('  CLOUDINARY_CLOUD_NAME=your_cloud_name')
    console.log('  CLOUDINARY_API_KEY=your_api_key')
    console.log('  CLOUDINARY_API_SECRET=your_api_secret')
    process.exit(1)
  }

  console.log('🚀 Starting Cloudinary upload...\n')
  console.log(`📁 Source folder: ${ASSETS_FOLDER}`)
  console.log(`☁️  Cloudinary folder: ${CLOUDINARY_FOLDER}\n`)

  if (!fs.existsSync(ASSETS_FOLDER)) {
    console.error(`❌ Error: Folder ${ASSETS_FOLDER} does not exist!`)
    process.exit(1)
  }

  const files = fs.readdirSync(ASSETS_FOLDER)
  const results = {
    uploaded: [],
    skipped: [],
    errors: [],
  }

  for (const file of files) {
    const filePath = path.join(ASSETS_FOLDER, file)
    const stats = fs.statSync(filePath)
    
    if (!stats.isFile()) continue

    const publicId = PUBLIC_ID_MAP[file] || file.replace(/\.[^/.]+$/, '').replace(/\s+/g, '-').toLowerCase()
    
    const result = await uploadFile(filePath, publicId)
    
    if (result) {
      results.uploaded.push({ file, publicId, url: result.secure_url })
    } else if (PUBLIC_ID_MAP[file]) {
      results.skipped.push({ file, publicId })
    } else {
      results.errors.push({ file })
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  console.log('\n📊 Upload Summary:')
  console.log(`✅ Uploaded: ${results.uploaded.length}`)
  console.log(`⚠️  Skipped: ${results.skipped.length}`)
  console.log(`❌ Errors: ${results.errors.length}`)

  if (results.uploaded.length > 0) {
    console.log('\n📝 Uploaded files:')
    results.uploaded.forEach(({ file, publicId, url }) => {
      console.log(`   ${file} → ${publicId}`)
    })
  }

  // Save mapping to a JSON file for reference
  const mapping = {}
  results.uploaded.forEach(({ file, publicId }) => {
    mapping[`/Banque d_images/${file}`] = publicId
  })

  fs.writeFileSync(
    path.join(__dirname, '../cloudinary-mapping.json'),
    JSON.stringify(mapping, null, 2)
  )
  
  console.log('\n💾 Mapping saved to cloudinary-mapping.json')
  console.log('\n✨ Done!')
}

uploadAllAssets().catch(console.error)


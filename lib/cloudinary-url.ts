/**
 * Get a Cloudinary URL with transformations
 * @param publicId The public ID of the image
 * @param options Transformation options
 * @returns Cloudinary URL
 */
export function getCloudinaryUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    crop?: string
    quality?: number
  } = {},
): string {
  const { width, height, crop = "fill", quality = 80 } = options

  let transformations = `q_${quality},f_auto`

  if (width) transformations += `,w_${width}`
  if (height) transformations += `,h_${height}`
  if (crop) transformations += `,c_${crop}`

  return `https://res.cloudinary.com/djpvhx39i/image/upload/${transformations}/${publicId}`
}


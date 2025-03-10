"use client"

import { useState } from "react"
import Image from "next/image"
import { getCloudinaryUrl } from "@/lib/cloudinary-url"

interface CloudinaryImageProps {
  publicId: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  crop?: string
  placeholder?: "blur" | "empty"
}

export function CloudinaryImage({
  publicId,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 80,
  crop = "fill",
  placeholder = "empty",
}: CloudinaryImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  // Generate Cloudinary URL with transformations
  const imageUrl = getCloudinaryUrl(publicId, {
    width,
    height,
    crop,
    quality,
  })

  // Generate a low-quality placeholder URL if needed
  const placeholderUrl =
    placeholder === "blur"
      ? getCloudinaryUrl(publicId, {
          width: 20,
          height: height ? Math.round((height / (width || 1)) * 20) : undefined,
          quality: 20,
          crop,
        })
      : undefined

  return (
    <div className={`relative ${isLoading ? "animate-pulse bg-gray-200" : ""}`}>
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500"}`}
        onLoad={() => setIsLoading(false)}
        priority={priority}
        placeholder={placeholder === "blur" ? "blur" : undefined}
        blurDataURL={placeholderUrl}
      />
    </div>
  )
}


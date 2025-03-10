"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, ImageIcon } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void
  defaultImage?: string
  className?: string
}

export function ImageUpload({ onImageUpload, defaultImage, className }: ImageUploadProps) {
  const [image, setImage] = useState<string | null>(defaultImage || null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)

      // Create a FormData object to send the file
      const formData = new FormData()
      formData.append("file", file)

      // Send the file to the API route
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload image")
      }

      const data = await response.json()
      setImage(data.url)
      onImageUpload(data.url)
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    onImageUpload("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor="image">Image</Label>

      {image ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-md border">
          <Image src={image || "/placeholder.svg"} alt="Uploaded image" fill className="object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute right-2 top-2"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex aspect-video w-full flex-col items-center justify-center rounded-md border border-dashed">
          <ImageIcon className="h-10 w-10 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">No image uploaded</p>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Input
          ref={fileInputRef}
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full"
        >
          {isUploading ? (
            "Uploading..."
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              {image ? "Change Image" : "Upload Image"}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}


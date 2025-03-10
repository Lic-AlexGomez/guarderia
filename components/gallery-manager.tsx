"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ImageUpload } from "@/components/image-upload"
import { Trash2, Plus } from "lucide-react"
import Image from "next/image"

interface GalleryImage {
  id: string
  url: string
  title?: string
}

interface GalleryManagerProps {
  initialImages?: GalleryImage[]
  onImagesChange?: (images: GalleryImage[]) => void
}

export function GalleryManager({ initialImages = [], onImagesChange }: GalleryManagerProps) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages)
  const [isAddingImage, setIsAddingImage] = useState(false)

  const handleAddImage = (imageUrl: string) => {
    if (!imageUrl) {
      setIsAddingImage(false)
      return
    }

    const newImage: GalleryImage = {
      id: Date.now().toString(),
      url: imageUrl,
    }

    const updatedImages = [...images, newImage]
    setImages(updatedImages)
    onImagesChange?.(updatedImages)
    setIsAddingImage(false)
  }

  const handleRemoveImage = async (id: string) => {
    try {
      const imageToDelete = images.find((img) => img.id === id)

      if (imageToDelete) {
        // Only attempt to delete if it's not a placeholder
        if (!imageToDelete.url.includes("placeholder.svg")) {
          // Send request to delete the image
          await fetch("/api/delete-image", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: imageToDelete.url }),
          })
        }
      }

      const updatedImages = images.filter((image) => image.id !== id)
      setImages(updatedImages)
      onImagesChange?.(updatedImages)
    } catch (error) {
      console.error("Error removing image:", error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.title || "Gallery image"}
                fill
                className="object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => handleRemoveImage(image.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-2">
              <p className="text-sm truncate">{image.title || "Untitled image"}</p>
            </CardContent>
          </Card>
        ))}

        {isAddingImage ? (
          <Card className="overflow-hidden">
            <CardContent className="p-4">
              <ImageUpload onImageUpload={handleAddImage} />
            </CardContent>
          </Card>
        ) : (
          <Card
            className="flex aspect-video items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setIsAddingImage(true)}
          >
            <div className="flex flex-col items-center gap-1">
              <Plus className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Add Image</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}


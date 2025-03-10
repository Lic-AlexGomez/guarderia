"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageUpload } from "@/components/image-upload"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Trash2 } from "lucide-react"
import Image from "next/image"

interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
  format: string
  width: number
  height: number
  resource_type: string
}

interface GalleryImage {
  id: string
  publicId: string
  url: string
  category: string
  createdAt: string
}

const CATEGORIES = ["facilities", "activities", "events", "playground"]

export function GalleryManager() {
  const { toast } = useToast()
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("facilities")
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  // Mock function to load images - in a real app, this would fetch from your database
  useEffect(() => {
    // Simulate loading images from API
    setTimeout(() => {
      // This is just mock data - in a real app, you'd fetch from your API
      setImages([
        {
          id: "1",
          publicId: "daycare/sample1",
          url: "/placeholder.svg?height=300&width=400",
          category: "facilities",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          publicId: "daycare/sample2",
          url: "/placeholder.svg?height=300&width=400",
          category: "activities",
          createdAt: new Date().toISOString(),
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleUploadComplete = (result: CloudinaryUploadResult) => {
    // In a real app, you would save this to your database
    const newImage: GalleryImage = {
      id: Date.now().toString(),
      publicId: result.public_id,
      url: result.secure_url,
      category: activeCategory,
      createdAt: new Date().toISOString(),
    }

    setImages([newImage, ...images])
  }

  const handleDeleteImage = async (imageId: string, publicId: string) => {
    try {
      setIsDeleting(imageId)

      // Delete from Cloudinary via API route
      const response = await fetch("/api/cloudinary/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      })

      if (!response.ok) {
        throw new Error("Delete failed")
      }

      // Remove from state
      setImages(images.filter((img) => img.id !== imageId))

      toast({
        title: "Image deleted",
        description: "The image has been removed from the gallery",
      })
    } catch (error) {
      console.error("Delete error:", error)
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: "There was a problem deleting the image",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gallery Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="facilities" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="mb-4">
            {CATEGORIES.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {CATEGORIES.map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              <ImageUpload
                onUploadComplete={handleUploadComplete}
                folder={`daycare/${category}`}
                buttonText={`Upload ${category} Image`}
              />

              {isLoading ? (
                <div className="flex h-40 items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images
                    .filter((img) => img.category === category)
                    .map((image) => (
                      <div key={image.id} className="relative group overflow-hidden rounded-md border">
                        <div className="aspect-video w-full relative">
                          <Image
                            src={image.url || "/placeholder.svg"}
                            alt={`Gallery ${image.category}`}
                            width={300}
                            height={200}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteImage(image.id, image.publicId)}
                            disabled={isDeleting === image.id}
                          >
                            {isDeleting === image.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4 mr-1" />
                            )}
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}

                  {images.filter((img) => img.category === category).length === 0 && (
                    <div className="col-span-full py-8 text-center text-muted-foreground">
                      <p>No images in this category yet.</p>
                      <p className="text-sm">Upload images to display them in the gallery.</p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}


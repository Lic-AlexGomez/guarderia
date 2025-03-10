"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState<{
    success?: boolean
    message?: string
  } | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setFormState({
        success: true,
        message: `Email ${formData.get("email")} submitted successfully!`,
      })

      toast({
        title: "Success!",
        description: "Your message has been sent. We'll get back to you soon.",
      })

      // Reset the form
      event.currentTarget.reset()
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormState({
        success: false,
        message: "There was an error submitting your message. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" name="name" required className="mt-1 block w-full" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" required className="mt-1 block w-full" />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" required className="mt-1 block w-full" rows={4} />
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
        {formState && (
          <div className={`mt-4 text-center ${formState.success ? "text-green-600" : "text-red-600"}`}>
            {formState.message}
          </div>
        )}
      </div>
    </div>
  )
}


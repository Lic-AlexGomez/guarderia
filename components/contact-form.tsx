"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import emailjs from "@emailjs/browser"

// Initialize EmailJS with your public key
emailjs.init("BUOYp6XLjYAJrvIC4")

interface ContactFormProps {
  language: string
}

export function ContactForm({ language }: ContactFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })

  const translations = {
    en: {
      title: "Schedule a Visit",
      name: "Name",
      namePlaceholder: "Your name",
      phone: "Phone",
      phonePlaceholder: "Your phone",
      email: "Email",
      emailPlaceholder: "Your email",
      message: "Message",
      messagePlaceholder: "How can we help you?",
      send: "Send Message",
      sending: "Sending...",
      successTitle: "Message Sent!",
      successMessage: "Thank you for your interest. We'll contact you shortly.",
      errorTitle: "Error",
      errorMessage: "There was a problem sending your message. Please try again.",
    },
    es: {
      title: "Agenda una Visita",
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      phone: "Teléfono",
      phonePlaceholder: "Tu teléfono",
      email: "Email",
      emailPlaceholder: "Tu email",
      message: "Mensaje",
      messagePlaceholder: "¿En qué podemos ayudarte?",
      send: "Enviar Mensaje",
      sending: "Enviando...",
      successTitle: "¡Mensaje Enviado!",
      successMessage: "Gracias por tu interés. Te contactaremos pronto.",
      errorTitle: "Error",
      errorMessage: "Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo.",
    },
  }

  const t = (key: string) => {
    return (
      translations[language as keyof typeof translations][
        key as keyof (typeof translations)[keyof typeof translations]
      ] || key
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send email using EmailJS
      const result = await emailjs.send("service_rctu0oi", "template_i899fmk", {
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone,
        message: formData.message,
        subject: `Agenda una visita - ${formData.name}`,
        to_name: "Laly's Family Group Daycare",
        visit_request: `Nombre: ${formData.name}\nTeléfono: ${formData.phone}\nEmail: ${formData.email}\nMensaje: ${formData.message}`,
      })

      // Show success message
      toast({
        title: t("successTitle"),
        description: t("successMessage"),
      })

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      })
    } catch (error) {
      console.error("Email error:", error)

      // Show more detailed error message
      let errorMessage = t("errorMessage")
      if (error && typeof error === "object" && "text" in error) {
        errorMessage += ` (${(error as any).text})`
      }

      toast({
        variant: "destructive",
        title: t("errorTitle"),
        description: errorMessage,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t("name")}</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("namePlaceholder")}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{t("phone")}</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t("phonePlaceholder")}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t("emailPlaceholder")}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder={t("messagePlaceholder")}
          required
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-500 via-pink-500 to-green-500 hover:from-blue-600 hover:via-pink-600 hover:to-green-600 text-white"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t("sending")}
          </>
        ) : (
          t("send")
        )}
      </Button>
    </form>
  )
}


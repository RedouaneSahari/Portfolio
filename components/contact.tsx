"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Phone, Linkedin, Loader2, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function Contact() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Message envoyé !",
          description: "Je vous répondrai dans les plus brefs délais.",
        })
        setFormData({ name: "", email: "", message: "" })
      } else {
        throw new Error(data.error || "Une erreur est survenue")
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "redouane.sahari@gmail.com",
      href: "mailto:redouane.sahari@gmail.com",
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: "07 60 76 56 79",
      href: "tel:0760765679",
    },
    {
      icon: MapPin,
      label: "Localisation",
      value: "Paris, France",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Voir mon profil",
      href: "https://www.linkedin.com/in/Redouane%20Sahari",
    },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`py-20 bg-[#0a0a0a] rounded-[20px] mx-4 transition-all duration-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 relative pb-4">
            Me Contacter
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-cyan-400" />
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-lg border border-transparent hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300"
                >
                  <info.icon className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white mb-1">{info.label}</div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-[#b0b0b0] hover:text-white transition-colors"
                        target={info.label === "LinkedIn" ? "_blank" : undefined}
                        rel={info.label === "LinkedIn" ? "noopener noreferrer" : undefined}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-[#b0b0b0]">{info.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <Card className="p-6 bg-[#1a1a1a] border-transparent">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#b0b0b0]">
                    Nom
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-[#1a1a1a] border-transparent focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.3)] text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#b0b0b0]">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-[#1a1a1a] border-transparent focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.3)] text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[#b0b0b0]">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-[#1a1a1a] border-transparent focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.3)] text-white resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-transparent border-2 border-cyan-400 text-white hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-cyan-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 -z-10" />
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Envoyer
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

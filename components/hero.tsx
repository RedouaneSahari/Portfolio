"use client"

import { Button } from "@/components/ui/button"
import { Mail, Shield } from "lucide-react"

export function Hero() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }



  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#1a2332] to-[#0a1628] -z-10" />
      <div className="absolute inset-0 grid-pattern opacity-50 -z-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-44 h-44 rounded-full bg-gradient-to-br from-[#00d9ff] to-[#00a8cc] flex items-center justify-center mx-auto mb-8 animate-pulse-cyan shadow-[0_0_60px_rgba(0,217,255,0.4)]">
            <Shield className="w-20 h-20 text-[#0a1628]" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#ccd6f6] to-[#00d9ff] bg-clip-text text-transparent">
              Redouane Sahari
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-[#8892b0] mb-8">
            Cybersécurité & Hacker Éthique | Expert en Sécurité des Systèmes
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={handleDownloadCV}
              className="bg-transparent border-2 border-[#00d9ff] text-[#ccd6f6] hover:bg-[#00d9ff] hover:text-[#0a1628] hover:shadow-[0_0_30px_rgba(0,217,255,0.6)] transition-all duration-300 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-[#00d9ff] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 -z-10" />
              <Download className="mr-2 h-5 w-5" />
              Télécharger CV
            </Button>
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-transparent border-2 border-[#00d9ff] text-[#ccd6f6] hover:bg-[#00d9ff] hover:text-[#0a1628] hover:shadow-[0_0_30px_rgba(0,217,255,0.6)] transition-all duration-300 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-[#00d9ff] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 -z-10" />
              <Mail className="mr-2 h-5 w-5" />
              Me contacter
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { Card } from "@/components/ui/card"
import { MapPin, Car, Trophy } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

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

  const stats = [
    {
      icon: MapPin,
      title: "Paris",
      description: "Disponible en présentiel ou télétravail",
    },
    {
      icon: Car,
      title: "Permis B",
      description: "Véhicule personnel",
    },
    {
      icon: Trophy,
      title: "Champion",
      description: "Handball Paris 2013 & 2018",
    },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`py-20 transition-all duration-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 relative pb-4 text-[#ccd6f6]">
            À Propos
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-[#00d9ff]" />
          </h2>

          <div className="my-12">
            <p className="text-lg leading-relaxed text-[#8892b0] text-center max-w-3xl mx-auto">
              Candidat motivé et passionné par la cybersécurité, avec une grande soif d'apprendre afin d'acquérir de
              nouvelles compétences et atteindre mes objectifs professionnels. Je valorise le travail en équipe,
              l'adaptation rapide et la curiosité intellectuelle dans chaque projet que j'entreprends.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {stats.map((stat, index) => (
              <Card
                key={stat.title}
                className="p-8 text-center bg-[#1a2332] border-transparent hover:border-[#00d9ff] hover:shadow-[0_0_30px_rgba(0,217,255,0.3)] transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <stat.icon className="w-10 h-10 mx-auto mb-4 text-[#00d9ff]" />
                <h3 className="text-xl font-semibold mb-2 text-[#ccd6f6]">{stat.title}</h3>
                <p className="text-[#8892b0]">{stat.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

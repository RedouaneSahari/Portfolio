"use client"

import { useEffect, useRef, useState } from "react"

interface EducationItem {
  date: string
  title: string
  institution: string
  description: string
}

export function Education() {
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

  const education: EducationItem[] = [
    {
      date: "2025 - 2026",
      title: "BTS Cybersécurité, Informatique & Réseaux (CIEL)",
      institution: "En cours",
      description: "Formation complète en cybersécurité, administration réseau et systèmes d'information.",
    },
    {
      date: "2025",
      title: "SecNumacadémie",
      institution: "ANSSI",
      description:
        "Formation certifiante en cybersécurité délivrée par l'Agence Nationale de la Sécurité des Systèmes d'Information.",
    },
    {
      date: "2024",
      title: "Bachelor Développement Web",
      institution: "Formation supérieure",
      description: "Spécialisation en développement web full-stack, technologies modernes et méthodologies agiles.",
    },
    {
      date: "Diplôme obtenu",
      title: "Baccalauréat",
      institution: "Spécialités NSI / SES / Anglais littérature",
      description: "Parcours académique orienté numérique, sciences économiques et langues.",
    },
  ]

  return (
    <section
      id="education"
      ref={sectionRef}
      className={`py-20 bg-[#0a0a0a] transition-all duration-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 relative pb-4">
            Formations
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-cyan-400" />
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-cyan-400 -translate-x-1/2" />

            <div className="space-y-12">
              {education.map((edu, index) => (
                <div key={index} className="relative">
                  <div
                    className={`bg-[#1a1a1a] p-6 rounded-lg border border-transparent hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 hover:scale-105 ${
                      index % 2 === 0 ? "md:mr-auto md:w-[calc(50%-2rem)]" : "md:ml-auto md:w-[calc(50%-2rem)]"
                    }`}
                  >
                    <div className="text-cyan-400 font-bold mb-2">{edu.date}</div>
                    <h3 className="text-xl font-semibold text-white mb-1">{edu.title}</h3>
                    <h4 className="text-[#b0b0b0] mb-3 font-normal">{edu.institution}</h4>
                    <p className="text-[#b0b0b0] leading-relaxed">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

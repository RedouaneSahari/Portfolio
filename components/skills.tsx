"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Shield, Code, Users } from "lucide-react"

interface Skill {
  name: string
  level: number
}

interface SkillCategory {
  title: string
  icon: typeof Shield
  skills: Skill[]
}

export function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const [animateBars, setAnimateBars] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setAnimateBars(true), 200)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const skillCategories: SkillCategory[] = [
    {
      title: "Cybersécurité",
      icon: Shield,
      skills: [
        { name: "Analyse de vulnérabilités", level: 90 },
        { name: "Tests d'intrusion", level: 85 },
        { name: "Audits sécurité", level: 88 },
        { name: "Cisco VPN", level: 80 },
      ],
    },
    {
      title: "Technologies",
      icon: Code,
      skills: [
        { name: "Windows Server / Linux", level: 85 },
        { name: "Développement Web", level: 82 },
        { name: "Virtualisation (VMware/VirtualBox)", level: 88 },
        { name: "SQL / DevOps", level: 75 },
      ],
    },
    {
      title: "Soft Skills",
      icon: Users,
      skills: [
        { name: "Travail en équipe", level: 95 },
        { name: "Adaptation", level: 92 },
        { name: "Relation utilisateur", level: 90 },
        { name: "Curiosité / Apprentissage", level: 98 },
      ],
    },
  ]

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`py-20 bg-[#0a0a0a] transition-all duration-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 relative pb-4">
            Compétences
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-cyan-400" />
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {skillCategories.map((category) => (
              <Card
                key={category.title}
                className="p-6 bg-[#1a1a1a] border-transparent hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <category.icon className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-white">{skill.name}</span>
                        <span className="text-sm text-[#b0b0b0]">{skill.level}%</span>
                      </div>
                      <div className="h-2.5 bg-[#0a0a0a] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: animateBars ? `${skill.level}%` : "0%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

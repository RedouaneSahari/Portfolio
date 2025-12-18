"use client"

import { useEffect, useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bug, Network, Code, Search, Shield, Lock, Server, Activity, FileSearch } from "lucide-react"
import Link from "next/link"

interface Project {
  id: string
  title: string
  description: string
  icon: typeof Bug
  technologies: string[]
  date: string
  context: string
}

export function Projects() {
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

  const projects: Project[] = [
    {
      id: "audit-web-security",
      title: "Audit de Sécurité Web - Application E-commerce",
      description:
        "Analyse complète de vulnérabilités d'une application web de vente en ligne. Détection de failles OWASP Top 10 (XSS, SQL Injection, CSRF) et recommandations de sécurisation.",
      icon: Bug,
      technologies: ["Burp Suite", "OWASP ZAP", "SQL Injection", "XSS", "CSRF"],
      date: "Stage THETRIS - 2022",
      context: "Projet réalisé durant le stage chez THETRIS",
    },
    {
      id: "vpn-cisco-infrastructure",
      title: "Infrastructure VPN Cisco Sécurisée",
      description:
        "Déploiement d'une architecture réseau avec VPN site-à-site sous Cisco. Configuration de tunnels IPSec, authentification et chiffrement des communications inter-sites.",
      icon: Network,
      technologies: ["Cisco VPN", "IPSec", "GNS3", "Routage", "Firewall ASA"],
      date: "Formation BTS CIEL - 2025",
      context: "Projet académique de virtualisation réseau",
    },
    {
      id: "pentest-wordpress",
      title: "Test d'Intrusion WordPress",
      description:
        "Pentest d'un site WordPress : énumération avec WPScan, exploitation de plugins vulnérables, escalade de privilèges et recommandations de durcissement.",
      icon: Shield,
      technologies: ["Kali Linux", "WPScan", "Metasploit", "Nmap", "Burp Suite"],
      date: "Formation personnelle - 2024",
      context: "Environnement de test avec VM vulnérable",
    },
    {
      id: "lab-virtualisation",
      title: "Laboratoire de Virtualisation Sécurisé",
      description:
        "Création d'un lab de test avec VMs Windows Server 2019, Ubuntu Server et Kali Linux. Mise en place d'Active Directory, segmentation réseau et monitoring.",
      icon: Server,
      technologies: ["VMware", "Windows Server", "Active Directory", "Ubuntu", "Kali Linux"],
      date: "Projet personnel - 2024",
      context: "Infrastructure de test pour apprentissage",
    },
    {
      id: "ids-detection-intrusion",
      title: "Système de Détection d'Intrusion (IDS)",
      description:
        "Déploiement et configuration de Snort IDS pour surveiller le trafic réseau. Création de règles personnalisées, analyse de logs et détection d'attaques courantes.",
      icon: Activity,
      technologies: ["Snort", "Wireshark", "pfSense", "Linux", "Syslog"],
      date: "Formation BTS CIEL - 2025",
      context: "Projet de monitoring et sécurité réseau",
    },
    {
      id: "hardening-linux-server",
      title: "Durcissement Serveur Linux",
      description:
        "Sécurisation complète d'un serveur Ubuntu : configuration SSH, pare-feu UFW, fail2ban, mises à jour automatiques, audit avec Lynis et surveillance des logs.",
      icon: Lock,
      technologies: ["Ubuntu Server", "SSH", "UFW", "Fail2ban", "Lynis", "SELinux"],
      date: "Projet personnel - 2024",
      context: "Sécurisation d'infrastructure serveur",
    },
    {
      id: "analyse-malware-sandbox",
      title: "Analyse de Malware en Environnement Isolé",
      description:
        "Mise en place d'une sandbox d'analyse avec Cuckoo. Étude du comportement de malwares, analyse de trafic réseau et identification d'indicateurs de compromission (IOCs).",
      icon: FileSearch,
      technologies: ["Cuckoo Sandbox", "VirusTotal", "Wireshark", "Process Monitor", "Python"],
      date: "Formation SecNumAcadémie - 2025",
      context: "Certification ANSSI en cybersécurité",
    },
    {
      id: "password-strength",
      title: "Analyseur de Mots de Passe Interactif",
      description:
        "Outil web d'analyse de robustesse de mots de passe avec calcul d'entropie, détection de patterns faibles et estimation du temps de craquage par force brute.",
      icon: Code,
      technologies: ["JavaScript", "React", "Cryptographie", "Hash", "Security"],
      date: "Développement web - 2024",
      context: "Projet de sensibilisation sécurité",
    },
  ]

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`py-20 transition-all duration-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 relative pb-4">
            Projets Cybersécurité
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-cyan-400" />
          </h2>
          <p className="text-center text-[#b0b0b0] mb-16 max-w-2xl mx-auto">
            Portfolio de projets pratiques en sécurité informatique, tests d'intrusion et administration système
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Card
                  className="overflow-hidden cursor-pointer border-transparent hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-all duration-300 hover:-translate-y-2 bg-[#1a1a1a] h-full flex flex-col"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-52 bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] flex items-center justify-center relative overflow-hidden group">
                    <project.icon className="w-16 h-16 text-cyan-400 transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-cyan-400/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Search className="w-12 h-12 text-white" />
                    </div>
                    {/* Date badge */}
                    <div className="absolute top-3 right-3 bg-black/80 px-3 py-1 rounded-full">
                      <span className="text-xs text-cyan-400 font-semibold">{project.date}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-cyan-400 line-clamp-2">{project.title}</h3>
                    <p className="text-[#b0b0b0] mb-3 text-sm line-clamp-3 flex-1">{project.description}</p>
                    <p className="text-xs text-cyan-400/70 mb-3 italic">{project.context}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <Badge
                          key={tech}
                          className="bg-[#0a0a0a] text-[#b0b0b0] hover:bg-[#0a0a0a] border-none text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge className="bg-[#0a0a0a] text-cyan-400 hover:bg-[#0a0a0a] border-none text-xs">
                          +{project.technologies.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

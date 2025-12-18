import { NextResponse } from "next/server"

const projects = [
  {
    id: "1",
    title: "Audit de Sécurité Web",
    description:
      "Analyse complète de vulnérabilités sur une application web, détection de failles XSS et SQL injection avec rapport détaillé et recommandations.",
    technologies: ["Pentesting", "OWASP", "Burp Suite", "Metasploit"],
    featured: true,
  },
  {
    id: "2",
    title: "Infrastructure Réseau Sécurisée",
    description:
      "Mise en place d'une architecture réseau complète avec segmentation VLAN, firewall Cisco ASA et VPN site-to-site sous environnement virtualisé.",
    technologies: ["VMware", "Cisco", "VPN", "pfSense"],
    featured: true,
  },
  {
    id: "3",
    title: "Application Web Sécurisée",
    description:
      "Développement d'une application web avec authentification multi-facteurs, chiffrement des données sensibles et protection contre les attaques OWASP Top 10.",
    technologies: ["Node.js", "PHP", "MySQL", "JWT"],
    featured: true,
  },
  {
    id: "4",
    title: "Système de Détection d'Intrusion",
    description:
      "Configuration et déploiement d'un IDS/IPS avec Snort pour surveiller le trafic réseau et détecter les activités malveillantes en temps réel.",
    technologies: ["Snort", "Wireshark", "Linux", "Python"],
    featured: false,
  },
  {
    id: "5",
    title: "Analyse Forensique",
    description:
      "Investigation numérique sur des systèmes compromis avec extraction et analyse de preuves numériques selon les standards NIST.",
    technologies: ["Autopsy", "Volatility", "FTK", "EnCase"],
    featured: false,
  },
  {
    id: "6",
    title: "Plateforme de Formation Cybersécurité",
    description:
      "Développement d'une plateforme e-learning avec laboratoires virtuels pour l'apprentissage des techniques de pentesting.",
    technologies: ["Docker", "Kali Linux", "WebGoat", "DVWA"],
    featured: false,
  },
]

export async function GET() {
  try {
    return NextResponse.json({
      projects,
      total: projects.length,
    })
  } catch (error) {
    console.error("[v0] Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.description || !body.technologies) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newProject = {
      id: String(projects.length + 1),
      featured: false,
      ...body,
    }

    projects.push(newProject)

    console.log("[v0] New project added:", newProject.title)

    return NextResponse.json({ project: newProject }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}

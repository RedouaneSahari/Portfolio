import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PasswordStrengthAnalyzer } from "@/components/projects/password-strength-analyzer"
import { AuditWebSecurity } from "@/components/projects/audit-web-security"
import { VPNCiscoInfrastructure } from "@/components/projects/vpn-cisco-infrastructure"
import { PentestWordpress } from "@/components/projects/pentest-wordpress"
import { VirtualLab } from "@/components/projects/virtual-lab"
import { IDSDetection } from "@/components/projects/ids-detection"
import { LinuxHardening } from "@/components/projects/linux-hardening"
import { MalwareAnalysis } from "@/components/projects/malware-analysis"
import { notFound } from "next/navigation"
import type { JSX } from "react"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params
  const projectTitles: Record<string, string> = {
    "audit-web-security": "Audit de Sécurité Web",
    "vpn-cisco-infrastructure": "Infrastructure VPN Cisco",
    "pentest-wordpress": "Test d'Intrusion WordPress",
    "lab-virtualisation": "Laboratoire de Virtualisation",
    "ids-detection-intrusion": "Système de Détection d'Intrusion",
    "hardening-linux-server": "Durcissement Serveur Linux",
    "analyse-malware-sandbox": "Analyse de Malware en Sandbox",
    "password-strength": "Analyseur de Mot de Passe",
  }

  return {
    title: `${projectTitles[id] || "Projet"} - Redouane Sahari`,
    description: "Projet interactif de cybersécurité",
  }
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const { id } = await params

  const projectComponents: Record<string, JSX.Element> = {
    "audit-web-security": <AuditWebSecurity />,
    "vpn-cisco-infrastructure": <VPNCiscoInfrastructure />,
    "pentest-wordpress": <PentestWordpress />,
    "lab-virtualisation": <VirtualLab />,
    "ids-detection-intrusion": <IDSDetection />,
    "hardening-linux-server": <LinuxHardening />,
    "analyse-malware-sandbox": <MalwareAnalysis />,
    "password-strength": <PasswordStrengthAnalyzer />,
  }

  if (!projectComponents[id]) {
    notFound()
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-black pt-20">{projectComponents[id]}</main>
      <Footer />
    </>
  )
}

export async function generateStaticParams() {
  return [
    { id: "audit-web-security" },
    { id: "vpn-cisco-infrastructure" },
    { id: "pentest-wordpress" },
    { id: "lab-virtualisation" },
    { id: "ids-detection-intrusion" },
    { id: "hardening-linux-server" },
    { id: "analyse-malware-sandbox" },
    { id: "password-strength" },
  ]
}

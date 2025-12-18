"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, ArrowLeft, CheckCircle2, XCircle, AlertTriangle, Terminal } from "lucide-react"
import Link from "next/link"

export function LinuxHardening() {
  const [scanComplete, setScanComplete] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const hardeningChecks = [
    {
      category: "Authentification & Accès",
      checks: [
        {
          name: "Politique de mots de passe forte",
          status: "pass",
          description: "PAM configuré avec longueur min 12 caractères, complexité requise",
        },
        {
          name: "Désactivation de root SSH",
          status: "pass",
          description: "PermitRootLogin no dans /etc/ssh/sshd_config",
        },
        {
          name: "Authentification par clés SSH",
          status: "pass",
          description: "PasswordAuthentication no, PubkeyAuthentication yes",
        },
        { name: "Sudo configuré correctement", status: "pass", description: "Requiretty activé, logs sudo actifs" },
        { name: "Comptes inactifs désactivés", status: "warning", description: "2 comptes inactifs >90 jours trouvés" },
      ],
    },
    {
      category: "Réseau & Firewall",
      checks: [
        {
          name: "UFW Firewall activé",
          status: "pass",
          description: "UFW actif avec politique par défaut DENY",
        },
        {
          name: "Ports non essentiels fermés",
          status: "pass",
          description: "Seuls SSH(22), HTTP(80), HTTPS(443) ouverts",
        },
        {
          name: "IPv6 désactivé",
          status: "pass",
          description: "net.ipv6.conf.all.disable_ipv6 = 1 dans sysctl",
        },
        {
          name: "SYN cookies activés",
          status: "pass",
          description: "Protection contre SYN flood configurée",
        },
        {
          name: "IP forwarding désactivé",
          status: "pass",
          description: "net.ipv4.ip_forward = 0",
        },
      ],
    },
    {
      category: "Services & Démons",
      checks: [
        { name: "Services inutiles désactivés", status: "pass", description: "15 services non essentiels arrêtés" },
        { name: "Telnet désinstallé", status: "pass", description: "Telnet server non présent" },
        { name: "FTP désactivé", status: "pass", description: "vsftpd non installé" },
        {
          name: "Apache sécurisé",
          status: "pass",
          description: "ServerTokens Prod, ServerSignature Off configurés",
        },
        {
          name: "Services minimaux au boot",
          status: "warning",
          description: "3 services démarrent automatiquement sans justification",
        },
      ],
    },
    {
      category: "Système de Fichiers",
      checks: [
        {
          name: "Permissions /etc/passwd",
          status: "pass",
          description: "644 (rw-r--r--) - Correct",
        },
        {
          name: "Permissions /etc/shadow",
          status: "pass",
          description: "640 (rw-r-----) - Correct",
        },
        {
          name: "SUID/SGID bits vérifiés",
          status: "warning",
          description: "2 binaires SUID suspects identifiés",
        },
        { name: "Partitions séparées", status: "pass", description: "/tmp, /var, /home sur partitions distinctes" },
        { name: "Quotas disque activés", status: "fail", description: "Quotas non configurés sur /home" },
      ],
    },
    {
      category: "Logs & Audits",
      checks: [
        { name: "Rsyslog actif", status: "pass", description: "Logs centralisés configurés" },
        {
          name: "Auditd installé",
          status: "pass",
          description: "auditd actif, règles pour /etc/passwd, /etc/shadow, sudo",
        },
        {
          name: "Rotation des logs",
          status: "pass",
          description: "logrotate configuré, rétention 90 jours",
        },
        {
          name: "Logs protégés",
          status: "pass",
          description: "Permissions 640 sur /var/log/*",
        },
        {
          name: "Monitoring actif",
          status: "warning",
          description: "Pas d'outil de monitoring centralisé (recommandé: ELK)",
        },
      ],
    },
    {
      category: "Mises à jour & Paquets",
      checks: [
        {
          name: "Système à jour",
          status: "pass",
          description: "0 mises à jour de sécurité en attente",
        },
        {
          name: "Unattended-upgrades",
          status: "pass",
          description: "Mises à jour automatiques de sécurité activées",
        },
        {
          name: "Paquets obsolètes",
          status: "warning",
          description: "5 paquets non maintenus détectés",
        },
        {
          name: "Repository officiels uniquement",
          status: "pass",
          description: "Aucun repository tiers suspect",
        },
      ],
    },
  ]

  const scoreCalculation = () => {
    let total = 0
    let passed = 0
    hardeningChecks.forEach((cat) => {
      cat.checks.forEach((check) => {
        total++
        if (check.status === "pass") passed++
      })
    })
    return Math.round((passed / total) * 100)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle2 className="h-5 w-5 text-green-400" />
      case "fail":
        return <XCircle className="h-5 w-5 text-red-400" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />
      default:
        return null
    }
  }

  const handleScan = () => {
    setScanning(true)
    setScanComplete(false)
    setTimeout(() => {
      setScanning(false)
      setScanComplete(true)
    }, 4000)
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/#projects">
          <Button variant="ghost" className="mb-8 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux projets
          </Button>
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-cyan-400/10 rounded-lg">
              <Lock className="h-10 w-10 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2 text-cyan-400">Hardening Linux - Serveur Ubuntu 22.04 LTS</h1>
              <p className="text-gray-400">Formation BTS CIEL - 2024 • Sécurisation système avancée</p>
            </div>
          </div>

          <Card className="bg-[#1a1a1a] border-cyan-400/20 p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">Description du Projet</h3>
            <p className="text-gray-300 mb-4">
              Projet de sécurisation complète d'un serveur Ubuntu 22.04 LTS suivant les recommandations CIS Benchmark et
              ANSSI. Le projet couvre 6 domaines critiques : authentification, réseau, services, système de fichiers,
              logs/audits et gestion des mises à jour. Plus de 30 points de contrôle vérifiés et documentés.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-cyan-400">{scoreCalculation()}%</p>
                <p className="text-sm text-gray-400">Score de sécurité</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-400">6</p>
                <p className="text-sm text-gray-400">Catégories auditées</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-400">30+</p>
                <p className="text-sm text-gray-400">Points de contrôle</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-cyan-400">CIS Level 2</p>
                <p className="text-sm text-gray-400">Benchmark visé</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-8">
          <Card className="bg-[#1a1a1a] border-cyan-400/20 p-6">
            <h3 className="text-xl font-semibold mb-4 text-cyan-400 flex items-center gap-2">
              <Terminal className="h-5 w-5" />
              Scanner de Sécurité
            </h3>
            <div className="bg-black/60 rounded-lg p-4 mb-4 font-mono text-sm">
              <p className="text-green-400">$ sudo lynis audit system</p>
              {scanning && (
                <div className="mt-4 space-y-2">
                  <p className="text-gray-400">[*] Initializing Lynis security audit...</p>
                  <p className="text-gray-400">[*] Checking system hardening...</p>
                  <p className="text-gray-400">[*] Analyzing authentication mechanisms...</p>
                  <p className="text-gray-400">[*] Auditing network configuration...</p>
                  <p className="text-cyan-400 animate-pulse">[*] Scan in progress...</p>
                </div>
              )}
              {scanComplete && (
                <div className="mt-4 space-y-1 text-xs">
                  <p className="text-green-400">[+] System hardening index: {scoreCalculation()}/100</p>
                  <p className="text-green-400">[+] Tests performed: 34</p>
                  <p className="text-green-400">[+] Passed: 26</p>
                  <p className="text-yellow-400">[!] Warnings: 6</p>
                  <p className="text-red-400">[!] Failed: 2</p>
                  <p className="text-cyan-400">[*] Detailed report saved to /var/log/lynis.log</p>
                </div>
              )}
            </div>
            <Button
              onClick={handleScan}
              disabled={scanning}
              className="bg-cyan-400 hover:bg-cyan-500 text-black font-semibold"
            >
              {scanning ? "Scan en cours..." : scanComplete ? "Relancer le scan" : "Lancer l'audit"}
            </Button>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-cyan-400">Points de Contrôle par Catégorie</h2>
        <div className="space-y-4 mb-8">
          {hardeningChecks.map((category, idx) => {
            const passed = category.checks.filter((c) => c.status === "pass").length
            const total = category.checks.length
            const percentage = Math.round((passed / total) * 100)

            return (
              <Card key={idx} className="bg-[#1a1a1a] border-cyan-400/20 p-6">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setSelectedCategory(selectedCategory === category.category ? null : category.category)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Lock className="h-6 w-6 text-cyan-400" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{category.category}</h3>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-green-400 transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-400 min-w-[60px]">
                          {passed}/{total} ({percentage}%)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedCategory === category.category && (
                  <div className="mt-6 space-y-3 pt-4 border-t border-gray-700">
                    {category.checks.map((check, checkIdx) => (
                      <div key={checkIdx} className="flex items-start gap-3 p-3 bg-black/40 rounded-lg">
                        {getStatusIcon(check.status)}
                        <div className="flex-1">
                          <p className="font-semibold text-white mb-1">{check.name}</p>
                          <p className="text-sm text-gray-400">{check.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-[#1a1a1a] border-cyan-400/20 p-6">
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">Outils & Standards Utilisés</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold">CIS Benchmark Ubuntu 22.04</p>
                  <p className="text-gray-400">Guide de sécurisation officiel CIS Level 2</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold">Lynis Security Auditing Tool</p>
                  <p className="text-gray-400">Scanner d'audit de sécurité open-source</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold">ANSSI Recommandations</p>
                  <p className="text-gray-400">Guide de sécurisation Linux de l'ANSSI</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold">OpenSCAP</p>
                  <p className="text-gray-400">Framework de conformité et sécurité</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-[#1a1a1a] border-cyan-400/20 p-6">
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">Scripts d'Automatisation</h3>
            <div className="bg-black/60 rounded p-3 text-xs font-mono overflow-x-auto">
              <pre className="text-gray-300">{`#!/bin/bash
# Script de hardening automatisé

# Désactivation de services inutiles
systemctl disable telnet.service
systemctl disable vsftpd.service

# Configuration SSH sécurisée
sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config

# Configuration UFW
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw enable

# Politique de mots de passe
sed -i 's/PASS_MIN_LEN.*/PASS_MIN_LEN 12/' /etc/login.defs

echo "Hardening terminé!"
`}</pre>
            </div>
          </Card>
        </div>

        <Card className="bg-[#1a1a1a] border-cyan-400/20 p-6">
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">Compétences Développées</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Linux Hardening",
              "Ubuntu Server",
              "CIS Benchmark",
              "Lynis",
              "UFW Firewall",
              "SSH Security",
              "PAM Configuration",
              "Auditd",
              "System Security",
              "File Permissions",
              "Service Hardening",
              "Security Automation",
              "ANSSI Guidelines",
              "Compliance",
            ].map((skill) => (
              <Badge key={skill} className="bg-cyan-400/10 text-cyan-400 border-cyan-400/30">
                {skill}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

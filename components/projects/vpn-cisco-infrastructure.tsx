"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Network, ArrowLeft, CheckCircle2, Server, Shield } from "lucide-react"
import Link from "next/link"

export function VPNCiscoInfrastructure() {
  const [selectedSite, setSelectedSite] = useState<string | null>(null)

  const sites = [
    {
      id: "paris",
      name: "Site Principal - Paris",
      ip: "192.168.1.0/24",
      devices: ["Routeur Cisco 2901", "Switch Cisco 2960", "Firewall ASA 5505"],
      users: 50,
      status: "Connecté",
    },
    {
      id: "lyon",
      name: "Site Secondaire - Lyon",
      ip: "192.168.2.0/24",
      devices: ["Routeur Cisco 2811", "Switch Cisco 2950"],
      users: 25,
      status: "Connecté",
    },
    {
      id: "marseille",
      name: "Site Tertiaire - Marseille",
      ip: "192.168.3.0/24",
      devices: ["Routeur Cisco 1941", "Switch Cisco 2960"],
      users: 15,
      status: "Connecté",
    },
  ]

  const vpnConfig = [
    {
      title: "Tunnel VPN IPSec",
      items: [
        "Protocole: IPSec (Internet Protocol Security)",
        "Mode: Tunnel mode site-à-site",
        "Chiffrement: AES-256-CBC",
        "Hachage: SHA-256",
        "Groupe Diffie-Hellman: Group 14",
        "Durée de vie SA: 28800 secondes",
      ],
    },
    {
      title: "Authentification",
      items: [
        "Type: Pre-Shared Key (PSK)",
        "Clé partagée: Complexe 32+ caractères",
        "Authentication Header (AH): Activé",
        "Perfect Forward Secrecy: Activé",
      ],
    },
    {
      title: "Routage & Sécurité",
      items: [
        "Protocole de routage: OSPF",
        "ACL: Access Control Lists configurées",
        "NAT Traversal: Activé",
        "Dead Peer Detection: 30 secondes",
        "Keep-alive: 10 secondes",
      ],
    },
  ]

  const implementation = [
    {
      step: 1,
      title: "Planification & Design",
      description: "Schéma réseau, adressage IP, topologie VPN site-à-site",
      duration: "2 jours",
    },
    {
      step: 2,
      title: "Configuration GNS3",
      description: "Mise en place de l'environnement virtualisé avec routeurs Cisco IOS",
      duration: "1 jour",
    },
    {
      step: 3,
      title: "Configuration VPN IPSec",
      description: "Paramétrage des tunnels VPN entre les 3 sites avec chiffrement AES-256",
      duration: "3 jours",
    },
    {
      step: 4,
      title: "Tests & Validation",
      description: "Tests de connectivité, vérification du chiffrement et des performances",
      duration: "2 jours",
    },
    {
      step: 5,
      title: "Documentation",
      description: "Rédaction de la documentation technique et procédures de maintenance",
      duration: "1 jour",
    },
  ]

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
              <Network className="h-10 w-10 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2 text-cyan-400">Infrastructure VPN Cisco Sécurisée</h1>
              <p className="text-gray-400">Formation BTS CIEL - 2025 • Projet académique de virtualisation réseau</p>
            </div>
          </div>

          <Card className="bg-[#1a1a1a] border-cyan-400/20 p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">Description du Projet</h3>
            <p className="text-gray-300 mb-4">
              Conception et déploiement d'une infrastructure réseau virtualisée avec VPN site-à-site sous Cisco. Le
              projet simule une entreprise multi-sites avec interconnexion sécurisée via tunnels IPSec. Configuration
              complète sous GNS3 avec routeurs Cisco IOS, switches et firewalls ASA.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-cyan-400">3</p>
                <p className="text-sm text-gray-400">Sites interconnectés</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-400">100%</p>
                <p className="text-sm text-gray-400">Disponibilité</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-400">AES-256</p>
                <p className="text-sm text-gray-400">Chiffrement</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-cyan-400">90</p>
                <p className="text-sm text-gray-400">Utilisateurs</p>
              </div>
            </div>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-cyan-400">Architecture Réseau</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {sites.map((site) => (
            <Card
              key={site.id}
              className={`bg-[#1a1a1a] p-6 cursor-pointer transition-all ${
                selectedSite === site.id
                  ? "border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                  : "border-cyan-400/20"
              }`}
              onClick={() => setSelectedSite(site.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <Server className="h-8 w-8 text-cyan-400" />
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{site.status}</Badge>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{site.name}</h3>
              <p className="text-sm text-gray-400 mb-3">Réseau: {site.ip}</p>
              <p className="text-sm text-gray-400 mb-3">Utilisateurs: {site.users}</p>
              <div className="space-y-1">
                {site.devices.map((device, idx) => (
                  <p key={idx} className="text-xs text-gray-500">
                    • {device}
                  </p>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6 text-cyan-400">Configuration VPN IPSec</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {vpnConfig.map((config) => (
            <Card key={config.title} className="bg-[#1a1a1a] border-cyan-400/20 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-cyan-400">
                <Shield className="h-5 w-5" />
                {config.title}
              </h3>
              <ul className="space-y-2">
                {config.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6 text-cyan-400">Étapes de Réalisation</h2>
        <div className="space-y-4 mb-8">
          {implementation.map((step) => (
            <Card key={step.step} className="bg-[#1a1a1a] border-cyan-400/20 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-400/10 flex items-center justify-center">
                  <span className="text-cyan-400 font-bold text-lg">{step.step}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    <Badge className="bg-cyan-400/10 text-cyan-400 border-cyan-400/30">{step.duration}</Badge>
                  </div>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="bg-[#1a1a1a] border-cyan-400/20 p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">
            Code de Configuration Exemple (Routeur Principal)
          </h3>
          <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto text-sm text-gray-300">
            {`! Configuration VPN IPSec Site-to-Site
crypto isakmp policy 10
 encryption aes 256
 hash sha256
 authentication pre-share
 group 14
 lifetime 86400

crypto isakmp key MySecurePreSharedKey123! address 203.0.113.2

crypto ipsec transform-set VPN-SET esp-aes 256 esp-sha256-hmac
 mode tunnel

crypto map VPN-MAP 10 ipsec-isakmp
 set peer 203.0.113.2
 set transform-set VPN-SET
 match address VPN-ACL

interface GigabitEthernet0/0
 crypto map VPN-MAP

ip access-list extended VPN-ACL
 permit ip 192.168.1.0 0.0.0.255 192.168.2.0 0.0.0.255`}
          </pre>
        </Card>

        <Card className="bg-[#1a1a1a] border-cyan-400/20 p-6">
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">Compétences Techniques Développées</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Cisco IOS",
              "VPN IPSec",
              "GNS3",
              "Routage OSPF",
              "Firewall ASA",
              "AES-256",
              "NAT",
              "ACL",
              "Site-to-Site VPN",
              "Sécurité réseau",
              "Chiffrement",
              "Authentification",
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

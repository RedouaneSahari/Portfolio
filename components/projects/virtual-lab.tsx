"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Server, ArrowLeft, MonitorPlay, HardDrive, Cpu, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export function VirtualLab() {
  const [selectedVM, setSelectedVM] = useState<string | null>(null)

  const virtualMachines = [
    {
      id: "windows-server",
      name: "Windows Server 2019",
      os: "Windows Server 2019 Datacenter",
      role: "Active Directory, DNS, DHCP",
      cpu: "4 vCPUs",
      ram: "8 GB",
      disk: "60 GB",
      network: "192.168.10.10/24",
      status: "running",
      services: ["Active Directory Domain Services", "DNS Server", "DHCP Server", "Group Policy Management"],
    },
    {
      id: "windows-client",
      name: "Windows 10 Pro",
      os: "Windows 10 Pro 21H2",
      role: "Poste client du domaine",
      cpu: "2 vCPUs",
      ram: "4 GB",
      disk: "40 GB",
      network: "192.168.10.20/24",
      status: "running",
      services: ["Client AD", "Antivirus", "Office Suite", "Remote Desktop"],
    },
    {
      id: "ubuntu-server",
      name: "Ubuntu Server 22.04 LTS",
      os: "Ubuntu Server 22.04 LTS",
      role: "Serveur Web et Base de données",
      cpu: "2 vCPUs",
      ram: "4 GB",
      disk: "50 GB",
      network: "192.168.10.30/24",
      status: "running",
      services: ["Apache2", "MySQL", "PHP 8.1", "SSH", "UFW Firewall"],
    },
    {
      id: "debian",
      name: "Debian 11",
      os: "Debian 11 (Bullseye)",
      role: "Serveur de fichiers et backup",
      cpu: "2 vCPUs",
      ram: "3 GB",
      disk: "100 GB",
      network: "192.168.10.40/24",
      status: "running",
      services: ["Samba", "NFS", "Rsync", "Cron Jobs", "SSH"],
    },
    {
      id: "kali",
      name: "Kali Linux",
      os: "Kali Linux 2023.4",
      role: "Machine de pentest",
      cpu: "4 vCPUs",
      ram: "8 GB",
      disk: "80 GB",
      network: "192.168.10.50/24",
      status: "stopped",
      services: ["Metasploit", "Nmap", "Burp Suite", "Wireshark", "Aircrack-ng"],
    },
    {
      id: "pfsense",
      name: "pfSense Firewall",
      os: "pfSense 2.7.0",
      role: "Routeur et Firewall",
      cpu: "2 vCPUs",
      ram: "2 GB",
      disk: "20 GB",
      network: "WAN: DHCP, LAN: 192.168.10.1/24",
      status: "running",
      services: ["Firewall Rules", "NAT", "DHCP Server", "DNS Forwarder", "VPN Server"],
    },
  ]

  const labConfig = {
    hypervisor: "VMware Workstation Pro 17",
    host: {
      cpu: "AMD Ryzen 7 5800X",
      ram: "32 GB DDR4",
      storage: "1 TB NVMe SSD",
      os: "Windows 11 Pro",
    },
    network: {
      topology: "NAT + Host-Only",
      subnet: "192.168.10.0/24",
      gateway: "192.168.10.1",
      dns: "192.168.10.10",
    },
  }

  const scenarios = [
    {
      title: "Configuration Active Directory",
      description: "Création d'un domaine, gestion des utilisateurs, groupes et GPO",
      steps: 5,
      completed: true,
    },
    {
      title: "Déploiement LAMP Stack",
      description: "Installation et configuration Linux, Apache, MySQL, PHP",
      steps: 4,
      completed: true,
    },
    {
      title: "Partage de fichiers inter-OS",
      description: "Configuration Samba pour partage Windows/Linux",
      steps: 3,
      completed: true,
    },
    {
      title: "Sécurisation réseau",
      description: "Configuration firewall pfSense et règles de filtrage",
      steps: 6,
      completed: true,
    },
    {
      title: "Pentest interne",
      description: "Scan de vulnérabilités et tests d'intrusion avec Kali",
      steps: 4,
      completed: true,
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
              <Server className="h-10 w-10 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2 text-cyan-400">Laboratoire de Virtualisation Multi-OS</h1>
              <p className="text-gray-400">Formation BTS CIEL - 2024 • Infrastructure hybride Windows/Linux</p>
            </div>
          </div>

          <Card className="bg-[#1a1a1a] border-cyan-400/20 p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">Description du Projet</h3>
            <p className="text-gray-300 mb-4">
              Conception d'un environnement virtualisé complet simulant une infrastructure d'entreprise. Le lab inclut
              des serveurs Windows et Linux, un Active Directory, des services réseau, et une machine de pentest. Idéal
              pour pratiquer l'administration système, la gestion réseau et les tests de sécurité.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-cyan-400">6</p>
                <p className="text-sm text-gray-400">Machines virtuelles</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-400">29 GB</p>
                <p className="text-sm text-gray-400">RAM allouée</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-400">350 GB</p>
                <p className="text-sm text-gray-400">Espace disque</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-cyan-400">5</p>
                <p className="text-sm text-gray-400">Scénarios réalisés</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#1a1a1a] border-cyan-400/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="h-6 w-6 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Configuration Hôte</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">
                <span className="text-cyan-400">Hyperviseur:</span> {labConfig.hypervisor}
              </p>
              <p className="text-gray-400">
                <span className="text-cyan-400">CPU:</span> {labConfig.host.cpu}
              </p>
              <p className="text-gray-400">
                <span className="text-cyan-400">RAM:</span> {labConfig.host.ram}
              </p>
              <p className="text-gray-400">
                <span className="text-cyan-400">Stockage:</span> {labConfig.host.storage}
              </p>
              <p className="text-gray-400">
                <span className="text-cyan-400">OS Hôte:</span> {labConfig.host.os}
              </p>
            </div>
          </Card>

          <Card className="bg-[#1a1a1a] border-cyan-400/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <MonitorPlay className="h-6 w-6 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Réseau Virtuel</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">
                <span className="text-cyan-400">Topologie:</span> {labConfig.network.topology}
              </p>
              <p className="text-gray-400">
                <span className="text-cyan-400">Sous-réseau:</span> {labConfig.network.subnet}
              </p>
              <p className="text-gray-400">
                <span className="text-cyan-400">Passerelle:</span> {labConfig.network.gateway}
              </p>
              <p className="text-gray-400">
                <span className="text-cyan-400">DNS:</span> {labConfig.network.dns}
              </p>
            </div>
          </Card>

          <Card className="bg-[#1a1a1a] border-cyan-400/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <HardDrive className="h-6 w-6 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Ressources Totales</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">
                <span className="text-cyan-400">vCPUs:</span> 16 alloués
              </p>
              <p className="text-gray-400">
                <span className="text-cyan-400">RAM:</span> 29 GB / 32 GB
              </p>
              <p className="text-gray-400">
                <span className="text-cyan-400">Disque:</span> 350 GB / 1 TB
              </p>
              <p className="text-gray-400">
                <span className="text-cyan-400">VMs actives:</span> 5 / 6
              </p>
            </div>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-cyan-400">Machines Virtuelles</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {virtualMachines.map((vm) => (
            <Card
              key={vm.id}
              className={`bg-[#1a1a1a] p-6 cursor-pointer transition-all ${
                selectedVM === vm.id ? "border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]" : "border-cyan-400/20"
              }`}
              onClick={() => setSelectedVM(selectedVM === vm.id ? null : vm.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Server className="h-6 w-6 text-cyan-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{vm.name}</h3>
                    <p className="text-xs text-gray-500">{vm.os}</p>
                  </div>
                </div>
                <Badge
                  className={
                    vm.status === "running"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                  }
                >
                  {vm.status === "running" ? "En ligne" : "Arrêtée"}
                </Badge>
              </div>

              <p className="text-sm text-gray-400 mb-3">{vm.role}</p>

              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <p className="text-gray-500">
                  CPU: <span className="text-cyan-400">{vm.cpu}</span>
                </p>
                <p className="text-gray-500">
                  RAM: <span className="text-cyan-400">{vm.ram}</span>
                </p>
                <p className="text-gray-500">
                  Disque: <span className="text-cyan-400">{vm.disk}</span>
                </p>
                <p className="text-gray-500">
                  IP: <span className="text-cyan-400">{vm.network.split(":").pop()}</span>
                </p>
              </div>

              {selectedVM === vm.id && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <h4 className="text-sm font-semibold text-cyan-400 mb-2">Services installés:</h4>
                  <div className="space-y-1">
                    {vm.services.map((service, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <CheckCircle2 className="h-3 w-3 text-green-400" />
                        <span className="text-gray-300">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6 text-cyan-400">Scénarios Pratiques Réalisés</h2>
        <div className="space-y-4 mb-8">
          {scenarios.map((scenario, idx) => (
            <Card key={idx} className="bg-[#1a1a1a] border-cyan-400/20 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-400/10 flex items-center justify-center">
                    {scenario.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    ) : (
                      <span className="text-cyan-400 font-semibold">{idx + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{scenario.title}</h3>
                    <p className="text-gray-400 text-sm">{scenario.description}</p>
                  </div>
                </div>
                <Badge className="bg-cyan-400/10 text-cyan-400 border-cyan-400/30">{scenario.steps} étapes</Badge>
              </div>
            </Card>
          ))}
        </div>

        <Card className="bg-[#1a1a1a] border-cyan-400/20 p-6">
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">Compétences Développées</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "VMware Workstation",
              "Windows Server",
              "Active Directory",
              "Linux Ubuntu",
              "Debian",
              "Kali Linux",
              "pfSense",
              "Virtualisation",
              "Administration système",
              "Réseau",
              "DHCP/DNS",
              "Samba",
              "Apache",
              "MySQL",
              "Firewall",
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

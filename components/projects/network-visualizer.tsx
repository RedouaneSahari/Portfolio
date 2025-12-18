"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Eye, Play, Pause, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface Packet {
  id: number
  source: string
  destination: string
  protocol: string
  size: number
  suspicious: boolean
  timestamp: string
}

export function NetworkVisualizer() {
  const [isRunning, setIsRunning] = useState(false)
  const [packets, setPackets] = useState<Packet[]>([])
  const [stats, setStats] = useState({ total: 0, suspicious: 0, http: 0, https: 0, ssh: 0 })

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      const protocols = ["HTTP", "HTTPS", "SSH", "FTP", "DNS", "SMTP"]
      const sources = ["192.168.1.100", "192.168.1.101", "10.0.0.50", "172.16.0.10"]
      const destinations = ["93.184.216.34", "142.250.185.46", "151.101.1.140", "104.16.132.229"]

      const newPacket: Packet = {
        id: Date.now(),
        source: sources[Math.floor(Math.random() * sources.length)],
        destination: destinations[Math.floor(Math.random() * destinations.length)],
        protocol: protocols[Math.floor(Math.random() * protocols.length)],
        size: Math.floor(Math.random() * 1500) + 64,
        suspicious: Math.random() > 0.85,
        timestamp: new Date().toLocaleTimeString(),
      }

      setPackets((prev) => [newPacket, ...prev.slice(0, 19)])

      setStats((prev) => ({
        total: prev.total + 1,
        suspicious: prev.suspicious + (newPacket.suspicious ? 1 : 0),
        http: prev.http + (newPacket.protocol === "HTTP" ? 1 : 0),
        https: prev.https + (newPacket.protocol === "HTTPS" ? 1 : 0),
        ssh: prev.ssh + (newPacket.protocol === "SSH" ? 1 : 0),
      }))
    }, 800)

    return () => clearInterval(interval)
  }, [isRunning])

  const resetStats = () => {
    setPackets([])
    setStats({ total: 0, suspicious: 0, http: 0, https: 0, ssh: 0 })
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <Link href="/#projects">
        <Button variant="ghost" className="mb-6 text-cyan-400 hover:text-white hover:bg-cyan-400/20">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux projets
        </Button>
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
            <Eye className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Visualiseur de Trafic Réseau</h1>
            <p className="text-gray-400">Surveillance en temps réel du trafic avec détection d'anomalies</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gray-900 border-cyan-500/30 p-4">
          <p className="text-gray-400 text-sm mb-1">Total Paquets</p>
          <p className="text-white font-bold text-2xl">{stats.total}</p>
        </Card>
        <Card className="bg-gray-900 border-cyan-500/30 p-4">
          <p className="text-gray-400 text-sm mb-1">Suspects</p>
          <p className="text-yellow-500 font-bold text-2xl">{stats.suspicious}</p>
        </Card>
        <Card className="bg-gray-900 border-cyan-500/30 p-4">
          <p className="text-gray-400 text-sm mb-1">HTTPS</p>
          <p className="text-green-500 font-bold text-2xl">{stats.https}</p>
        </Card>
        <Card className="bg-gray-900 border-cyan-500/30 p-4">
          <p className="text-gray-400 text-sm mb-1">HTTP</p>
          <p className="text-orange-500 font-bold text-2xl">{stats.http}</p>
        </Card>
      </div>

      <Card className="bg-gray-900 border-cyan-500/30 p-6 mb-6">
        <div className="flex gap-2">
          <Button
            onClick={() => setIsRunning(!isRunning)}
            className={`${isRunning ? "bg-orange-500 hover:bg-orange-600" : "bg-cyan-500 hover:bg-cyan-600"} text-white flex-1`}
          >
            {isRunning ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Arrêter la capture
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Démarrer la capture
              </>
            )}
          </Button>
          <Button onClick={resetStats} variant="outline" className="text-cyan-400 border-cyan-500/50 bg-transparent">
            Réinitialiser
          </Button>
        </div>
      </Card>

      <Card className="bg-gray-900 border-cyan-500/30 p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Trafic en temps réel</h2>

        {packets.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Aucun paquet capturé. Démarrez la capture pour voir le trafic.</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {packets.map((packet) => (
              <div
                key={packet.id}
                className={`bg-gray-950 rounded-lg p-3 border transition-all hover:border-cyan-500/50 ${
                  packet.suspicious ? "border-yellow-500/50" : "border-cyan-500/20"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs text-gray-400 font-mono">{packet.timestamp}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-bold ${
                          packet.protocol === "HTTPS" || packet.protocol === "SSH"
                            ? "bg-green-500/20 text-green-500"
                            : packet.protocol === "HTTP"
                              ? "bg-orange-500/20 text-orange-500"
                              : "bg-blue-500/20 text-blue-500"
                        }`}
                      >
                        {packet.protocol}
                      </span>
                      {packet.suspicious && (
                        <span className="flex items-center gap-1 text-yellow-500 text-xs font-semibold">
                          <AlertTriangle className="w-3 h-3" />
                          Suspect
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-white font-mono">{packet.source}</span>
                      <span className="text-cyan-400">→</span>
                      <span className="text-white font-mono">{packet.destination}</span>
                      <span className="text-gray-400 ml-auto">{packet.size} bytes</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Network, Wifi, WifiOff, AlertCircle } from "lucide-react"
import Link from "next/link"

interface ScanResult {
  port: number
  status: "open" | "closed" | "filtered"
  service: string
  version?: string
  vulnerability?: string
}

export function PortScanner() {
  const [target, setTarget] = useState("")
  const [scanning, setScanning] = useState(false)
  const [results, setResults] = useState<ScanResult[]>([])
  const [progress, setProgress] = useState(0)

  const commonPorts = [
    { port: 21, service: "FTP", version: "vsftpd 2.3.4", vulnerability: "Backdoor possible" },
    { port: 22, service: "SSH", version: "OpenSSH 7.4", vulnerability: null },
    { port: 23, service: "Telnet", version: "Linux telnetd", vulnerability: "Non chiffré - Critique" },
    { port: 25, service: "SMTP", version: "Postfix", vulnerability: null },
    { port: 80, service: "HTTP", version: "Apache 2.4.41", vulnerability: "Version obsolète" },
    { port: 443, service: "HTTPS", version: "nginx 1.18.0", vulnerability: null },
    { port: 3306, service: "MySQL", version: "5.7.33", vulnerability: "Accès externe exposé" },
    { port: 3389, service: "RDP", version: "Windows RDP", vulnerability: "Vulnérable à BlueKeep" },
    { port: 5432, service: "PostgreSQL", version: "12.5", vulnerability: null },
    { port: 8080, service: "HTTP-Proxy", version: "Tomcat 9.0", vulnerability: null },
  ]

  const simulateScan = async () => {
    if (!target) return

    setScanning(true)
    setResults([])
    setProgress(0)

    const scanResults: ScanResult[] = []

    for (let i = 0; i < commonPorts.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 400))

      const portInfo = commonPorts[i]
      const isOpen = Math.random() > 0.5

      scanResults.push({
        port: portInfo.port,
        status: isOpen ? "open" : Math.random() > 0.3 ? "closed" : "filtered",
        service: portInfo.service,
        version: isOpen ? portInfo.version : undefined,
        vulnerability: isOpen ? (portInfo.vulnerability ?? undefined) : undefined,
      })

      setResults([...scanResults])
      setProgress(((i + 1) / commonPorts.length) * 100)
    }

    setScanning(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "text-green-500"
      case "closed":
        return "text-red-500"
      case "filtered":
        return "text-yellow-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <Link href="/#projects">
        <Button variant="ghost" className="mb-6 text-cyan-400 hover:text-white hover:bg-cyan-400/20">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux projets
        </Button>
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
            <Network className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Simulateur de Scan de Ports</h1>
            <p className="text-gray-400">Découvrez les ports ouverts et les services exposés</p>
          </div>
        </div>
      </div>

      <Card className="bg-gray-900 border-cyan-500/30 p-8 mb-6">
        <div className="space-y-4">
          <div>
            <label className="text-white font-semibold mb-2 block">Cible du scan</label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="192.168.1.1 ou example.com"
                className="bg-gray-950 border-cyan-500/50 text-white focus:border-cyan-400"
                disabled={scanning}
              />
              <Button
                onClick={simulateScan}
                disabled={!target || scanning}
                className="bg-cyan-500 hover:bg-cyan-600 text-white min-w-32"
              >
                {scanning ? "Scan..." : "Scanner"}
              </Button>
            </div>
          </div>

          {scanning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Progression du scan</span>
                <span className="text-cyan-400">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-gray-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      {results.length > 0 && (
        <Card className="bg-gray-900 border-cyan-500/30 p-6">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Network className="w-6 h-6 text-cyan-400" />
            Résultats du scan ({results.filter((r) => r.status === "open").length} ports ouverts)
          </h2>

          <div className="space-y-2">
            {results.map((result) => (
              <div
                key={result.port}
                className="bg-gray-950 rounded-lg p-4 border border-cyan-500/20 hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {result.status === "open" ? (
                      <Wifi className="w-5 h-5 text-green-500" />
                    ) : (
                      <WifiOff className="w-5 h-5 text-red-500" />
                    )}
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-white font-mono font-bold">Port {result.port}</span>
                        <span className={`text-sm font-semibold ${getStatusColor(result.status)}`}>
                          {result.status.toUpperCase()}
                        </span>
                        <span className="text-gray-400">{result.service}</span>
                      </div>
                      {result.version && <p className="text-sm text-gray-400 mt-1">Version: {result.version}</p>}
                      {result.vulnerability && (
                        <div className="flex items-center gap-2 mt-2">
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-yellow-500 font-semibold">{result.vulnerability}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
            <p className="text-sm text-gray-400">
              <strong className="text-cyan-400">Note:</strong> Ceci est une simulation à but éducatif. Le scan de ports
              sur des systèmes sans autorisation est illégal.
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}

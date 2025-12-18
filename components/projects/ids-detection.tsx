"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowLeft, AlertTriangle, Activity, Eye } from "lucide-react"
import Link from "next/link"

export function IDSDetection() {
  const [monitoring, setMonitoring] = useState(false)
  const [alerts, setAlerts] = useState<any[]>([])
  const [stats, setStats] = useState({
    packetsAnalyzed: 0,
    alertsTriggered: 0,
    blockedIPs: 0,
  })

  const rules = [
    {
      id: 1,
      name: "Port Scan Detection",
      description: "Détecte les tentatives de scan de ports (Nmap, Masscan)",
      severity: "Haute",
      enabled: true,
      signature:
        "alert tcp any any -> $HOME_NET any (flags: S; threshold: type both, track by_src, count 20, seconds 10;)",
    },
    {
      id: 2,
      name: "SQL Injection Attempt",
      description: "Identifie les tentatives d'injection SQL dans les requêtes HTTP",
      severity: "Critique",
      enabled: true,
      signature: 'alert tcp any any -> $HOME_NET 80 (content: "UNION SELECT"; nocase; content: "FROM"; nocase;)',
    },
    {
      id: 3,
      name: "Brute Force SSH",
      description: "Détecte les attaques par force brute sur SSH",
      severity: "Haute",
      enabled: true,
      signature: "alert tcp any any -> $HOME_NET 22 (threshold: type both, track by_src, count 5, seconds 60;)",
    },
    {
      id: 4,
      name: "Suspicious Outbound Traffic",
      description: "Trafic sortant suspect vers des C&C connus",
      severity: "Critique",
      enabled: true,
      signature: 'alert tcp $HOME_NET any -> $EXTERNAL_NET [443,8080] (content: "/botnet";)',
    },
    {
      id: 5,
      name: "DDoS Attack Pattern",
      description: "Identifie les patterns d'attaque DDoS (SYN flood, UDP flood)",
      severity: "Critique",
      enabled: true,
      signature:
        "alert tcp any any -> $HOME_NET any (flags: S; threshold: type both, track by_dst, count 100, seconds 1;)",
    },
  ]

  const recentAlerts = [
    {
      timestamp: "2025-01-15 14:23:45",
      type: "Port Scan",
      source: "203.0.113.45",
      target: "192.168.1.10",
      severity: "Haute",
      action: "Blocked",
    },
    {
      timestamp: "2025-01-15 14:22:12",
      type: "SQL Injection",
      source: "198.51.100.78",
      target: "192.168.1.50:80",
      severity: "Critique",
      action: "Blocked",
    },
    {
      timestamp: "2025-01-15 14:20:33",
      type: "Brute Force SSH",
      source: "192.0.2.123",
      target: "192.168.1.10:22",
      severity: "Haute",
      action: "Blocked",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critique":
        return "text-red-500 border-red-500 bg-red-500/10"
      case "Haute":
        return "text-orange-500 border-orange-500 bg-orange-500/10"
      case "Moyenne":
        return "text-yellow-500 border-yellow-500 bg-yellow-500/10"
      default:
        return "text-blue-500 border-blue-500 bg-blue-500/10"
    }
  }

  useEffect(() => {
    if (monitoring) {
      const interval = setInterval(() => {
        setStats((prev) => ({
          packetsAnalyzed: prev.packetsAnalyzed + Math.floor(Math.random() * 1000) + 500,
          alertsTriggered: prev.alertsTriggered + Math.floor(Math.random() * 3),
          blockedIPs: prev.blockedIPs + Math.floor(Math.random() * 2),
        }))

        if (Math.random() > 0.7) {
          const newAlert = {
            timestamp: new Date().toLocaleString("fr-FR"),
            type: ["Port Scan", "SQL Injection", "Brute Force SSH", "DDoS Pattern"][Math.floor(Math.random() * 4)],
            source: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            target: `192.168.1.${Math.floor(Math.random() * 255)}`,
            severity: ["Critique", "Haute", "Moyenne"][Math.floor(Math.random() * 3)],
            action: "Blocked",
          }
          setAlerts((prev) => [newAlert, ...prev].slice(0, 10))
        }
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [monitoring])

  const handleStartMonitoring = () => {
    setMonitoring(true)
    setAlerts([])
    setStats({ packetsAnalyzed: 0, alertsTriggered: 0, blockedIPs: 0 })
  }

  const handleStopMonitoring = () => {
    setMonitoring(false)
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
              <Shield className="h-10 w-10 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2 text-cyan-400">Système de Détection d'Intrusion (IDS)</h1>
              <p className="text-gray-400">Formation BTS CIEL - 2024 • Snort + Monitoring réseau</p>
            </div>
          </div>

          <Card className="bg-[#1a1a1a] border-cyan-400/20 p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">Contexte du Projet</h3>
            <p className="text-gray-300 mb-4">
              Mise en place d'un système de détection d'intrusion basé sur Snort pour surveiller et analyser le trafic
              réseau en temps réel. Le projet inclut la configuration de règles personnalisées, l'intégration avec
              pfSense pour le blocage automatique, et la création d'un tableau de bord de monitoring avec ELK Stack.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-cyan-400">5</p>
                <p className="text-sm text-gray-400">Règles personnalisées</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-400">24/7</p>
                <p className="text-sm text-gray-400">Surveillance continue</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-400">98%</p>
                <p className="text-sm text-gray-400">Taux de détection</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-cyan-400">&lt;1s</p>
                <p className="text-sm text-gray-400">Temps de réaction</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-8">
          <Card className="bg-[#1a1a1a] border-cyan-400/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-cyan-400 flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Monitoring en Temps Réel
              </h3>
              <div className="flex gap-2">
                <Button
                  onClick={handleStartMonitoring}
                  disabled={monitoring}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Démarrer
                </Button>
                <Button
                  onClick={handleStopMonitoring}
                  disabled={!monitoring}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Arrêter
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-black/60 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cyan-400">{stats.packetsAnalyzed.toLocaleString()}</p>
                <p className="text-sm text-gray-400 mt-1">Paquets analysés</p>
              </div>
              <div className="bg-black/60 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-red-400">{stats.alertsTriggered}</p>
                <p className="text-sm text-gray-400 mt-1">Alertes déclenchées</p>
              </div>
              <div className="bg-black/60 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-orange-400">{stats.blockedIPs}</p>
                <p className="text-sm text-gray-400 mt-1">IPs bloquées</p>
              </div>
            </div>

            {monitoring && (
              <div className="bg-black/60 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-cyan-400" />
                  <h4 className="font-semibold text-white">Alertes Récentes</h4>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {alerts.map((alert, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-black/40 rounded text-sm">
                      <div className="flex items-center gap-3 flex-1">
                        <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">{alert.type}</p>
                          <p className="text-gray-400 text-xs">
                            {alert.source} → {alert.target}
                          </p>
                        </div>
                      </div>
                      <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                    </div>
                  ))}
                  {alerts.length === 0 && <p className="text-gray-500 text-center py-4">En attente d'alertes...</p>}
                </div>
              </div>
            )}
          </Card>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-cyan-400">Règles de Détection Configurées</h2>
        <div className="space-y-4 mb-8">
          {rules.map((rule) => (
            <Card key={rule.id} className="bg-[#1a1a1a] border-cyan-400/20 p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{rule.name}</h3>
                    <Badge className={getSeverityColor(rule.severity)}>{rule.severity}</Badge>
                    {rule.enabled && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Activée</Badge>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{rule.description}</p>
                  <div className="bg-black/60 rounded p-3 mt-2">
                    <code className="text-xs text-cyan-400 break-all">{rule.signature}</code>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-[#1a1a1a] border-cyan-400/20 p-6">
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">Architecture Technique</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-semibold min-w-[100px]">IDS:</span>
                <span className="text-gray-300">Snort 3.1.x en mode IDS/IPS</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-semibold min-w-[100px]">Firewall:</span>
                <span className="text-gray-300">pfSense avec intégration Snort</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-semibold min-w-[100px]">Logs:</span>
                <span className="text-gray-300">ELK Stack (Elasticsearch, Logstash, Kibana)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-semibold min-w-[100px]">Alertes:</span>
                <span className="text-gray-300">Email + Telegram via Barnyard2</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-semibold min-w-[100px]">Base règles:</span>
                <span className="text-gray-300">Snort Community + règles personnalisées</span>
              </div>
            </div>
          </Card>

          <Card className="bg-[#1a1a1a] border-cyan-400/20 p-6">
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">Tests de Validation</h3>
            <div className="space-y-3">
              {[
                "Simulation d'attaque Nmap",
                "Test d'injection SQL avec SQLMap",
                "Brute force SSH avec Hydra",
                "Scan de vulnérabilités avec Nessus",
                "Test de charge DDoS avec LOIC",
              ].map((test, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-black/40 rounded">
                  <Shield className="h-4 w-4 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{test}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="bg-[#1a1a1a] border-cyan-400/20 p-6">
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">Compétences Acquises</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Snort IDS/IPS",
              "pfSense",
              "Network Security",
              "ELK Stack",
              "Kibana Dashboards",
              "Rule Writing",
              "Threat Detection",
              "Log Analysis",
              "Incident Response",
              "Network Monitoring",
              "Packet Analysis",
              "Security Automation",
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

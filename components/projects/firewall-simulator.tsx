"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Shield, Plus, Trash2, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

interface FirewallRule {
  id: number
  name: string
  source: string
  destination: string
  port: string
  protocol: string
  action: "allow" | "deny"
}

interface TestResult {
  rule: FirewallRule
  matched: boolean
  action: "allow" | "deny"
}

export function FirewallSimulator() {
  const [rules, setRules] = useState<FirewallRule[]>([
    { id: 1, name: "Allow HTTPS", source: "any", destination: "any", port: "443", protocol: "TCP", action: "allow" },
    {
      id: 2,
      name: "Allow SSH",
      source: "192.168.1.0/24",
      destination: "any",
      port: "22",
      protocol: "TCP",
      action: "allow",
    },
    { id: 3, name: "Block Telnet", source: "any", destination: "any", port: "23", protocol: "TCP", action: "deny" },
  ])

  const [newRule, setNewRule] = useState({
    name: "",
    source: "",
    destination: "",
    port: "",
    protocol: "TCP",
    action: "allow" as "allow" | "deny",
  })

  const [testPacket, setTestPacket] = useState({
    source: "192.168.1.100",
    destination: "93.184.216.34",
    port: "443",
    protocol: "TCP",
  })

  const [testResult, setTestResult] = useState<TestResult | null>(null)

  const addRule = () => {
    if (!newRule.name || !newRule.source || !newRule.destination || !newRule.port) return

    setRules([...rules, { ...newRule, id: Date.now() }])
    setNewRule({ name: "", source: "", destination: "", port: "", protocol: "TCP", action: "allow" })
  }

  const deleteRule = (id: number) => {
    setRules(rules.filter((rule) => rule.id !== id))
  }

  const testFirewall = () => {
    for (const rule of rules) {
      const sourceMatch = rule.source === "any" || testPacket.source.startsWith(rule.source.split("/")[0])
      const destMatch = rule.destination === "any" || testPacket.destination === rule.destination
      const portMatch = rule.port === testPacket.port
      const protocolMatch = rule.protocol === testPacket.protocol

      if (sourceMatch && destMatch && portMatch && protocolMatch) {
        setTestResult({ rule, matched: true, action: rule.action })
        return
      }
    }

    setTestResult({
      rule: { id: 0, name: "Default Policy", source: "", destination: "", port: "", protocol: "", action: "deny" },
      matched: false,
      action: "deny",
    })
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
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Simulateur de Règles Firewall</h1>
            <p className="text-gray-400">Créez et testez des règles de pare-feu interactives</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card className="bg-gray-900 border-cyan-500/30 p-6">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Plus className="w-6 h-6 text-cyan-400" />
            Ajouter une règle
          </h2>

          <div className="space-y-3">
            <Input
              placeholder="Nom de la règle"
              value={newRule.name}
              onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
              className="bg-gray-950 border-cyan-500/50 text-white"
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Source (ex: 192.168.1.0/24)"
                value={newRule.source}
                onChange={(e) => setNewRule({ ...newRule, source: e.target.value })}
                className="bg-gray-950 border-cyan-500/50 text-white"
              />
              <Input
                placeholder="Destination (ex: any)"
                value={newRule.destination}
                onChange={(e) => setNewRule({ ...newRule, destination: e.target.value })}
                className="bg-gray-950 border-cyan-500/50 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Port (ex: 443)"
                value={newRule.port}
                onChange={(e) => setNewRule({ ...newRule, port: e.target.value })}
                className="bg-gray-950 border-cyan-500/50 text-white"
              />
              <Select value={newRule.protocol} onValueChange={(value) => setNewRule({ ...newRule, protocol: value })}>
                <SelectTrigger className="bg-gray-950 border-cyan-500/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TCP">TCP</SelectItem>
                  <SelectItem value="UDP">UDP</SelectItem>
                  <SelectItem value="ICMP">ICMP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Select
              value={newRule.action}
              onValueChange={(value: "allow" | "deny") => setNewRule({ ...newRule, action: value })}
            >
              <SelectTrigger className="bg-gray-950 border-cyan-500/50 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="allow">Autoriser</SelectItem>
                <SelectItem value="deny">Bloquer</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={addRule} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter la règle
            </Button>
          </div>
        </Card>

        <Card className="bg-gray-900 border-cyan-500/30 p-6">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-cyan-400" />
            Tester un paquet
          </h2>

          <div className="space-y-3">
            <Input
              placeholder="IP Source"
              value={testPacket.source}
              onChange={(e) => setTestPacket({ ...testPacket, source: e.target.value })}
              className="bg-gray-950 border-cyan-500/50 text-white"
            />
            <Input
              placeholder="IP Destination"
              value={testPacket.destination}
              onChange={(e) => setTestPacket({ ...testPacket, destination: e.target.value })}
              className="bg-gray-950 border-cyan-500/50 text-white"
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Port"
                value={testPacket.port}
                onChange={(e) => setTestPacket({ ...testPacket, port: e.target.value })}
                className="bg-gray-950 border-cyan-500/50 text-white"
              />
              <Select
                value={testPacket.protocol}
                onValueChange={(value) => setTestPacket({ ...testPacket, protocol: value })}
              >
                <SelectTrigger className="bg-gray-950 border-cyan-500/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TCP">TCP</SelectItem>
                  <SelectItem value="UDP">UDP</SelectItem>
                  <SelectItem value="ICMP">ICMP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={testFirewall} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
              Tester le paquet
            </Button>
          </div>

          {testResult && (
            <div
              className={`mt-4 p-4 rounded-lg border-2 ${testResult.action === "allow" ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500"}`}
            >
              <div className="flex items-center gap-2 mb-2">
                {testResult.action === "allow" ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
                <h3
                  className={`text-lg font-bold ${testResult.action === "allow" ? "text-green-500" : "text-red-500"}`}
                >
                  {testResult.action === "allow" ? "PAQUET AUTORISÉ" : "PAQUET BLOQUÉ"}
                </h3>
              </div>
              <p className="text-sm text-[#b0b0b0]">
                Règle appliquée: <span className="text-white font-semibold">{testResult.rule.name}</span>
              </p>
            </div>
          )}
        </Card>
      </div>

      <Card className="bg-gray-900 border-cyan-500/30 p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Règles actuelles ({rules.length})</h2>

        <div className="space-y-2">
          {rules.map((rule, index) => (
            <div
              key={rule.id}
              className="bg-gray-950 rounded-lg p-4 border border-cyan-500/20 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-gray-400 text-sm font-mono">#{index + 1}</span>
                    <span className="text-white font-semibold">{rule.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${rule.action === "allow" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}
                    >
                      {rule.action === "allow" ? "AUTORISER" : "BLOQUER"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>
                      Source: <span className="text-white font-mono">{rule.source}</span>
                    </span>
                    <span className="text-cyan-400">→</span>
                    <span>
                      Dest: <span className="text-white font-mono">{rule.destination}</span>
                    </span>
                    <span>
                      Port: <span className="text-white font-mono">{rule.port}</span>
                    </span>
                    <span>
                      Proto: <span className="text-white font-mono">{rule.protocol}</span>
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteRule(rule.id)}
                  className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

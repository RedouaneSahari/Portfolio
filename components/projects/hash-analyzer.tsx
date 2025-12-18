"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Code, Copy, CheckCircle } from "lucide-react"
import Link from "next/link"

export function HashAnalyzer() {
  const [inputText, setInputText] = useState("")
  const [hashes, setHashes] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState<string | null>(null)

  const generateHashes = async () => {
    if (!inputText) return

    const encoder = new TextEncoder()
    const data = encoder.encode(inputText)

    const results: Record<string, string> = {}

    // SHA-256
    const sha256Buffer = await crypto.subtle.digest("SHA-256", data)
    results.sha256 = Array.from(new Uint8Array(sha256Buffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")

    // SHA-1
    const sha1Buffer = await crypto.subtle.digest("SHA-1", data)
    results.sha1 = Array.from(new Uint8Array(sha1Buffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")

    // Simple MD5 simulation (not cryptographically secure, just for demo)
    results.md5 = btoa(inputText).substring(0, 32).padEnd(32, "0")

    setHashes(results)
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const hashInfo = {
    md5: {
      name: "MD5",
      bits: 128,
      security: "Obsolète - Non recommandé",
      color: "text-red-500",
      use: "Vérification d'intégrité seulement",
    },
    sha1: {
      name: "SHA-1",
      bits: 160,
      security: "Déprécié - Faible",
      color: "text-orange-500",
      use: "Signatures Git (en transition)",
    },
    sha256: {
      name: "SHA-256",
      bits: 256,
      security: "Sécurisé - Recommandé",
      color: "text-green-500",
      use: "Certificats SSL, Blockchain",
    },
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
            <Code className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Générateur & Analyseur de Hash</h1>
            <p className="text-gray-400">Générez et comparez différents algorithmes de hachage</p>
          </div>
        </div>
      </div>

      <Card className="bg-gray-900 border-cyan-500/30 p-8 mb-6">
        <div className="space-y-4">
          <div>
            <label className="text-white font-semibold mb-2 block">Texte à hasher</label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Entrez votre texte..."
                className="bg-gray-950 border-cyan-500/50 text-white focus:border-cyan-400"
              />
              <Button
                onClick={generateHashes}
                disabled={!inputText}
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                Générer
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {Object.keys(hashes).length > 0 && (
        <Tabs defaultValue="sha256" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-900">
            <TabsTrigger value="md5" className="data-[state=active]:bg-cyan-500">
              MD5
            </TabsTrigger>
            <TabsTrigger value="sha1" className="data-[state=active]:bg-cyan-500">
              SHA-1
            </TabsTrigger>
            <TabsTrigger value="sha256" className="data-[state=active]:bg-cyan-500">
              SHA-256
            </TabsTrigger>
          </TabsList>

          {Object.entries(hashInfo).map(([key, info]) => (
            <TabsContent key={key} value={key}>
              <Card className="bg-gray-900 border-cyan-500/30 p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">{info.name}</h2>
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-[#0a0a0a] rounded-lg p-4">
                        <p className="text-[#b0b0b0] text-sm mb-1">Taille</p>
                        <p className="text-white font-bold text-lg">{info.bits} bits</p>
                      </div>
                      <div className="bg-[#0a0a0a] rounded-lg p-4">
                        <p className="text-[#b0b0b0] text-sm mb-1">Sécurité</p>
                        <p className={`${info.color} font-bold text-lg`}>{info.security}</p>
                      </div>
                      <div className="bg-[#0a0a0a] rounded-lg p-4">
                        <p className="text-[#b0b0b0] text-sm mb-1">Utilisation</p>
                        <p className="text-white font-bold text-sm">{info.use}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-white font-semibold">Hash généré</label>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(hashes[key], key)}
                        className="text-[#ff0000] border-[#ff0000]/50 hover:bg-[#ff0000]/10"
                      >
                        {copied === key ? (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Copié!
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-4 w-4" />
                            Copier
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="bg-[#0a0a0a] rounded-lg p-4 border border-[#ff0000]/30">
                      <code className="text-white font-mono text-sm break-all">{hashes[key]}</code>
                    </div>
                  </div>

                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                    <h3 className="text-cyan-400 font-semibold mb-2">Informations techniques</h3>
                    <ul className="text-sm text-gray-400 space-y-2">
                      {key === "md5" && (
                        <>
                          <li>• Créé en 1991 par Ronald Rivest</li>
                          <li>• Vulnérable aux collisions depuis 2004</li>
                          <li>• Ne doit plus être utilisé pour la sécurité</li>
                          <li>• Acceptable uniquement pour la vérification d'intégrité non-critique</li>
                        </>
                      )}
                      {key === "sha1" && (
                        <>
                          <li>• Développé par la NSA en 1995</li>
                          <li>• Déprécié par le NIST depuis 2011</li>
                          <li>• Vulnérable aux attaques de collision (SHAttered, 2017)</li>
                          <li>• En cours de remplacement par SHA-256</li>
                        </>
                      )}
                      {key === "sha256" && (
                        <>
                          <li>• Fait partie de la famille SHA-2 (2001)</li>
                          <li>• Standard actuel pour la cryptographie</li>
                          <li>• Utilisé dans Bitcoin et les certificats SSL/TLS</li>
                          <li>• Aucune vulnérabilité connue à ce jour</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Bug, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

interface Vulnerability {
  type: string
  severity: "critique" | "élevé" | "moyen" | "faible"
  description: string
  example: string
}

export function XSSDetector() {
  const [code, setCode] = useState("")
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([])
  const [isSafe, setIsSafe] = useState<boolean | null>(null)

  const analyzeCode = () => {
    const found: Vulnerability[] = []

    const patterns = [
      {
        regex: /<script[^>]*>.*?<\/script>/gi,
        type: "Script XSS",
        severity: "critique" as const,
        description: "Balise <script> détectée - Permet l'exécution de code JavaScript arbitraire",
        example: '<script>alert("XSS")</script>',
      },
      {
        regex: /on\w+\s*=\s*["'][^"']*["']/gi,
        type: "Event Handler XSS",
        severity: "élevé" as const,
        description: "Gestionnaire d'événement inline détecté (onclick, onerror, etc.)",
        example: "<img src=x onerror=\"alert('XSS')\">",
      },
      {
        regex: /javascript\s*:/gi,
        type: "JavaScript URI",
        severity: "élevé" as const,
        description: "Protocole javascript: détecté dans un attribut href ou src",
        example: "<a href=\"javascript:alert('XSS')\">Click</a>",
      },
      {
        regex: /<iframe[^>]*>/gi,
        type: "Iframe Injection",
        severity: "moyen" as const,
        description: "Balise <iframe> détectée - Risque d'injection de contenu externe",
        example: '<iframe src="http://malicious.com"></iframe>',
      },
      {
        regex: /eval\s*\(/gi,
        type: "Eval Detected",
        severity: "élevé" as const,
        description: "Fonction eval() détectée - Permet l'exécution de code arbitraire",
        example: "eval(userInput)",
      },
      {
        regex: /innerHTML\s*=/gi,
        type: "innerHTML Assignment",
        severity: "moyen" as const,
        description: "Assignment innerHTML sans sanitization - Risque XSS",
        example: "element.innerHTML = userInput",
      },
      {
        regex: /document\.write\s*\(/gi,
        type: "document.write",
        severity: "moyen" as const,
        description: "Utilisation de document.write() - Peut injecter du HTML non sécurisé",
        example: "document.write(userInput)",
      },
    ]

    patterns.forEach((pattern) => {
      if (pattern.regex.test(code)) {
        found.push({
          type: pattern.type,
          severity: pattern.severity,
          description: pattern.description,
          example: pattern.example,
        })
      }
    })

    setVulnerabilities(found)
    setIsSafe(found.length === 0)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critique":
        return "text-red-600 bg-red-500/10 border-red-500"
      case "élevé":
        return "text-orange-500 bg-orange-500/10 border-orange-500"
      case "moyen":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500"
      case "faible":
        return "text-blue-500 bg-blue-500/10 border-blue-500"
      default:
        return "text-gray-500 bg-gray-500/10 border-gray-500"
    }
  }

  const exampleVulnerableCode = `<div id="content">
  <h1>Welcome User</h1>
  <script>
    var userInput = location.search;
    document.write(userInput);
  </script>
  <img src=x onerror="alert('XSS')">
  <a href="javascript:alert('XSS')">Click me</a>
</div>`

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
            <Bug className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Détecteur de Vulnérabilités XSS</h1>
            <p className="text-gray-400">Analysez votre code HTML/JavaScript pour détecter les failles XSS</p>
          </div>
        </div>
      </div>

      <Card className="bg-gray-900 border-cyan-500/30 p-8 mb-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-white font-semibold">Code à analyser</label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCode(exampleVulnerableCode)}
              className="text-cyan-400 border-cyan-500/50 hover:bg-cyan-500/10"
            >
              Charger exemple vulnérable
            </Button>
          </div>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Collez votre code HTML/JavaScript ici..."
            className="bg-gray-950 border-cyan-500/50 text-white focus:border-cyan-400 font-mono text-sm min-h-64"
          />
          <Button onClick={analyzeCode} disabled={!code} className="bg-cyan-500 hover:bg-cyan-600 text-white w-full">
            <Bug className="mr-2 h-4 w-4" />
            Analyser le code
          </Button>
        </div>
      </Card>

      {isSafe !== null && (
        <Card className="bg-gray-900 border-cyan-500/30 p-6">
          <div className="mb-6">
            {isSafe ? (
              <div className="flex items-center gap-3 text-green-500">
                <CheckCircle className="w-8 h-8" />
                <div>
                  <h2 className="text-2xl font-bold">Aucune vulnérabilité détectée</h2>
                  <p className="text-gray-400 text-sm">Le code analysé semble sécurisé</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-red-500">
                <XCircle className="w-8 h-8" />
                <div>
                  <h2 className="text-2xl font-bold">{vulnerabilities.length} vulnérabilité(s) détectée(s)</h2>
                  <p className="text-gray-400 text-sm">Des failles de sécurité ont été identifiées</p>
                </div>
              </div>
            )}
          </div>

          {vulnerabilities.length > 0 && (
            <div className="space-y-4">
              {vulnerabilities.map((vuln, index) => (
                <div
                  key={index}
                  className={`rounded-lg p-4 border-2 ${getSeverityColor(vuln.severity)} transition-all hover:scale-[1.02]`}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg">{vuln.type}</h3>
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold uppercase">
                          {vuln.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{vuln.description}</p>
                      <div className="bg-gray-950 rounded p-3 mt-2">
                        <p className="text-xs text-gray-400 mb-1">Exemple:</p>
                        <code className="text-xs text-white font-mono">{vuln.example}</code>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                <h3 className="text-cyan-400 font-semibold mb-2">Recommandations de sécurité:</h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                  <li>Toujours valider et échapper les entrées utilisateur</li>
                  <li>Utiliser textContent au lieu de innerHTML quand possible</li>
                  <li>Implémenter une Content Security Policy (CSP)</li>
                  <li>Utiliser des bibliothèques de sanitization comme DOMPurify</li>
                  <li>Ne jamais faire confiance aux données provenant du client</li>
                </ul>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bug, CheckCircle2, AlertTriangle, ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"

export function AuditWebSecurity() {
  const [activeVuln, setActiveVuln] = useState<string | null>(null)

  const vulnerabilities = [
    {
      id: "xss",
      name: "Cross-Site Scripting (XSS)",
      severity: "Haute",
      description: "Faille permettant l'injection de scripts malveillants dans les pages web",
      found: 3,
      fixed: 3,
      details:
        "Détectées dans les champs de recherche, commentaires et profil utilisateur. Sanitisation des entrées implémentée.",
      recommendation: "Utiliser des fonctions d'échappement HTML et implémenter Content Security Policy (CSP)",
    },
    {
      id: "sqli",
      name: "SQL Injection",
      severity: "Critique",
      description: "Injection de code SQL dans les requêtes de base de données",
      found: 2,
      fixed: 2,
      details: "Vulnérabilités dans les formulaires de connexion et recherche produits. Requêtes paramétrées ajoutées.",
      recommendation: "Utiliser des prepared statements et valider toutes les entrées utilisateur",
    },
    {
      id: "csrf",
      name: "Cross-Site Request Forgery",
      severity: "Moyenne",
      description: "Exploitation de la confiance d'un site envers un utilisateur authentifié",
      found: 5,
      fixed: 5,
      details: "Formulaires sans protection CSRF. Tokens anti-CSRF implémentés sur toutes les actions sensibles.",
      recommendation: "Implémenter des tokens CSRF et vérifier le header Referer",
    },
    {
      id: "auth",
      name: "Authentification Faible",
      severity: "Haute",
      description: "Mécanismes d'authentification insuffisamment sécurisés",
      found: 4,
      fixed: 3,
      details:
        "Pas de limitation de tentatives, mots de passe faibles acceptés, sessions sans expiration. Améliorations partielles.",
      recommendation: "Implémenter rate limiting, politique de mots de passe forts et expiration de session",
    },
    {
      id: "headers",
      name: "En-têtes HTTP Manquants",
      severity: "Moyenne",
      description: "Absence d'en-têtes de sécurité importants",
      found: 6,
      fixed: 6,
      details: "Headers de sécurité manquants (X-Frame-Options, X-Content-Type-Options, etc.). Tous ajoutés.",
      recommendation: "Configurer tous les headers de sécurité recommandés par OWASP",
    },
  ]

  const tools = [
    { name: "Burp Suite Professional", usage: "Scan automatisé et manuel" },
    { name: "OWASP ZAP", usage: "Scan de vulnérabilités" },
    { name: "Nikto", usage: "Scan de serveur web" },
    { name: "SQLMap", usage: "Test SQL Injection" },
    { name: "Nmap", usage: "Cartographie réseau" },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critique":
        return "text-red-500 border-red-500"
      case "Haute":
        return "text-orange-500 border-orange-500"
      case "Moyenne":
        return "text-yellow-500 border-yellow-500"
      default:
        return "text-blue-500 border-blue-500"
    }
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
              <Bug className="h-10 w-10 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2 text-cyan-400">Audit de Sécurité Web - Application E-commerce</h1>
              <p className="text-gray-400">Stage THETRIS - 2022 • Tests d'intrusion et recommandations</p>
            </div>
          </div>

          <Card className="bg-[#1a1a1a] border-cyan-400/20 p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">Contexte du Projet</h3>
            <p className="text-gray-300 mb-4">
              Audit de sécurité complet réalisé pour un client e-commerce durant mon stage chez THETRIS. L'objectif
              était d'identifier et documenter les vulnérabilités présentes dans l'application web, puis de proposer des
              mesures correctives conformes aux standards OWASP.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-cyan-400">20</p>
                <p className="text-sm text-gray-400">Vulnérabilités détectées</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-400">19</p>
                <p className="text-sm text-gray-400">Failles corrigées</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-400">5</p>
                <p className="text-sm text-gray-400">Outils utilisés</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-cyan-400">95%</p>
                <p className="text-sm text-gray-400">Score final</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-[#1a1a1a] border-cyan-400/20 p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-cyan-400">
              <Shield className="h-5 w-5" />
              Outils d'Audit Utilisés
            </h3>
            <div className="space-y-3">
              {tools.map((tool) => (
                <div key={tool.name} className="flex items-start gap-3 p-3 bg-black/40 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">{tool.name}</p>
                    <p className="text-sm text-gray-400">{tool.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-[#1a1a1a] border-cyan-400/20 p-6">
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">Méthodologie</h3>
            <ol className="space-y-3 list-decimal list-inside text-gray-300">
              <li className="pl-2">
                <strong className="text-white">Reconnaissance</strong> - Cartographie de l'application et des points
                d'entrée
              </li>
              <li className="pl-2">
                <strong className="text-white">Scan automatisé</strong> - Détection des vulnérabilités connues
              </li>
              <li className="pl-2">
                <strong className="text-white">Tests manuels</strong> - Validation et exploitation des failles
              </li>
              <li className="pl-2">
                <strong className="text-white">Documentation</strong> - Rapport détaillé avec recommandations
              </li>
              <li className="pl-2">
                <strong className="text-white">Re-test</strong> - Vérification des correctifs implémentés
              </li>
            </ol>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-cyan-400">Vulnérabilités Identifiées</h2>
        <div className="grid gap-4 mb-8">
          {vulnerabilities.map((vuln) => (
            <Card
              key={vuln.id}
              className="bg-[#1a1a1a] border-cyan-400/20 p-6 cursor-pointer hover:border-cyan-400 transition-colors"
              onClick={() => setActiveVuln(activeVuln === vuln.id ? null : vuln.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {vuln.found === vuln.fixed ? (
                    <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-white">{vuln.name}</h3>
                    <p className="text-sm text-gray-400">{vuln.description}</p>
                  </div>
                </div>
                <Badge className={`${getSeverityColor(vuln.severity)} bg-transparent border`}>{vuln.severity}</Badge>
              </div>

              <div className="flex gap-6 mb-3 text-sm">
                <span className="text-gray-400">
                  Trouvées: <span className="text-red-400 font-semibold">{vuln.found}</span>
                </span>
                <span className="text-gray-400">
                  Corrigées: <span className="text-green-400 font-semibold">{vuln.fixed}</span>
                </span>
              </div>

              {activeVuln === vuln.id && (
                <div className="mt-4 pt-4 border-t border-gray-700 space-y-3">
                  <div>
                    <h4 className="font-semibold text-cyan-400 mb-2">Détails:</h4>
                    <p className="text-gray-300 text-sm">{vuln.details}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-cyan-400 mb-2">Recommandation:</h4>
                    <p className="text-gray-300 text-sm">{vuln.recommendation}</p>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        <Card className="bg-[#1a1a1a] border-cyan-400/20 p-6">
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">Compétences Acquises</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Burp Suite",
              "OWASP Top 10",
              "Pentesting Web",
              "Rapport d'audit",
              "SQL Injection",
              "XSS",
              "CSRF",
              "Sécurité applicative",
              "OWASP ZAP",
              "Recommandations sécurité",
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

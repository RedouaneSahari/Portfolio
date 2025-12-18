"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Lock, Check, X, AlertTriangle } from "lucide-react"
import Link from "next/link"

export function PasswordStrengthAnalyzer() {
  const [password, setPassword] = useState("")
  const [analysis, setAnalysis] = useState<any>(null)

  const analyzePassword = () => {
    const length = password.length
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const hasCommonPatterns = /(123|abc|password|admin|qwerty)/i.test(password)

    let score = 0
    let strength = ""
    let color = ""

    if (length >= 8) score += 20
    if (length >= 12) score += 10
    if (hasUpperCase) score += 20
    if (hasLowerCase) score += 20
    if (hasNumbers) score += 15
    if (hasSpecialChars) score += 15
    if (hasCommonPatterns) score -= 30

    if (score < 30) {
      strength = "Très Faible"
      color = "#ef4444"
    } else if (score < 50) {
      strength = "Faible"
      color = "#f97316"
    } else if (score < 70) {
      strength = "Moyen"
      color = "#eab308"
    } else if (score < 90) {
      strength = "Fort"
      color = "#22d3ee"
    } else {
      strength = "Très Fort"
      color = "#06b6d4"
    }

    const entropy = Math.log2(Math.pow(95, length))
    const timeToCrack =
      entropy < 30
        ? "Quelques secondes"
        : entropy < 50
          ? "Quelques heures"
          : entropy < 70
            ? "Quelques jours"
            : entropy < 90
              ? "Quelques années"
              : "Plusieurs siècles"

    setAnalysis({
      score: Math.max(0, Math.min(100, score)),
      strength,
      color,
      checks: {
        length: length >= 8,
        uppercase: hasUpperCase,
        lowercase: hasLowerCase,
        numbers: hasNumbers,
        special: hasSpecialChars,
        noCommon: !hasCommonPatterns,
      },
      entropy: entropy.toFixed(1),
      timeToCrack,
    })
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/#projects">
        <Button variant="ghost" className="mb-6 text-cyan-400 hover:text-white hover:bg-cyan-400/20">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux projets
        </Button>
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Analyseur de Mot de Passe</h1>
            <p className="text-gray-400">Testez la force de votre mot de passe en temps réel</p>
          </div>
        </div>
      </div>

      <Card className="bg-gray-900 border-cyan-500/30 p-8">
        <div className="space-y-6">
          <div>
            <label className="text-white font-semibold mb-2 block">Entrez un mot de passe à analyser</label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe..."
                className="bg-gray-950 border-cyan-500/50 text-white focus:border-cyan-400"
              />
              <Button
                onClick={analyzePassword}
                disabled={!password}
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                Analyser
              </Button>
            </div>
          </div>

          {analysis && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white font-semibold">Force du mot de passe:</span>
                  <span className="font-bold" style={{ color: analysis.color }}>
                    {analysis.strength}
                  </span>
                </div>
                <Progress value={analysis.score} className="h-3" style={{ backgroundColor: "#0a0a14" }}>
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{ width: `${analysis.score}%`, backgroundColor: analysis.color }}
                  />
                </Progress>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-cyan-400 font-semibold mb-3">Critères de sécurité</h3>
                  <div className="space-y-2">
                    {Object.entries({
                      length: "Au moins 8 caractères",
                      uppercase: "Lettres majuscules",
                      lowercase: "Lettres minuscules",
                      numbers: "Chiffres",
                      special: "Caractères spéciaux",
                      noCommon: "Pas de patterns communs",
                    }).map(([key, label]) => (
                      <div key={key} className="flex items-center gap-2 text-sm">
                        {analysis.checks[key] ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <X className="w-4 h-4 text-red-500" />
                        )}
                        <span className={analysis.checks[key] ? "text-green-500" : "text-red-500"}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-cyan-400 font-semibold mb-3">Analyse technique</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Entropie:</span>
                      <span className="text-white font-mono">{analysis.entropy} bits</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Longueur:</span>
                      <span className="text-white font-mono">{password.length} caractères</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Temps estimé pour craquer:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        <span className="text-yellow-500 font-semibold">{analysis.timeToCrack}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-950 rounded-lg p-4 border border-cyan-500/30">
                <h3 className="text-cyan-400 font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Recommandations
                </h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  {!analysis.checks.length && <li>• Utilisez au moins 12 caractères</li>}
                  {!analysis.checks.uppercase && <li>• Ajoutez des lettres majuscules</li>}
                  {!analysis.checks.lowercase && <li>• Ajoutez des lettres minuscules</li>}
                  {!analysis.checks.numbers && <li>• Incluez des chiffres</li>}
                  {!analysis.checks.special && <li>• Utilisez des caractères spéciaux (!@#$%^&*)</li>}
                  {!analysis.checks.noCommon && <li>• Évitez les mots courants et patterns prévisibles</li>}
                </ul>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

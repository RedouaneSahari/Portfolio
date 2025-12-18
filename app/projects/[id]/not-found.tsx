import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <AlertTriangle className="w-16 h-16 text-[#ff0000] mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-white mb-2">Projet introuvable</h1>
        <p className="text-[#b0b0b0] mb-6">Le projet que vous cherchez n'existe pas.</p>
        <Link href="/#projects">
          <Button className="bg-[#ff0000] hover:bg-[#cc0000] text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux projets
          </Button>
        </Link>
      </div>
    </div>
  )
}

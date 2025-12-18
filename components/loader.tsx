"use client"

import { useEffect, useState } from "react"

export function Loader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a1628] transition-opacity duration-500">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#2a3544] border-t-[#00d9ff]" />
    </div>
  )
}

"use client"
import { useEffect } from "react"

export default function DebugLayoutLog() {
  useEffect(() => {
    console.log("✅ login layout loaded")
  }, [])

  return null
}

"use client"

import { useState } from "react"
import { Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LoginProps {
  onLoginSuccess: () => void
}

const VALID_USERNAME = "CamperNordest11"
const VALID_PASSWORD = "CamperNordest11"

export function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate auth delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      console.log("[v0] Login successful")
      localStorage.setItem("auth_token", "authenticated")
      onLoginSuccess()
    } else {
      setError("Usuario o contraseña incorrectos")
      setPassword("")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header with logo area */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-6">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-xl"
              style={{
                background: "oklch(0.68 0.15 185 / 0.12)",
                border: "1px solid oklch(0.68 0.15 185 / 0.3)",
              }}
            >
              <span className="text-3xl font-bold text-primary">V</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Camper Nordest</h1>
          <p className="text-sm text-muted-foreground">Panel de Control IA</p>
        </div>

        {/* Login form card */}
        <div
          className="rounded-xl border p-8 backdrop-blur-sm"
          style={{
            background: "oklch(0.14 0.006 220 / 0.5)",
            borderColor: "oklch(0.22 0.008 220)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username field */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-foreground">
                Usuario
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="CamperNordest11"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  className="pl-10 bg-secondary text-foreground placeholder:text-muted-foreground border-border focus:border-primary focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="pl-10 bg-secondary text-foreground placeholder:text-muted-foreground border-border focus:border-primary focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div
                className="rounded-lg border p-3 text-sm"
                style={{
                  background: "oklch(0.55 0.22 27 / 0.1)",
                  borderColor: "oklch(0.55 0.22 27 / 0.3)",
                  color: "oklch(0.55 0.22 27)",
                }}
              >
                {error}
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium h-10 mt-6"
            >
              {isLoading ? "Autenticando..." : "Acceder"}
            </Button>
          </form>

          {/* Footer text */}
          <p className="text-center text-xs text-muted-foreground mt-6 pt-6 border-t border-border">
            Sistema seguro de Camper Nordest
          </p>
        </div>
      </div>
    </div>
  )
}

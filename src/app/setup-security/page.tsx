"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { auth } from "@/lib/auth"

export default function SetupSecurityPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [securityQuestion, setSecurityQuestion] = useState("")
  const [securityAnswer, setSecurityAnswer] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      const user = await auth.getCurrentUser()
      if (!user) {
        throw new Error("User not found")
      }

      const result = await auth.setSecurityQuestion(user.email, securityQuestion, securityAnswer)
      if (result.success) {
        setSuccess("Security question set successfully.")
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } else {
        setError(result.error || "An error occurred while setting the security question")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Setup Security Question</CardTitle>
          <CardDescription className="text-center">
            This will help you recover your account if you forget your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="security-question">Security Question</Label>
              <Input
                id="security-question"
                value={securityQuestion}
                onChange={(e) => setSecurityQuestion(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="security-answer">Answer</Label>
              <Input
                id="security-answer"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Setting up...
                </>
              ) : (
                "Set Security Question"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


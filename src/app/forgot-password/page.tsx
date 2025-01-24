"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { auth } from "@/lib/auth"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [email, setEmail] = useState("")
  const [otp, setOTP] = useState("")
  const [securityQuestion, setSecurityQuestion] = useState("")
  const [securityAnswer, setSecurityAnswer] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [resendDisabled, setResendDisabled] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
    } else {
      setResendDisabled(false)
    }
    return () => clearTimeout(timer)
  }, [resendTimer])

  const handleSendOTP = async (resend = false) => {
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      const result = await auth.sendPasswordResetOTP(email)
      if (result.success) {
        setSuccess(
          resend
            ? "OTP resent successfully. Please check your email."
            : "OTP sent successfully. Please check your email.",
        )
        setOtpSent(true)
        setResendDisabled(true)
        setResendTimer(60) // Disable resend for 60 seconds
      } else {
        setError(result.error || "An error occurred while sending OTP")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      const result = await auth.verifyOTP(email, otp)
      if (result.success) {
        setSuccess("OTP verified successfully.")
        router.push(`/reset-password?email=${encodeURIComponent(email)}&method=otp`)
      } else {
        setError(result.error || "Invalid OTP")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSecurityQuestion = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      const questionResult = await auth.getSecurityQuestion(email)
      if (questionResult.success) {
        setSecurityQuestion(questionResult.question || "")
        setSuccess("Security question retrieved. Please answer to proceed.")
      } else {
        setError(questionResult.error || "An error occurred while retrieving the security question")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifySecurityAnswer = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      const result = await auth.verifySecurityAnswer(email, securityAnswer)
      if (result.success) {
        setSuccess("Security answer verified. You can now reset your password.")
        router.push(`/reset-password?email=${encodeURIComponent(email)}&method=security`)
      } else {
        setError(result.error || "Incorrect security answer")
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
          <CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
          <CardDescription className="text-center">Choose a method to reset your password</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="otp" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="otp">Email OTP</TabsTrigger>
              <TabsTrigger value="security">Security Question</TabsTrigger>
            </TabsList>
            <TabsContent value="otp">
              <form onSubmit={handleVerifyOTP} className="space-y-4">
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
                  <Label htmlFor="email-otp">Email</Label>
                  <Input
                    id="email-otp"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading || otpSent}
                  />
                </div>

                {!otpSent && (
                  <Button type="button" className="w-full" onClick={() => handleSendOTP()} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      "Send OTP"
                    )}
                  </Button>
                )}

                {otpSent && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="otp">OTP</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter OTP"
                        required
                        value={otp}
                        onChange={(e) => setOTP(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying OTP...
                        </>
                      ) : (
                        "Verify OTP"
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => handleSendOTP(true)}
                      disabled={isLoading || resendDisabled}
                    >
                      {resendDisabled ? `Resend OTP (${resendTimer}s)` : "Resend OTP"}
                    </Button>
                  </>
                )}
              </form>
            </TabsContent>
            <TabsContent value="security">
              <form
                onSubmit={securityQuestion ? handleVerifySecurityAnswer : handleSecurityQuestion}
                className="space-y-4"
              >
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
                  <Label htmlFor="email-security">Email</Label>
                  <Input
                    id="email-security"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading || !!securityQuestion}
                  />
                </div>

                {securityQuestion && (
                  <div className="space-y-2">
                    <Label htmlFor="security-answer">{securityQuestion}</Label>
                    <Input
                      id="security-answer"
                      type="text"
                      required
                      value={securityAnswer}
                      onChange={(e) => setSecurityAnswer(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {securityQuestion ? "Verifying Answer..." : "Retrieving Question..."}
                    </>
                  ) : securityQuestion ? (
                    "Verify Answer"
                  ) : (
                    "Get Security Question"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/login" className="text-sm text-primary hover:underline">
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}


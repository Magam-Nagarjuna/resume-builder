"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from "@/lib/auth"
import { Loader2, Eye, Pencil, Trash2 } from "lucide-react"
import { ResumePreview } from "@/components/resume-preview"

export default function SavedResumesPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [savedResumes, setSavedResumes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [previewResume, setPreviewResume] = useState<any>(null)

  useEffect(() => {
    const fetchUserAndResumes = async () => {
      setIsLoading(true)
      try {
        const currentUser = await auth.getCurrentUser()
        setUser(currentUser)
        const resumes = await auth.getSavedResumes()
        setSavedResumes(resumes)
      } catch (error) {
        console.error("Error fetching user data:", error)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserAndResumes()
  }, [router])

  const handleViewResume = (resume: any) => {
    setPreviewResume(resume)
  }

  const handleEditResume = (id: string) => {
    router.push(`/editor/${id}`)
  }

  const handleDeleteResume = async (id: string) => {
    try {
      // In a real app, you would call an API to delete the resume
      const updatedResumes = savedResumes.filter((resume) => resume.id !== id)
      setSavedResumes(updatedResumes)

      // Update the user object in sessionStorage
      const currentUser = await auth.getCurrentUser()
      if (currentUser) {
        currentUser.savedResumes = updatedResumes
        sessionStorage.setItem("user", JSON.stringify(currentUser))
      }
    } catch (error) {
      console.error("Error deleting resume:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    router.push("/login")
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Saved Resumes</h1>
        {savedResumes.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">You haven't saved any resumes yet.</p>
              <Button className="mt-4" onClick={() => router.push("/dashboard")}>
                Create a Resume
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {savedResumes.map((resume) => (
              <Card key={resume.id}>
                <CardHeader>
                  <CardTitle>{resume.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Last modified: {new Date(resume.lastModified).toLocaleString()}
                  </p>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewResume(resume)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditResume(resume.id)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteResume(resume.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      {previewResume && <ResumePreview resume={previewResume} onClose={() => setPreviewResume(null)} />}
    </div>
  )
}


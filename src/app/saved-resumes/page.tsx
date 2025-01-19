'use client'

// src/app/saved-resumes/page.tsx
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@/lib/auth'

export default function SavedResumesPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [savedResumes, setSavedResumes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserAndResumes = async () => {
      setIsLoading(true)
      try {
        const currentUser = await auth.getCurrentUser()
        setUser(currentUser)
        const resumes = await auth.getSavedResumes()
        setSavedResumes(resumes)
      } catch (error) {
        console.error('Error fetching user data:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserAndResumes()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-t-4 border-gray-200 rounded-full" />
      </div>
    )
  }

  if (!user) {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Saved Resumes</h1>
        {savedResumes.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">You haven't saved any resumes yet.</p>
              <Button className="mt-4" onClick={() => router.push('/editor')}>
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
                    <Button variant="outline" size="sm" onClick={() => router.push(`/resume/${resume.id}`)}>
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => router.push(`/editor/${resume.id}`)}>
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => console.log('Delete resume')}>
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Briefcase, User, Plus, Sparkles, FileText, Zap, Award, TrendingUp } from "lucide-react"
import { auth } from "@/lib/auth"
import { LoggedInHeader } from "@/components/logged-in-header"
import { Progress } from "@/components/ui/progress"
import { ImprovementIdeas } from "@/components/improvement-ideas"
import { exampleTemplates } from "@/lib/example-templates"

export default function DashboardPage() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [lastEditedResume, setLastEditedResume] = useState<any>(null)
  const [showImprovementIdeas, setShowImprovementIdeas] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await auth.getCurrentUser()
      setUser(currentUser)
      const savedResumes = await auth.getSavedResumes()
      if (savedResumes.length > 0) {
        const lastEdited = savedResumes.reduce((latest, resume) =>
          new Date(resume.lastModified) > new Date(latest.lastModified) ? resume : latest,
        )
        setLastEditedResume(lastEdited)
      }
    }
    fetchUser()
  }, [])

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId)
  }

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      router.push(`/editor/new?template=${selectedTemplate}`)
    }
  }

  if (!user) {
    return null // or a loading indicator
  }

  return (
    <div className="min-h-screen bg-background adorable-bg">
      <LoggedInHeader user={user} />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold rainbow-text">Welcome back, {user.name}!</h1>
          <Button
            onClick={() => router.push("/editor/new")}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New Resume
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Resume Progress</h3>
                <FileText className="h-6 w-6 text-primary" />
              </div>
              {lastEditedResume ? (
                <>
                  <Progress value={lastEditedResume.progress} className="mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">{lastEditedResume.progress}% complete</p>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-primary"
                    onClick={() => router.push(`/editor/${lastEditedResume.id}`)}
                  >
                    Continue Editing
                  </Button>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">No resumes created yet. Start by creating a new resume!</p>
              )}
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Improvement Ideas</h3>
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-2">Get tips to enhance your resume</p>
              <Button variant="outline" className="w-full" onClick={() => setShowImprovementIdeas(true)}>
                View Ideas
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Resume Score</h3>
                <Award className="h-6 w-6 text-primary" />
              </div>
              {lastEditedResume ? (
                <>
                  <p className="text-3xl font-bold mb-2">{lastEditedResume.progress}/100</p>
                  <p className="text-sm text-muted-foreground">Based on your resume completeness</p>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-primary"
                    onClick={() => router.push(`/editor/${lastEditedResume.id}`)}
                  >
                    Improve Score
                  </Button>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Create a resume to get your score!</p>
              )}
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Resume Templates</h2>
        <Tabs defaultValue="Personal" className="space-y-8">
          <TabsList>
            {Object.keys(exampleTemplates).map((category) => (
              <TabsTrigger key={category} value={category}>
                {category === "Personal" ? <User className="h-4 w-4 mr-2" /> : <Briefcase className="h-4 w-4 mr-2" />}
                {category} Templates
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(exampleTemplates).map(([category, templates]) => (
            <TabsContent key={category} value={category}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className={`overflow-hidden cursor-pointer transition-all bg-card/50 backdrop-blur-sm ${
                      selectedTemplate === template.id ? "ring-2 ring-primary" : "hover:shadow-lg hover:scale-105"
                    }`}
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    <CardContent className="p-0">
                      <div className="aspect-[3/4] relative">
                        <img
                          src={template.preview || "/placeholder.svg"}
                          alt={template.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-6 space-y-2">
                        <h3 className="font-semibold">{template.title}</h3>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleUseTemplate}
            disabled={!selectedTemplate}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Edit className="mr-2 h-4 w-4" />
            Use Selected Template
          </Button>
        </div>
      </main>
      <div className="fixed bottom-4 right-4">
        <Button size="lg" className="rounded-full shadow-lg bg-accent text-accent-foreground hover:bg-accent/90">
          <Sparkles className="mr-2 h-5 w-5" />
          AI Assistant
        </Button>
      </div>
      {showImprovementIdeas && (
        <ImprovementIdeas
          resume={lastEditedResume}
          onClose={() => setShowImprovementIdeas(false)}
          onApply={(resumeId) => router.push(`/editor/${resumeId}`)}
        />
      )}
    </div>
  )
}


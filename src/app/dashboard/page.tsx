// src/app/dashboard/page.tsx
"use client";
// src/app/dashboard/page.tsx
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Edit, Briefcase, User, Plus } from 'lucide-react'
import { auth } from '@/lib/auth'
import { LoggedInHeader } from '@/components/logged-in-header'

const examples = [
  {
    category: 'Personal',
    icon: User,
    templates: [
      {
        id: 'personal-1',
        title: 'Student Resume',
        description: 'Perfect for recent graduates or students seeking internships',
        preview: '/placeholder.svg?height=400&width=300',
      },
      {
        id: 'personal-2',
        title: 'Career Change',
        description: 'Highlight transferable skills for a career transition',
        preview: '/placeholder.svg?height=400&width=300',
      },
    ],
  },
  {
    category: 'Professional',
    icon: Briefcase,
    templates: [
      {
        id: 'prof-1',
        title: 'Software Engineer',
        description: 'Showcase your technical skills and project experience',
        preview: '/placeholder.svg?height=400&width=300',
      },
      {
        id: 'prof-2',
        title: 'Marketing Specialist',
        description: 'Highlight your campaign successes and strategic planning',
        preview: '/placeholder.svg?height=400&width=300',
      },
      {
        id: 'prof-3',
        title: 'Project Manager',
        description: 'Emphasize your leadership and organizational skills',
        preview: '/placeholder.svg?height=400&width=300',
      },
    ],
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await auth.getCurrentUser()
      setUser(currentUser)
    }

    fetchUser()
  }, [])

  if (!user) {
    return null
  }

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      router.push(`/editor/${selectedTemplate}`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <LoggedInHeader user={user} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <Tabs defaultValue="Personal" className="space-y-8">
          <TabsList>
            {examples.map((category) => (
              <TabsTrigger key={category.category} value={category.category}>
                <category.icon className="h-4 w-4 mr-2" />
                {category.category} Templates
              </TabsTrigger>
            ))}
          </TabsList>

          {examples.map((category) => (
            <TabsContent key={category.category} value={category.category}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.templates.map((template) => (
                  <Card 
                    key={template.id} 
                    className={`overflow-hidden cursor-pointer transition-all ${
                      selectedTemplate === template.id ? 'ring-2 ring-primary' : 'hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
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
                        <p className="text-sm text-gray-500">{template.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Card className="flex items-center justify-center cursor-pointer hover:shadow-lg">
                  <CardContent className="text-center">
                    <Plus className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-semibold">Create New Resume</h3>
                    <p className="text-sm text-muted-foreground">Start from scratch</p>
                    <Button onClick={() => router.push('/create-resume')}>
                      Create New Resume
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-8 flex justify-center">
          <Button 
            onClick={handleUseTemplate} 
            disabled={!selectedTemplate}
            size="lg"
          >
            <Edit className="mr-2 h-4 w-4" />
            Use Selected Template
          </Button>
        </div>
      </div>
    </div>
  )
}
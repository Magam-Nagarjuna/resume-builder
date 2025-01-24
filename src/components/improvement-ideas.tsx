import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

type Idea = {
  title: string
  description: string
}

type ImprovementIdeasProps = {
  resume: any
  onClose: () => void
  onApply: (resumeId: string) => void
}

export function ImprovementIdeas({ resume, onClose, onApply }: ImprovementIdeasProps) {
  const [ideas, setIdeas] = React.useState<Idea[]>([])

  React.useEffect(() => {
    const generalIdeas: Idea[] = [
      {
        title: "Use action verbs",
        description: "Start bullet points with strong action verbs to make your achievements more impactful.",
      },
      {
        title: "Quantify achievements",
        description: "Include specific numbers and percentages to showcase the scale of your accomplishments.",
      },
      {
        title: "Tailor to job descriptions",
        description: "Customize your resume for each application by highlighting relevant skills and experiences.",
      },
      {
        title: "Use industry keywords",
        description:
          "Incorporate relevant industry terms to improve your resume's visibility in applicant tracking systems.",
      },
      {
        title: "Proofread thoroughly",
        description: "Carefully review your resume for any spelling, grammar, or formatting errors.",
      },
    ]

    setIdeas(generalIdeas)
  }, [resume])

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Ideas to Improve Your Resume</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {ideas.map((idea, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <h3 className="font-semibold mb-2">{idea.title}</h3>
              <p className="text-sm text-muted-foreground">{idea.description}</p>
            </div>
          ))}
          <Button onClick={() => onApply(resume.id)} className="w-full">
            Apply Ideas to Resume
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}


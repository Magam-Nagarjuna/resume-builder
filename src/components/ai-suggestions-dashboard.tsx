import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

type Suggestion = {
  field: string
  value: string
  explanation: string
}

type AISuggestionsDashboardProps = {
  resume: any
  onClose: () => void
  onApply: (resumeId: string) => void
}

export function AISuggestionsDashboard({ resume, onClose, onApply }: AISuggestionsDashboardProps) {
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([])

  React.useEffect(() => {
    // Simulating AI-generated suggestions
    const generatedSuggestions: Suggestion[] = [
      {
        field: "summary",
        value:
          "Experienced professional with a proven track record in delivering high-impact results. Skilled in project management, team leadership, and strategic planning.",
        explanation:
          "This summary highlights your key strengths and experience, making it more appealing to potential employers.",
      },
      {
        field: "skills",
        value: "Add more technical skills relevant to your industry",
        explanation:
          "Including a comprehensive list of technical skills can help your resume pass through Applicant Tracking Systems (ATS) and catch the recruiter's attention.",
      },
      {
        field: "experience",
        value: "Quantify your achievements with specific metrics and results",
        explanation:
          "Adding measurable results to your work experience can demonstrate the impact you've had in previous roles.",
      },
    ]

    setSuggestions(generatedSuggestions)
  }, [resume])

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>AI Suggestions for Your Resume</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {suggestions.map((suggestion, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <h3 className="font-semibold mb-2">Suggestion for {suggestion.field}:</h3>
              <p className="mb-2">{suggestion.value}</p>
              <p className="text-sm text-muted-foreground mb-2">{suggestion.explanation}</p>
            </div>
          ))}
          <Button onClick={() => onApply(resume.id)} className="w-full">
            Apply Suggestions to Resume
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}


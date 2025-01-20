import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ResumePreviewProps {
  resume: any
  onClose: () => void
}

export function ResumePreview({ resume, onClose }: ResumePreviewProps) {
  const { formData, sections, styleOptions } = resume.content

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
        <div
          className="prose max-w-none"
          style={{
            fontFamily: styleOptions.font,
            fontSize: styleOptions.fontSize,
            fontWeight: styleOptions.bold ? "bold" : "normal",
            fontStyle: styleOptions.italic ? "italic" : "normal",
            textDecoration: styleOptions.underline ? "underline" : "none",
          }}
        >
          <h1>{formData.fullName}</h1>
          <p>
            {formData.email} • {formData.phone}
          </p>

          <h2>Professional Summary</h2>
          <p>{formData.summary}</p>

          {sections.map((section: any) => (
            <div key={section.id}>
              <h2>{section.title}</h2>
              <hr className="border-t border-gray-300 my-2" />
              <ol className="list-decimal list-inside">
                {section.content.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


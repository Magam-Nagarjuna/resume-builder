import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { DefaultTemplate } from "@/components/resume-templates/default-template"
import { ModernTemplate } from "@/components/resume-templates/modern-template"
import { CreativeVerticalTemplate } from "@/components/resume-templates/creative-vertical-template"
import { CreativeHorizontalTemplate } from "@/components/resume-templates/creative-horizontal-template"
import { MinimalistTemplate } from "@/components/resume-templates/minimalist-template"
import { InfographicTemplate } from "@/components/resume-templates/infographic-template"
import { TimelineTemplate } from "@/components/resume-templates/timeline-template"

interface ResumePreviewProps {
  resume: any
  onClose: () => void
  uploadedImage: string | null
}

export function ResumePreview({ resume, onClose, uploadedImage }: ResumePreviewProps) {
  const { formData, sections, styleOptions } = resume.content
  const designTemplate = resume.designTemplate || "default"

  const renderTemplate = () => {
    switch (designTemplate) {
      case "modern":
        return (
          <ModernTemplate
            formData={formData}
            sections={sections}
            styleOptions={styleOptions}
            uploadedImage={uploadedImage}
          />
        )
      case "creative-vertical":
        return (
          <CreativeVerticalTemplate
            formData={formData}
            sections={sections}
            styleOptions={styleOptions}
            uploadedImage={uploadedImage}
          />
        )
      case "creative-horizontal":
        return (
          <CreativeHorizontalTemplate
            formData={formData}
            sections={sections}
            styleOptions={styleOptions}
            uploadedImage={uploadedImage}
          />
        )
      case "minimalist":
        return (
          <MinimalistTemplate
            formData={formData}
            sections={sections}
            styleOptions={styleOptions}
            uploadedImage={uploadedImage}
          />
        )
      case "infographic":
        return (
          <InfographicTemplate
            formData={formData}
            sections={sections}
            styleOptions={styleOptions}
            uploadedImage={uploadedImage}
          />
        )
      case "timeline":
        return (
          <TimelineTemplate
            formData={formData}
            sections={sections}
            styleOptions={styleOptions}
            uploadedImage={uploadedImage}
          />
        )
      default:
        return (
          <DefaultTemplate
            formData={formData}
            sections={sections}
            styleOptions={styleOptions}
            uploadedImage={uploadedImage}
          />
        )
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
        {renderTemplate()}
      </div>
    </div>
  )
}


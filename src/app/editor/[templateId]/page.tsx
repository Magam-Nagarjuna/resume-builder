"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Save, Loader2, Plus, Trash, Bold, Italic, Underline, Eye, EyeOff, Sparkles } from "lucide-react"
import { jsPDF } from "jspdf"
import "jspdf-autotable"
import { LoggedInHeader } from "@/components/logged-in-header"
import { auth } from "@/lib/auth"
import { AISuggestions } from "@/components/ai-suggestions"
import { generatePDF, downloadPDF } from "@/lib/pdf"
import { DefaultTemplate } from "@/components/resume-templates/default-template"
import { ModernTemplate } from "@/components/resume-templates/modern-template"
import { CreativeVerticalTemplate } from "@/components/resume-templates/creative-vertical-template"
import { CreativeHorizontalTemplate } from "@/components/resume-templates/creative-horizontal-template"
import { MinimalistTemplate } from "@/components/resume-templates/minimalist-template"
import { InfographicTemplate } from "@/components/resume-templates/infographic-template"
import { TimelineTemplate } from "@/components/resume-templates/timeline-template"

type Section = {
  id: string
  title: string
  content: string[]
}

type StyleOptions = {
  font: string
  fontSize: string
  bold: boolean
  italic: boolean
  underline: boolean
}

const fontOptions = [
  { value: "helvetica", label: "Helvetica" },
  { value: "times", label: "Times" },
  { value: "courier", label: "Courier" },
]

const fontSizeOptions = ["12px", "14px", "16px", "18px", "20px", "24px"]

const resumeTypes = [
  { value: "default", label: "Default" },
  { value: "student-resume", label: "Student Resume" },
  { value: "software-engineer", label: "Software Engineer" },
  { value: "marketing-specialist", label: "Marketing Specialist" },
  { value: "data-scientist", label: "Data Scientist" },
  { value: "ux-designer", label: "UX Designer" },
  { value: "project-manager", label: "Project Manager" },
]

const designTemplates = [
  { value: "default", label: "Default" },
  { value: "modern", label: "Modern" },
  { value: "creative-vertical", label: "Creative Vertical" },
  { value: "creative-horizontal", label: "Creative Horizontal" },
  { value: "minimalist", label: "Minimalist" },
  { value: "infographic", label: "Infographic" },
  { value: "timeline", label: "Timeline" },
]

export default function EditorPage({ params }: { params: { templateId: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    summary: "",
  })
  const [sections, setSections] = useState<Section[]>([
    { id: "experience", title: "Work Experience", content: [""] },
    { id: "education", title: "Education", content: [""] },
    { id: "skills", title: "Skills", content: [""] },
    { id: "projects", title: "Projects", content: [""] },
  ])
  const [styleOptions, setStyleOptions] = useState<StyleOptions>({
    font: "helvetica",
    fontSize: "16px",
    bold: false,
    italic: false,
    underline: false,
  })
  const [showPreview, setShowPreview] = useState(false)
  const [showAISuggestions, setShowAISuggestions] = useState(false)
  const [resumeProgress, setResumeProgress] = useState(0)
  const [templateData, setTemplateData] = useState<any>(null)
  const [resumeType, setResumeType] = useState<string>("default")
  const [designTemplate, setDesignTemplate] = useState<string>("default")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    const loadTemplate = async () => {
      setIsLoading(true)
      try {
        const currentUser = await auth.getCurrentUser()
        setUser(currentUser)

        if (params.templateId !== "new") {
          const savedResume = await auth.getResumeById(params.templateId)
          if (savedResume) {
            setFormData(savedResume.content.formData)
            setSections(savedResume.content.sections)
            setStyleOptions(savedResume.content.styleOptions)
            setResumeType(savedResume.resumeType || "default")
            setDesignTemplate(savedResume.designTemplate || "default")
            setUploadedImage(savedResume.content.uploadedImage || null)
          }
        } else {
          // Set default values for new resume
          setFormData({
            fullName: "John Doe",
            email: "johndoe@example.com",
            phone: "123-456-7890",
            summary: "Highly motivated and experienced professional with a strong passion for delivering results.",
          })
          setSections([
            {
              id: "experience",
              title: "Work Experience",
              content: ["Position at Company A (2020-Present)", "Position at Company B (2018-2020)"],
            },
            { id: "education", title: "Education", content: ["Degree in Field, University Name (2014-2018)"] },
            { id: "skills", title: "Skills", content: ["Skill 1", "Skill 2", "Skill 3"] },
            {
              id: "projects",
              title: "Projects",
              content: ["Project A: Description of project A", "Project B: Description of project B"],
            },
          ])
          setResumeType("default")
          setDesignTemplate("default")
        }
      } catch (error) {
        console.error("Error loading template:", error)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    loadTemplate()
  }, [params.templateId, router])

  const updateResumeProgress = () => {
    const totalFields =
      Object.keys(formData).length + sections.reduce((acc, section) => acc + section.content.length, 0)
    const filledFields =
      Object.values(formData).filter(Boolean).length +
      sections.reduce((acc, section) => acc + section.content.filter(Boolean).length, 0)
    const progress = Math.round((filledFields / totalFields) * 100)
    setResumeProgress(progress)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value }
      updateResumeProgress()
      return newFormData
    })
  }

  const handleSectionChange = (id: string, index: number, value: string) => {
    setSections((prev) => {
      const newSections = prev.map((section) =>
        section.id === id
          ? { ...section, content: section.content.map((item, i) => (i === index ? value : item)) }
          : section,
      )
      updateResumeProgress()
      return newSections
    })
  }

  const handleAddField = (id: string) => {
    setSections((prev) =>
      prev.map((section) => (section.id === id ? { ...section, content: [...section.content, ""] } : section)),
    )
  }

  const handleRemoveField = (id: string, index: number) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, content: section.content.filter((_, i) => i !== index) } : section,
      ),
    )
  }

  const handleAddSection = () => {
    const newId = `custom-${Date.now()}`
    setSections((prev) => [...prev, { id: newId, title: "New Section", content: [""] }])
    setActiveTab(newId)
  }

  const handleRemoveSection = (id: string) => {
    setSections((prev) => prev.filter((section) => section.id !== id))
    setActiveTab("personal")
  }

  const handleStyleChange = (key: keyof StyleOptions, value: string | boolean) => {
    setStyleOptions((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const resumeData = {
        id: params.templateId === "new" ? `resume-${Date.now()}` : params.templateId,
        title: formData.fullName ? `${formData.fullName}'s Resume` : "Untitled Resume",
        lastModified: new Date().toISOString(),
        content: { formData, sections, styleOptions, uploadedImage },
        progress: resumeProgress,
        resumeType,
        designTemplate,
      }
      await auth.saveResume(resumeData)
      console.log("Saved:", resumeData)
      router.push("/dashboard")
    } catch (error) {
      console.error("Error saving template:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const resumeData = {
        formData,
        sections,
        styleOptions,
        uploadedImage,
        designTemplate,
      }
      await downloadPDF(resumeData)
    } catch (error) {
      console.error("Error downloading PDF:", error)
      // Show an error message to the user
      alert("An error occurred while downloading the PDF. Please try again.")
    } finally {
      setIsDownloading(false)
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
    <div className="min-h-screen bg-background">
      <LoggedInHeader user={user} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <h1 className="text-3xl font-bold">{params.templateId === "new" ? "Create New Resume" : "Edit Resume"}</h1>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="mb-4 space-y-2">
              <h3 className="font-semibold">Resume Options</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="resume-type">Type:</Label>
                  <Select value={resumeType} onValueChange={setResumeType}>
                    <SelectTrigger id="resume-type" className="w-[180px]">
                      <SelectValue placeholder="Select resume type" />
                    </SelectTrigger>
                    <SelectContent>
                      {resumeTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="design-template">Design:</Label>
                  <Select value={designTemplate} onValueChange={setDesignTemplate}>
                    <SelectTrigger id="design-template" className="w-[180px]">
                      <SelectValue placeholder="Select design template" />
                    </SelectTrigger>
                    <SelectContent>
                      {designTemplates.map((template) => (
                        <SelectItem key={template.value} value={template.value}>
                          {template.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <Label htmlFor="image-upload">Upload Profile Picture:</Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                      setUploadedImage(reader.result as string)
                    }
                    reader.readAsDataURL(file)
                  }
                }}
              />
            </div>
            <Button variant="outline" onClick={handleDownload} disabled={isDownloading}>
              {isDownloading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </>
              )}
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </>
              )}
            </Button>
            <Button variant="outline" onClick={() => setShowPreview(!showPreview)} className="md:hidden">
              {showPreview ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" />
                  Hide Preview
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Show Preview
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className={`p-6 ${showPreview ? "hidden md:block" : "block"}`}>
            <div className="mb-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <Label htmlFor="font-select" className="min-w-[80px]">
                  Font:
                </Label>
                <Select value={styleOptions.font} onValueChange={(value) => handleStyleChange("font", value)}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <Label htmlFor="font-size-select" className="min-w-[80px]">
                  Font Size:
                </Label>
                <Select value={styleOptions.fontSize} onValueChange={(value) => handleStyleChange("fontSize", value)}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select a font size" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontSizeOptions.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <ToggleGroup type="multiple" className="justify-start flex-wrap">
                <ToggleGroupItem
                  value="bold"
                  aria-label="Toggle bold"
                  onClick={() => handleStyleChange("bold", !styleOptions.bold)}
                >
                  <Bold className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="italic"
                  aria-label="Toggle italic"
                  onClick={() => handleStyleChange("italic", !styleOptions.italic)}
                >
                  <Italic className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="underline"
                  aria-label="Toggle underline"
                  onClick={() => handleStyleChange("underline", !styleOptions.underline)}
                >
                  <Underline className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 flex flex-wrap">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                {sections.map((section) => (
                  <TabsTrigger key={section.id} value={section.id}>
                    {section.title}
                  </TabsTrigger>
                ))}
                <TabsTrigger value="add" onClick={handleAddSection}>
                  <Plus className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea
                      id="summary"
                      name="summary"
                      value={formData.summary}
                      onChange={handleChange}
                      rows={8}
                      placeholder="Enter your professional summary."
                    />
                  </div>
                </form>
              </TabsContent>

              {sections.map((section) => (
                <TabsContent key={section.id} value={section.id}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label htmlFor={section.id}>{section.title}</Label>
                      {section.id.startsWith("custom-") && (
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveSection(section.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {section.content.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input value={item} onChange={(e) => handleSectionChange(section.id, index, e.target.value)} />
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveField(section.id, index)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => handleAddField(section.id)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Field
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </Card>

          <div className={`bg-white rounded-lg shadow-lg p-8 ${showPreview ? "block" : "hidden md:block"}`}>
            {renderTemplate()}
          </div>
        </div>

        <div className="mt-8">
          <Button onClick={() => setShowAISuggestions(!showAISuggestions)}>
            <Sparkles className="mr-2 h-4 w-4" />
            {showAISuggestions ? "Hide AI Suggestions" : "Show AI Suggestions"}
          </Button>
          {showAISuggestions && (
            <AISuggestions
              formData={formData}
              sections={sections}
              resumeType={resumeType}
              onApplySuggestion={(field, value) => {
                if (field in formData) {
                  setFormData((prev) => ({ ...prev, [field]: value }))
                } else {
                  const [sectionId, index] = field.split(".")
                  handleSectionChange(sectionId, Number.parseInt(index), value)
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}


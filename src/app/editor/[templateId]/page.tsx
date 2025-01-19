'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Download, Save, Loader2, Plus, Trash, Bold, Italic, Underline, Eye, EyeOff } from 'lucide-react'
import { jsPDF } from 'jspdf'
import { LoggedInHeader } from '@/components/logged-in-header'
import { auth } from '@/lib/auth'

type Section = {
  id: string;
  title: string;
  content: string;
}

type StyleOptions = {
  font: string;
  fontSize: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

const fontOptions = [
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Helvetica, sans-serif', label: 'Helvetica' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Times New Roman, serif', label: 'Times New Roman' },
  { value: 'Courier New, monospace', label: 'Courier New' },
]

const fontSizeOptions = ['12px', '14px', '16px', '18px', '20px', '24px']

export default function EditorPage({ params }: { params: { templateId: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    summary: '',
  })
  const [sections, setSections] = useState<Section[]>([
    { id: 'experience', title: 'Work Experience', content: '' },
    { id: 'education', title: 'Education', content: '' },
    { id: 'skills', title: 'Skills', content: '' },
    { id:'projects', title:'Projects', content:''},
  ])
  const [styleOptions, setStyleOptions] = useState<StyleOptions>({
    font: 'Arial, sans-serif',
    fontSize: '16px',
    bold: false,
    italic: false,
    underline: false,
  })
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    const loadTemplate = async () => {
      setIsLoading(true)
      try {
        const currentUser = await auth.getCurrentUser()
        setUser(currentUser)

        const savedResumes = await auth.getSavedResumes()
        const savedResume = savedResumes.find(resume => resume.id === params.templateId)

        if (savedResume) {
          setFormData(savedResume.content.formData)
          setSections(savedResume.content.sections)
          setStyleOptions(savedResume.content.styleOptions || styleOptions)
        } else {
          // Set default data if no saved resume is found
          setFormData({
            fullName: 'John Doe',
            email: 'john@example.com',
            phone: '(555) 123-4567',
            summary: 'Experienced professional with a passion for innovation.',
          })
          setSections([
            { id: 'experience', title: 'Work Experience', content: 'Senior Developer at Tech Co.\n- Led team of 5 developers\n- Implemented new features' },
            { id: 'education', title: 'Education', content: 'Bachelor of Science in Computer Science\nUniversity of Technology, 2015-2019' },
            { id: 'skills', title: 'Skills', content: 'JavaScript, React, Node.js, Python, SQL' },
          ])
        }
      } catch (error) {
        console.error('Error loading template:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    loadTemplate()
  }, [params.templateId, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSectionChange = (id: string, content: string) => {
    setSections(prev => prev.map(section =>
      section.id === id ? { ...section, content } : section
    ))
  }

  const handleAddSection = () => {
    const newId = `custom-${Date.now()}`
    setSections(prev => [...prev, { id: newId, title: 'New Section', content: '' }])
    setActiveTab(newId)
  }

  const handleRemoveSection = (id: string) => {
    setSections(prev => prev.filter(section => section.id !== id))
    setActiveTab('personal')
  }

  const handleStyleChange = (key: keyof StyleOptions, value: string | boolean) => {
    setStyleOptions(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const resumeData = {
        id: params.templateId,
        title: formData.fullName + "'s Resume",
        lastModified: new Date().toISOString(),
        content: { formData, sections, styleOptions }
      }
      await auth.saveResume(resumeData)
      console.log('Saved:', resumeData)
    } catch (error) {
      console.error('Error saving template:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDownload = () => {
    const doc = new jsPDF();
  
    // Set the font based on user selection
    // Note: jsPDF supports limited fonts by default
    const fontMapping = {
      'Arial, sans-serif': 'helvetica',
      'Helvetica, sans-serif': 'helvetica',
      'Times New Roman, serif': 'times',
      'Georgia, serif': 'times',
      'Courier New, monospace': 'courier'
    };
  
    const selectedFont = fontMapping[styleOptions.font] || 'helvetica';
    doc.setFont(selectedFont);

    // Add content to PDF with selected font size
    const fontSize = parseInt(styleOptions.fontSize) || 12;
    doc.setFontSize(fontSize * 1.5); // Title
    doc.text(formData.fullName, 20, 20);

    doc.setFontSize(fontSize); // Regular text
    doc.text(`Email: ${formData.email}`, 20, 30);
    doc.text(`Phone: ${formData.phone}`, 20, 40);

    // Apply text styling
    if (styleOptions.bold) doc.setFont(selectedFont, 'bold');
    if (styleOptions.italic) doc.setFont(selectedFont, 'italic');

    doc.setFontSize(fontSize * 1.2); // Section headers
    doc.text('Summary', 20, 55);
    
    doc.setFontSize(fontSize); // Reset for content
    doc.text(formData.summary, 20, 65);

    let yOffset = 80;
    sections.forEach(section => {
      // Section title with larger font
      doc.setFontSize(fontSize * 1.2);
      doc.text(section.title, 20, yOffset);
      
      // Reset font for content
      doc.setFontSize(fontSize);
      const lines = doc.splitTextToSize(section.content, 170);
      doc.text(lines, 20, yOffset + 10);
      yOffset += 20 + (lines.length * 7);
    });

    doc.save('resume.pdf');
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <LoggedInHeader user={user} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <h1 className="text-3xl font-bold">Edit Resume</h1>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
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
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              className="md:hidden"
            >
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
          <Card className={`p-6 ${showPreview ? 'hidden md:block' : 'block'}`}>
            <div className="mb-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <Label htmlFor="font-select" className="min-w-[80px]">Font:</Label>
                <Select
                  value={styleOptions.font}
                  onValueChange={(value) => handleStyleChange('font', value)}
                >
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
                <Label htmlFor="font-size-select" className="min-w-[80px]">Font Size:</Label>
                <Select
                  value={styleOptions.fontSize}
                  onValueChange={(value) => handleStyleChange('fontSize', value)}
                >
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
                  onClick={() => handleStyleChange('bold', !styleOptions.bold)}
                >
                  <Bold className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="italic"
                  aria-label="Toggle italic"
                  onClick={() => handleStyleChange('italic', !styleOptions.italic)}
                >
                  <Italic className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="underline"
                  aria-label="Toggle underline"
                  onClick={() => handleStyleChange('underline', !styleOptions.underline)}
                >
                  <Underline className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 flex flex-wrap">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                {sections.map(section => (
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
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea
                      id="summary"
                      name="summary"
                      value={formData.summary}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>
                </form>
              </TabsContent>

              {sections.map(section => (
                <TabsContent key={section.id} value={section.id}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label htmlFor={section.id}>{section.title}</Label>
                      {section.id.startsWith('custom-') && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveSection(section.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <Textarea
                      id={section.id}
                      value={section.content}
                      onChange={(e) => handleSectionChange(section.id, e.target.value)}
                      rows={8}
                    />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </Card>

          <div className={`bg-white rounded-lg shadow-lg p-8 ${showPreview ? 'block' : 'hidden md:block'}`}>
            <div 
              className="prose max-w-none"
              style={{
                fontFamily: styleOptions.font,
                fontSize: styleOptions.fontSize,
                fontWeight: styleOptions.bold ? 'bold' : 'normal',
                fontStyle: styleOptions.italic ? 'italic' : 'normal',
                textDecoration: styleOptions.underline ? 'underline' : 'none',
              }}
            >
              <h1>{formData.fullName}</h1>
              <p>{formData.email} • {formData.phone}</p>

              <h2>Professional Summary</h2>
              <p>{formData.summary}</p>

              {sections.map(section => (
                <div key={section.id}>
                  <h2>{section.title}</h2>
                  <p style={{ whiteSpace: 'pre-line' }}>{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


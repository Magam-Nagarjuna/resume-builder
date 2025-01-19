"use client";
// src/app/create-resume/page.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Download, Save, Loader2, Plus, Trash, Bold, Italic, Underline, Eye, EyeOff } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { LoggedInHeader } from '@/components/logged-in-header';
import { auth } from '@/lib/auth';

type Section = {
  id: string;
  title: string;
  content: string;
};

type StyleOptions = {
  font: string;
  fontSize: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
};

const fontOptions = [
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Helvetica, sans-serif', label: 'Helvetica' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Times New Roman, serif', label: 'Times New Roman' },
  { value: 'Courier New, monospace', label: 'Courier New' },
];

const fontSizeOptions = ['12px', '14px', '16px', '18px', '20px', '24px'];

export default function CreateResumePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    summary: '',
  });
  const [sections, setSections] = useState<Section[]>([
    { id: 'experience', title: 'Work Experience', content: '' },
    { id: 'education', title: 'Education', content: '' },
    { id: 'skills', title: 'Skills', content: '' },
    { id: 'projects', title: 'Projects', content: '' },
  ]);
  const [styleOptions, setStyleOptions] = useState<StyleOptions>({
    font: 'Arial, sans-serif',
    fontSize: '16px',
    bold: false,
    italic: false,
    underline: false,
  });
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const loadTemplate = async () => {
      setIsLoading(true);
      try {
        const currentUser = await auth.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error loading template:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    loadTemplate();
  }, [router]);

  const handleStyleChange = (key: keyof StyleOptions, value: any) => {
    setStyleOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddSection = () => {
    const newSection: Section = {
      id: `custom-${Math.random().toString(36).substr(2, 9)}`,
      title: 'New Section',
      content: '',
    };
    setSections([...sections, newSection]);
    setActiveTab(newSection.id);
  };

  const handleRemoveSection = (id: string) => {
    setSections(sections.filter((section) => section.id !== id));
    setActiveTab('personal');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSectionChange = (id: string, content: string) => {
    setSections(sections.map((section) => (section.id === id ? { ...section, content } : section)));
  };

  const handleDownload = async () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(formData.fullName, 10, 10);
    doc.text(formData.email, 10, 20);
    doc.text(formData.phone, 10, 30);
    doc.text(formData.summary, 10, 40);

    sections.forEach((section) => {
      doc.text(section.title, 10, 50);
      doc.text(section.content, 10, 60);
    });

    doc.save('resume.pdf');
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const savedResumes = await auth.getSavedResumes();
      const newResume = {
        id: Math.random().toString(36).substr(2, 9),
        content: {
          formData,
          sections,
          styleOptions,
        },
      };
      savedResumes.push(newResume);
      await auth.saveResume(savedResumes);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving resume:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <LoggedInHeader user={user} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Create New Resume</h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
        
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              className="md:hidden"
            >
              {showPreview ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
              {showPreview ? 'Hide Preview' : 'Show Preview'}
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

              {sections.map((section) => (
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

              {sections.map((section) => (
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
  );
}

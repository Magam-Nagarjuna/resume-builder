import type React from "react"

type TemplateProps = {
  formData: {
    fullName: string
    email: string
    phone: string
    summary: string
  }
  sections: {
    id: string
    title: string
    content: string[]
  }[]
  styleOptions: {
    font: string
    fontSize: string
    bold: boolean
    italic: boolean
    underline: boolean
  }
  uploadedImage: string | null
}

export const TimelineTemplate: React.FC<TemplateProps> = ({ formData, sections, styleOptions, uploadedImage }) => {
  return (
    <div
      className="prose max-w-none bg-white p-8"
      style={{
        fontFamily: styleOptions.font,
        fontSize: styleOptions.fontSize,
        fontWeight: styleOptions.bold ? "bold" : "normal",
        fontStyle: styleOptions.italic ? "italic" : "normal",
        textDecoration: styleOptions.underline ? "underline" : "none",
      }}
    >
      <header className="mb-8 text-center">
        {uploadedImage && (
          <img
            src={uploadedImage || "/placeholder.svg"}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
        )}
        <h1 className="text-3xl font-bold mb-2">{formData.fullName}</h1>
        <p className="text-gray-600">
          {formData.email} • {formData.phone}
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
        <p>{formData.summary}</p>
      </section>

      <div className="relative border-l-2 border-primary pl-8 ml-4">
        {sections.map((section, index) => (
          <section key={section.id} className="mb-8 relative">
            <div className="absolute -left-10 w-6 h-6 bg-primary rounded-full border-4 border-white"></div>
            <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
            <ul className="list-disc list-inside">
              {section.content.map((item, itemIndex) => (
                <li key={itemIndex} className="mb-1">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}


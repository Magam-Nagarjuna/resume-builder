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

export const InfographicTemplate: React.FC<TemplateProps> = ({ formData, sections, styleOptions, uploadedImage }) => {
  return (
    <div
      className="prose max-w-none bg-gray-100 p-8"
      style={{
        fontFamily: styleOptions.font,
        fontSize: styleOptions.fontSize,
        fontWeight: styleOptions.bold ? "bold" : "normal",
        fontStyle: styleOptions.italic ? "italic" : "normal",
        textDecoration: styleOptions.underline ? "underline" : "none",
      }}
    >
      <header className="bg-primary text-white p-6 rounded-lg mb-8">
        {uploadedImage && (
          <img
            src={uploadedImage || "/placeholder.svg"}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
        )}
        <h1 className="text-3xl font-bold mb-2">{formData.fullName}</h1>
        <p>
          {formData.email} • {formData.phone}
        </p>
      </header>

      <section className="bg-white p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
        <p>{formData.summary}</p>
      </section>

      <div className="grid grid-cols-2 gap-8">
        {sections.map((section) => (
          <section key={section.id} className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-primary">{section.title}</h2>
            <ul className="space-y-2">
              {section.content.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
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


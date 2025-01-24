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

export const MinimalistTemplate: React.FC<TemplateProps> = ({ formData, sections, styleOptions, uploadedImage }) => {
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
      <header className="mb-8 border-b pb-4">
        {uploadedImage && (
          <img
            src={uploadedImage || "/placeholder.svg"}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 object-cover"
          />
        )}
        <h1 className="text-3xl font-bold mb-2">{formData.fullName}</h1>
        <p className="text-gray-600">
          {formData.email} • {formData.phone}
        </p>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
        <p>{formData.summary}</p>
      </section>

      {sections.map((section) => (
        <section key={section.id} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
          <ul className="list-disc list-inside">
            {section.content.map((item, index) => (
              <li key={index} className="mb-1">
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}


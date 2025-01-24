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

export const DefaultTemplate: React.FC<TemplateProps> = ({ formData, sections, styleOptions, uploadedImage }) => {
  return (
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
      {uploadedImage && (
        <img
          src={uploadedImage || "/placeholder.svg"}
          alt="Profile"
          className="w-32 h-32 rounded-full mb-4 object-cover"
        />
      )}
      <h1>{formData.fullName}</h1>
      <p>
        {formData.email} • {formData.phone}
      </p>

      <h2>Professional Summary</h2>
      <p>{formData.summary}</p>

      {sections.map((section) => (
        <div key={section.id}>
          <h2>{section.title}</h2>
          <hr className="border-t border-gray-300 my-2" />
          <ul className="list-disc list-inside">
            {section.content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}


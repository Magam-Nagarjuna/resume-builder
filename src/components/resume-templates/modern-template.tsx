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

export const ModernTemplate: React.FC<TemplateProps> = ({ formData, sections, styleOptions, uploadedImage }) => {
  return (
    <div
      className="prose max-w-none bg-gray-100 p-8 rounded-lg"
      style={{
        fontFamily: styleOptions.font,
        fontSize: styleOptions.fontSize,
        fontWeight: styleOptions.bold ? "bold" : "normal",
        fontStyle: styleOptions.italic ? "italic" : "normal",
        textDecoration: styleOptions.underline ? "underline" : "none",
      }}
    >
      <div className="flex items-center mb-6">
        {uploadedImage && (
          <img
            src={uploadedImage || "/placeholder.svg"}
            alt="Profile"
            className="w-24 h-24 rounded-full mr-6 object-cover"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold mb-2">{formData.fullName}</h1>
          <p className="text-gray-600">
            {formData.email} • {formData.phone}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
        <p>{formData.summary}</p>
      </div>

      {sections.map((section) => (
        <div key={section.id} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
          <ul className="list-disc list-inside">
            {section.content.map((item, index) => (
              <li key={index} className="mb-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}


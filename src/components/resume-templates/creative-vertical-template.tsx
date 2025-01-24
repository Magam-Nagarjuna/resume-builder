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

export const CreativeVerticalTemplate: React.FC<TemplateProps> = ({
  formData,
  sections,
  styleOptions,
  uploadedImage,
}) => {
  return (
    <div
      className="prose max-w-none flex"
      style={{
        fontFamily: styleOptions.font,
        fontSize: styleOptions.fontSize,
        fontWeight: styleOptions.bold ? "bold" : "normal",
        fontStyle: styleOptions.italic ? "italic" : "normal",
        textDecoration: styleOptions.underline ? "underline" : "none",
      }}
    >
      <div className="w-1/3 bg-gray-800 text-white p-6">
        {uploadedImage && (
          <img
            src={uploadedImage || "/placeholder.svg"}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          />
        )}
        <h1 className="text-2xl font-bold mb-2 text-center">{formData.fullName}</h1>
        <p className="text-center mb-4">
          {formData.email}
          <br />
          {formData.phone}
        </p>
        <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
        <p className="mb-4">{formData.summary}</p>
        {sections
          .filter((section) => section.id === "skills")
          .map((section) => (
            <div key={section.id}>
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              <ul className="list-disc list-inside">
                {section.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
      </div>
      <div className="w-2/3 p-6">
        {sections
          .filter((section) => section.id !== "skills")
          .map((section) => (
            <div key={section.id} className="mb-6">
              <h2 className="text-2xl font-semibold mb-2 border-b border-gray-300 pb-2">{section.title}</h2>
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
    </div>
  )
}


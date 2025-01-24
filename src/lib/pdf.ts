import { jsPDF } from "jspdf"
import "jspdf-autotable"
import { designTemplates } from "@/lib/example-templates"

type StyleOptions = {
  font: string
  fontSize: string
  bold: boolean
  italic: boolean
  underline: boolean
}

export const generatePDF = (
  doc: jsPDF,
  formData: { fullName: string; email: string; phone: string; summary: string },
  sections: { id: string; title: string; content: string[] }[],
  styleOptions: StyleOptions,
  uploadedImage: string | null,
  designTemplate: string,
) => {
  // Set page size to A4
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  const margin = 20
  let yPos = margin

  // Get template colors
  const template = designTemplates.find((t) => t.value === designTemplate) || designTemplates[0]
  const primaryColor = template.primaryColor || "#000000"
  const secondaryColor = template.secondaryColor || "#ffffff"

  // Set font and styles
  const fontName = styleOptions.font.split(",")[0].trim().toLowerCase()
  const supportedFonts = ["helvetica", "times", "courier"]
  const font = supportedFonts.includes(fontName) ? fontName : "helvetica"
  const fontSize = Number.parseInt(styleOptions.fontSize)
  doc.setFont(font)
  doc.setFontSize(fontSize)

  // Helper function to set text style
  const setStyle = (color = "#000000", size = fontSize) => {
    let style = "normal"
    if (styleOptions.bold && styleOptions.italic) style = "bolditalic"
    else if (styleOptions.bold) style = "bold"
    else if (styleOptions.italic) style = "italic"
    doc.setFont(font, style)
    doc.setTextColor(color)
    if (styleOptions.underline) {
      //const textWidth = doc.getTextWidth(text); //text is not defined here.  This line is problematic.
      //doc.line(x, y + 2, x + textWidth, y + 2); //x and y are not defined here. This line is problematic.
    }
  }

  // Add header background
  doc.setFillColor(primaryColor)
  doc.rect(0, 0, pageWidth, 60, "F")

  // Add profile picture if available
  if (uploadedImage) {
    try {
      doc.addImage(uploadedImage, "JPEG", margin, margin, 40, 40)

      // Add circular clipping (approximate with white border)
      doc.setFillColor(255, 255, 255)
      doc.circle(margin + 20, margin + 20, 21, "S")
    } catch (error) {
      console.error("Error adding image to PDF:", error)
    }
  }

  // Add name
  yPos = margin + 15
  setStyle("#ffffff", fontSize + 8)
  doc.text(formData.fullName, uploadedImage ? margin + 50 : margin, yPos)

  // Add contact info
  yPos += 10
  setStyle("#ffffff", fontSize)
  doc.text(`${formData.email} • ${formData.phone}`, uploadedImage ? margin + 50 : margin, yPos)

  // Reset position after header
  yPos = 80

  // Add sections
  const addSection = (title: string, content: string[]) => {
    // Section title
    setStyle(primaryColor, fontSize + 2)
    doc.text(title, margin, yPos)
    yPos += 10

    // Section content
    setStyle("#000000", fontSize)
    content.forEach((item) => {
      // Handle bullet points
      if (item.trim().startsWith("•")) {
        const bulletText = item.trim()
        const lines = doc.splitTextToSize(bulletText, pageWidth - (2 * margin + 10))
        lines.forEach((line: string) => {
          doc.text(line, margin, yPos)
          yPos += 7
        })
      } else {
        const lines = doc.splitTextToSize(item, pageWidth - 2 * margin)
        lines.forEach((line: string) => {
          doc.text(line, margin, yPos)
          yPos += 7
        })
      }

      // Add spacing between items
      yPos += 3

      // Check if we need a new page
      if (yPos > pageHeight - margin) {
        doc.addPage()
        yPos = margin
      }
    })

    // Add spacing between sections
    yPos += 10
  }

  // Add professional summary
  addSection("Professional Summary", [formData.summary])

  // Add other sections
  sections.forEach((section) => {
    addSection(section.title, section.content)
  })

  // Add page numbers
  const totalPages = doc.internal.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(10)
    doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: "center" })
  }
}

export const downloadPDF = async (resumeData: any) => {
  const doc = new jsPDF()
  try {
    generatePDF(
      doc,
      resumeData.formData,
      resumeData.sections,
      resumeData.styleOptions,
      resumeData.uploadedImage,
      resumeData.designTemplate,
    )
    doc.save("resume.pdf")
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw error
  }
}


import { jsPDF } from "jspdf";
import "jspdf-autotable";

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
  console.log("Starting generatePDF function");
  const margin = 40
  let yPos = margin

  // Set font and styles
  doc.setFont(styleOptions.font)
  doc.setFontSize(Number(styleOptions.fontSize))

  const setStyle = () => {
    let style = ""
    if (styleOptions.bold) style += "bold"
    if (styleOptions.italic) style += "italic"
    if (styleOptions.underline) {
      doc.setTextColor(0, 0, 255)
      doc.setDrawColor(0, 0, 255)
    } else {
      doc.setTextColor(0)
      doc.setDrawColor(0)
    }
    doc.setFont(styleOptions.font, style)
  }

  // Add profile picture if uploaded
  if (uploadedImage) {
    doc.addImage(uploadedImage, "JPEG", margin, yPos, 60, 60)
    yPos += 70
  }

  // Add name
  doc.setFontSize(Number(styleOptions.fontSize) + 8)
  setStyle()
  doc.text(formData.fullName, margin, yPos)
  yPos += 20

  // Add contact info
  doc.setFontSize(Number(styleOptions.fontSize))
  setStyle()
  doc.text(`${formData.email} | ${formData.phone}`, margin, yPos)
  yPos += 20

  // Add summary
  doc.setFontSize(Number(styleOptions.fontSize) + 2)
  doc.setFont(styleOptions.font, "bold")
  doc.text("Professional Summary", margin, yPos)
  yPos += 15
  doc.setFontSize(Number(styleOptions.fontSize))
  setStyle()
  const summaryLines = doc.splitTextToSize(formData.summary, doc.internal.pageSize.width - 2 * margin)
  doc.text(summaryLines, margin, yPos)
  yPos += summaryLines.length * (Number(styleOptions.fontSize) * 1.2) + 10

  // Add sections
  sections.forEach((section) => {
    // Section title
    doc.setFontSize(Number(styleOptions.fontSize) + 2)
    doc.setFont(styleOptions.font, "bold")
    doc.text(section.title, margin, yPos)
    yPos += 15

    // Section content
    doc.setFontSize(Number(styleOptions.fontSize))
    setStyle()
    section.content.forEach((item) => {
      const itemLines = doc.splitTextToSize(item, doc.internal.pageSize.width - 2 * margin - 10)
      doc.text("•", margin, yPos)
      doc.text(itemLines, margin + 10, yPos)
      yPos += itemLines.length * (Number(styleOptions.fontSize) * 1.2) + 5
    })

    yPos += 10
  })

  if (styleOptions.underline) {
    doc.line(margin, yPos, doc.internal.pageSize.width - margin, yPos)
  }

  // Apply design template specific modifications
  switch (designTemplate) {
    case "modern":
      doc.setDrawColor(200, 200, 200)
      doc.setFillColor(240, 240, 240)
      doc.rect(0, 0, doc.internal.pageSize.width, 100, "F")
      break
    case "creative-vertical":
      doc.setDrawColor(50, 50, 50)
      doc.setFillColor(50, 50, 50)
      doc.rect(0, 0, doc.internal.pageSize.width / 3, doc.internal.pageSize.height, "F")
      break
    case "creative-horizontal":
      doc.setDrawColor(50, 50, 50)
      doc.setFillColor(50, 50, 50)
      doc.rect(0, 0, doc.internal.pageSize.width, 100, "F")
      break
    default:
      // Default template, no additional modifications
      break
  }

  console.log("Finished generating PDF");
}

export const downloadPDF = (resumeData: any) => {
  console.log("Starting downloadPDF function");
  const doc = new jsPDF()
  generatePDF(
    doc,
    resumeData.formData,
    resumeData.sections,
    resumeData.styleOptions,
    resumeData.uploadedImage,
    resumeData.designTemplate,
  )
  console.log("Finished generating PDF");
  doc.save("resume.pdf")
  console.log("Saved PDF");
}

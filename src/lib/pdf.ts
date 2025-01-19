import { jsPDF } from 'jspdf'

export const generatePDF = (resumeData: any) => {
  const doc = new jsPDF();
  
  // Add content to PDF
  doc.setFontSize(20);
  doc.text(resumeData.fullName || 'Resume', 20, 20);
  
  doc.setFontSize(12);
  doc.text(`Email: ${resumeData.email || ''}`, 20, 30);
  doc.text(`Phone: ${resumeData.phone || ''}`, 20, 40);
  
  doc.setFontSize(16);
  doc.text('Professional Summary', 20, 60);
  doc.setFontSize(12);
  doc.text(resumeData.summary || '', 20, 70);
  
  // Add more sections...
  
  return doc;
}

export const downloadPDF = (resumeData: any) => {
  const doc = generatePDF(resumeData);
  doc.save('resume.pdf');
}


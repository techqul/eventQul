import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Download ticket as PDF
 */
export async function downloadTicketAsPDF(elementId: string, fileName: string) {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  try {
    // Create canvas from HTML
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      allowTaint: true,
    });

    // Validate canvas dimensions
    if (!canvas.width || !canvas.height || canvas.width === 0 || canvas.height === 0) {
      throw new Error('Invalid canvas dimensions');
    }

    const imgData = canvas.toDataURL('image/png');
    
    // Create PDF with A4 size
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });

    // Add image with full dimensions
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(fileName);
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  }
}

/**
 * Download ticket as Image (PNG)
 */
export async function downloadTicketAsImage(elementId: string, fileName: string) {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      allowTaint: true,
    });

    // Validate canvas
    if (!canvas.width || !canvas.height) {
      throw new Error('Invalid canvas dimensions');
    }

    canvas.toBlob((blob) => {
      if (!blob) {
        throw new Error('Failed to create image blob');
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 'image/png');
  } catch (error) {
    console.error('Image generation error:', error);
    throw error;
  }
}

// PDF Generator utility using html2pdf
declare global {
  interface Window {
    html2pdf: any;
  }
}

export async function generateBriefPDF(briefElement: HTMLElement, fileName: string = "Design-Brief.pdf") {
  if (!briefElement) {
    throw new Error("Brief element not found");
  }

  try {
    // Wait for html2pdf to be available
    let attempts = 0;
    while (!window.html2pdf && attempts < 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }

    if (!window.html2pdf) {
      throw new Error("html2pdf library not loaded");
    }

    // Clone the element to avoid modifying the original
    const clone = briefElement.cloneNode(true) as HTMLElement;

    // Apply print-friendly styles
    applyPrintStyles(clone);

    // Create a temporary container
    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.top = "-9999px";
    tempContainer.style.width = "800px";
    tempContainer.appendChild(clone);
    document.body.appendChild(tempContainer);

    try {
      // Configure PDF options
      const options = {
        margin: 10,
        filename: fileName,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
          allowTaint: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      };

      // Generate and save PDF
      const html2pdf = window.html2pdf;
      await html2pdf().set(options).from(clone).save();

      return true;
    } finally {
      // Clean up temporary container
      document.body.removeChild(tempContainer);
    }
  } catch (error) {
    console.error("PDF Generation Error:", error);
    throw new Error("فشل في إنشاء ملف PDF: " + (error instanceof Error ? error.message : "خطأ غير معروف"));
  }
}

function applyPrintStyles(element: HTMLElement) {
  // Main container
  element.style.background = "#ffffff";
  element.style.color = "#000000";
  element.style.padding = "30px";
  element.style.width = "100%";
  element.style.maxWidth = "800px";
  element.style.fontFamily = "Cairo, Arial, sans-serif";
  element.style.lineHeight = "1.6";

  // Remove all dark theme colors
  const allElements = element.querySelectorAll("*");
  allElements.forEach((el) => {
    const htmlEl = el as HTMLElement;
    
    // Reset background colors
    if (htmlEl.style.backgroundColor.includes("transparent") || 
        htmlEl.style.backgroundColor.includes("rgba") ||
        htmlEl.classList.toString().includes("bg-")) {
      htmlEl.style.backgroundColor = "#ffffff";
    }

    // Reset text colors
    if (htmlEl.style.color.includes("gray") || 
        htmlEl.style.color.includes("amber") ||
        htmlEl.classList.toString().includes("text-")) {
      htmlEl.style.color = "#000000";
    }

    // Remove borders that might not print well
    if (htmlEl.style.borderColor) {
      htmlEl.style.borderColor = "#cccccc";
    }
  });

  // Headers
  const headers = element.querySelectorAll("h1, h2, h3, h4");
  headers.forEach((header) => {
    const h = header as HTMLElement;
    h.style.color = "#000000";
    h.style.marginTop = "20px";
    h.style.marginBottom = "10px";
    h.style.fontWeight = "bold";
  });

  // Paragraphs
  const paragraphs = element.querySelectorAll("p");
  paragraphs.forEach((p) => {
    (p as HTMLElement).style.color = "#000000";
    (p as HTMLElement).style.margin = "10px 0";
  });

  // Divs with specific classes
  const allDivs = element.querySelectorAll("div");
  allDivs.forEach((div) => {
    const d = div as HTMLElement;
    d.style.color = "#000000";
    
    // Fix backgrounds
    if (d.style.backgroundColor) {
      d.style.backgroundColor = "#f9f9f9";
      d.style.borderColor = "#cccccc";
    }
  });

  // Buttons - hide them
  const buttons = element.querySelectorAll("button");
  buttons.forEach((btn) => {
    (btn as HTMLElement).style.display = "none";
  });

  // Links
  const links = element.querySelectorAll("a");
  links.forEach((link) => {
    (link as HTMLElement).style.color = "#0066cc";
  });

  // Lists
  const lists = element.querySelectorAll("ul, ol");
  lists.forEach((list) => {
    (list as HTMLElement).style.color = "#000000";
  });

  // List items
  const listItems = element.querySelectorAll("li");
  listItems.forEach((li) => {
    (li as HTMLElement).style.color = "#000000";
    (li as HTMLElement).style.marginBottom = "5px";
  });

  // Ensure proper page breaks
  const sections = element.querySelectorAll(".section, section");
  sections.forEach((section) => {
    (section as HTMLElement).style.pageBreakInside = "avoid";
    (section as HTMLElement).style.marginBottom = "20px";
  });

  // SVG icons - hide them for PDF
  const svgs = element.querySelectorAll("svg");
  svgs.forEach((svg) => {
    (svg as unknown as HTMLElement).style.display = "none";
  });

  // Ensure text is visible
  element.style.color = "#000000";
}

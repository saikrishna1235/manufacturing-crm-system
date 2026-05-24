import jsPDF from "jspdf";

const generateQuotation = (
  lead
) => {

  const doc = new jsPDF();

  // =========================
  // COLORS
  // =========================

  const primary =
    [30, 64, 175];

  const dark =
    [31, 41, 55];

  const gray =
    [107, 114, 128];

  // =========================
  // HEADER BACKGROUND
  // =========================

  doc.setFillColor(
    ...primary
  );

  doc.rect(
    0,
    0,
    210,
    40,
    "F"
  );

  // =========================
  // COMPANY NAME
  // =========================

  doc.setTextColor(255, 255, 255);

  doc.setFontSize(26);

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.text(
    "Manufacturing CRM",
    20,
    20
  );

  doc.setFontSize(12);

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.text(
    "Professional Business Quotation",
    20,
    30
  );

  // =========================
  // QUOTATION TITLE
  // =========================

  doc.setTextColor(
    ...dark
  );

  doc.setFontSize(22);

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.text(
    "QUOTATION",
    140,
    60
  );

  // =========================
  // QUOTATION BOX
  // =========================

  doc.setDrawColor(
    220,
    220,
    220
  );

  doc.roundedRect(
    20,
    55,
    80,
    35,
    3,
    3
  );

  doc.setFontSize(11);

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.text(
    "Quotation Date:",
    25,
    68
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.text(
    new Date().toLocaleDateString(),
    60,
    68
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.text(
    "Quotation ID:",
    25,
    80
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.text(
    lead._id.slice(-6),
    60,
    80
  );

  // =========================
  // CLIENT SECTION
  // =========================

  doc.setFillColor(
    243,
    244,
    246
  );

  doc.roundedRect(
    20,
    105,
    170,
    50,
    3,
    3,
    "F"
  );

  doc.setFontSize(15);

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.text(
    "CLIENT INFORMATION",
    25,
    120
  );

  doc.setFontSize(11);

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.text(
    `Client Name: ${lead.name}`,
    25,
    132
  );

  doc.text(
    `Company: ${lead.company}`,
    25,
    142
  );

  doc.text(
    `Email: ${
      lead.email || "N/A"
    }`,
    110,
    132
  );

  doc.text(
    `Phone: ${
      lead.phone || "N/A"
    }`,
    110,
    142
  );

  // =========================
  // PROPOSAL TABLE HEADER
  // =========================

  doc.setFillColor(
    ...primary
  );

  doc.rect(
    20,
    175,
    170,
    12,
    "F"
  );

  doc.setTextColor(
    255,
    255,
    255
  );

  doc.setFontSize(11);

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.text(
    "SERVICE",
    25,
    183
  );

  doc.text(
    "STATUS",
    95,
    183
  );

  doc.text(
    "AMOUNT",
    155,
    183
  );

  // =========================
  // PROPOSAL ROW
  // =========================

  doc.setDrawColor(
    220,
    220,
    220
  );

  doc.rect(
    20,
    187,
    170,
    25
  );

  doc.setTextColor(
    ...dark
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.text(
    lead.industry ||
      "Business Proposal",
    25,
    202
  );

  doc.text(
    lead.status,
    95,
    202
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.text(
    `₹ ${lead.expectedRevenue}`,
    155,
    202
  );

  // =========================
  // NOTES SECTION
  // =========================

  doc.setFontSize(15);

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.text(
    "PROJECT NOTES",
    20,
    230
  );

  doc.setFontSize(11);

  doc.setFont(
    "helvetica",
    "normal"
  );

  const notes =
    lead.notes ||
    "Thank you for considering our services. We look forward to working with you.";

  const splitNotes =
    doc.splitTextToSize(
      notes,
      170
    );

  doc.text(
    splitNotes,
    20,
    242
  );

  // =========================
  // FOOTER
  // =========================

  doc.setFillColor(
    ...dark
  );

  doc.rect(
    0,
    275,
    210,
    22,
    "F"
  );

  doc.setTextColor(
    255,
    255,
    255
  );

  doc.setFontSize(10);

  doc.text(
    "Thank you for your business",
    20,
    287
  );

  doc.text(
    "Authorized Signature",
    145,
    287
  );

  // =========================
  // SAVE PDF
  // =========================

  doc.save(
    `${lead.name}-quotation.pdf`
  );
};

export default generateQuotation;
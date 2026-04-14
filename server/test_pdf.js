const pdfParse = require('pdf-parse');
const fs = require('fs');
const PDFDocument = require('pdfkit');

async function createAndParsePDF() {
  const doc = new PDFDocument();
  doc.text('This is a simulated PDF resume for testing.');
  const buffers = [];
  
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', async () => {
    const pdfBuffer = Buffer.concat(buffers);
    try {
      const data = await pdfParse(pdfBuffer);
      console.log('PDF PARSED SUCCESSFULLY. TEXT:', data.text);
    } catch (e) {
      console.error('PDF PARSE ERROR:', e.message);
    }
  });
  
  doc.end();
}

createAndParsePDF();

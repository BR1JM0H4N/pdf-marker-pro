
// Display the file name after selecting a file
document.getElementById('pdfFile').addEventListener('change', function () {
const fileName = this.files[0]?.name || 'No file chosen';
document.getElementById('pdfFileName').textContent = fileName;
});

document.getElementById('logoFile').addEventListener('change', function () {
const fileName = this.files[0]?.name || 'No file chosen';
document.getElementById('logoFileName').textContent = fileName;
});

function processPDF() {
// Placeholder for PDF processing logic
const log = document.getElementById('log');
log.textContent = 'Processing started...';
}

function logMessage(message) {
const logArea = document.getElementById('log');
logArea.textContent += message + '\n';
logArea.scrollTop = logArea.scrollHeight;
}

async function processPDF() {
const pdfInput = document.getElementById('pdfFile');
const logoInput = document.getElementById('logoFile');
const status = document.getElementById('status');
const downloadLink = document.getElementById('downloadLink');

if (!pdfInput.files[0] || !logoInput.files[0]) {
status.textContent = 'Please upload both a PDF and a logo image.';
logMessage('Error: Missing PDF or logo image.');
return;
}

status.textContent = 'Processing...';
logMessage('Processing started...');

try {
logMessage('Loading PDF and logo files...');
const pdfBytes = await pdfInput.files[0].arrayBuffer();
const logoBytes = await logoInput.files[0].arrayBuffer();

const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
const logoImage = await pdfDoc.embedPng(new Uint8Array(logoBytes));
logMessage('PDF and logo loaded successfully.');

const pages = pdfDoc.getPages();
logMessage(`Processing ${pages.length} pages...`);

for (const page of pages) {
const { width, height } = page.getSize();
const logoWidth = width;
const logoHeight = (logoImage.height / logoImage.width) * logoWidth;

page.drawImage(logoImage, {
x: 0,
y: (height - logoHeight) / 2,
width: logoWidth,
height: logoHeight,
});
}

logMessage('Watermark applied to all pages.');

const watermarkedPdfBytes = await pdfDoc.save();
logMessage('Saving watermarked PDF...');

// Flattening logic
logMessage('Flattening the PDF...');
const pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc =
'pdf.worker.js';

const loadingTask = pdfjsLib.getDocument({ data: watermarkedPdfBytes });
const watermarkedPdf = await loadingTask.promise;

const flattenedPdfDoc = await PDFLib.PDFDocument.create();
for (let i = 1; i <= watermarkedPdf.numPages; i++) {
logMessage(`Flattening page ${i}...`);
const page = await watermarkedPdf.getPage(i);
const viewport = page.getViewport({ scale: 3 });
const canvas = document.createElement('canvas');
canvas.width = viewport.width;
canvas.height = viewport.height;
const ctx = canvas.getContext('2d');

await page.render({ canvasContext: ctx, viewport: viewport }).promise;

const imgData = canvas.toDataURL('image/png');
const embeddedImage = await flattenedPdfDoc.embedPng(imgData);

const pageWidth = viewport.width;
const pageHeight = viewport.height;
const newPage = flattenedPdfDoc.addPage([pageWidth, pageHeight]);
newPage.drawImage(embeddedImage, {
x: 0,
y: 0,
width: pageWidth,
height: pageHeight,
});
}

const flattenedPdfBytes = await flattenedPdfDoc.save();
logMessage('Flattened PDF created successfully.');

const blob = new Blob([flattenedPdfBytes], { type: 'application/pdf' });
const url = URL.createObjectURL(blob);

downloadLink.href = url;
downloadLink.style.display = 'inline';
status.textContent = 'PDF processed successfully!';
logMessage('Processing completed successfully!');
} catch (error) {
console.error(error);
status.textContent = 'An error occurred during processing.';
logMessage('Error: ' + error.message);
}
}

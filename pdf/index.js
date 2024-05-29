import fs from 'fs/promises';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Kafka } from 'kafkajs';

// Initialize Kafka producer
const kafka = new Kafka({
  clientId: 'pdf-creator',
  brokers: ['localhost:9092'], // Update with your Kafka broker address
});

const producer = kafka.producer();

async function createPDFAndSendMessage() {
  try {
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 30;
    page.drawText('Creating PDFs in JavaScript is awesome!', {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    });
    const pdfBytes = await pdfDoc.save();
    await fs.writeFile('output.pdf', pdfBytes);



    await producer.connect();
    
    // Send a message to Kafka
    await producer.send({
      topic: 'pdf-creation-events', // Update with your Kafka topic
      messages: [{ value: 'A new PDF has been created.' }],
    });

    console.log('PDF saved successfully.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await producer.disconnect();
  }
}

// Call the function to create the PDF and send the message
createPDFAndSendMessage();

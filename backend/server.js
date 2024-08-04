const express = require('express');
const { createCanvas, loadImage } = require('canvas');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));

app.post('/api/generate-og-image', upload.single('image'), async (req, res) => {
  const { title, content } = req.body;
  const image = req.file;

  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');

  // Set background
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, 1200, 630);

  // Draw title
  ctx.font = 'bold 40px Arial';
  ctx.fillStyle = '#333';
  ctx.fillText(title, 50, 80, 1100);

  // Draw content snippet
  ctx.font = '24px Arial';
  ctx.fillStyle = '#666';
  const contentSnippet = content.substring(0, 100) + '...';
  ctx.fillText(contentSnippet, 50, 150, 1100);

  // Draw image if provided
  if (image) {
    const img = await loadImage(image.buffer);
    ctx.drawImage(img, 50, 200, 500, 300);
  }

  // Add branding
  ctx.font = 'bold 30px Arial';
  ctx.fillStyle = '#007bff';
  ctx.fillText('YourBrand', 1000, 600);

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  const fileName = `og-image-${Date.now()}.png`;
  const filePath = path.join(__dirname, 'public', fileName);
  fs.writeFileSync(filePath, buffer);

  res.json({ ogImageUrl: `http://localhost:3001/public/${fileName}` });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
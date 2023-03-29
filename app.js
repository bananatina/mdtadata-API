const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');

const app = express();
const upload = multer({ dest: 'uploads/' });
const cors = require('cors');

app.use(cors({
  origin: 'https://fromzerotoone.net'
}));

app.post('/upload', upload.single('file'), (req, res) => {
  const { path } = req.file;
  exec(`exiftool -j ${path}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.status(500).json({ error: 'Failed to extract metadata' });
      return;
    }
    const metadata = JSON.parse(stdout)[0];
    res.json(metadata);
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));

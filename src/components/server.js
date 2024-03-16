const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.raw({ type: 'application/octet-stream' }));

app.post('/api/convert-gltf-to-dxf', (req, res) => {
  const inputFilePath = '/tmp/model.gltf';
  const outputFilePath = '/tmp/model.dxf';

  // Write GLTF data to a file
  fs.writeFile(inputFilePath, req.body, async (err) => {
    if (err) {
      console.error('Error writing GLTF file:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Execute the Python script to convert GLTF to DXF
    const pythonProcess = spawn('python', ['convert_gltf_to_dxf.py', inputFilePath, outputFilePath]);
    pythonProcess.on('exit', (code) => {
      if (code === 0) {
        // Read the converted DXF file and send it in the response
        const dxfData = fs.readFileSync(outputFilePath);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.send(dxfData);
      } else {
        console.error('Error converting GLTF to DXF');
        res.status(500).send('Internal Server Error');
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const quickScan = require('../models/quickScan');

const router = express.Router();

// Route to handle the quick scan
router.post('/quickScan', async (req, res) => {
    const { url, productName, productVersion } = req.body;

    // Validation
    if (!url || !productName) {
        return res.status(400).json({ message: 'URL and Product name are required' });
    }

    // Execute the Python script
    exec(`python ${path.join(__dirname, '..', 'python', 'quickScanD', 'quickScanP.py')} "${url}" "${productName}" "${productVersion}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing quickScan.py: ${error}`);
            return res.status(500).json({ message: 'Error executing quickScan.py' });
        }

        (async () => {
            try {
                // Parse the JSON output from the Python script
                const scanResults = JSON.parse(stdout);

                // Create a new quickScan document
                const newQuickScan = new quickScan(scanResults);
                await newQuickScan.save();

                // Count the total number of documents in the collection
                const totalDocs = await quickScan.countDocuments();

                // Respond with success and data
                res.status(201).json({
                    message: 'Quick scan completed',
                    scan: newQuickScan,
                    totalDocs
                });
            } catch (err) {
                res.status(500).json({ error: 'Error saving scan data or processing results' });
            }
        })();
    });
});

module.exports = router;

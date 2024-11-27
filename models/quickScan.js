const mongoose = require('mongoose');

const quickScanSchema = new mongoose.Schema({
    productName: { 
        type: String, 
        required: true // Product name must always be provided
    }, 
    productVersion: { 
        type: String, 
        default: "N/A" // Default for missing product version
    }, 
    oemName: { 
        type: String, 
        required: true // OEM name must always be provided
    }, 
    severityLevel: { 
        type: String, 
        default: "Unknown" // Default if severity is missing
    }, 
    vulnerabilityDescription: { 
        type: String, 
        default: "No description available" // Placeholder for missing descriptions
    }, 
    mitigationStrategy: { 
        type: String, 
        default: "Not provided" // Placeholder for missing mitigation strategies
    }, 
    publishedDate: { 
        type: Date, 
        default: null // Default as null for missing dates
    }, 
    uniqueIdentifier: { 
        type: String, 
        default: "No identifier" // Placeholder for missing CVE or ID
    }, 
    oemUrl: { 
        type: String, 
        required: true // OEM URL is required to store data
    },
    scannedAt: { 
        type: Date, 
        default: Date.now // Timestamp for when the scan was performed
    }
});

module.exports = mongoose.model('quickScan', quickScanSchema);

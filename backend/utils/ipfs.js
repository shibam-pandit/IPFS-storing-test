const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const { PINATA_API_Key, PINATA_API_Secret } = process.env;

// Function to pin files to IPFS via Pinata
const pinFilesToIPFS = async (files) => {
    const uploadedFileCids = [];

    for (let file of files) {
        const formData = new FormData();
        // Append the actual file buffer with the original filename
        formData.append('file', file.buffer, {
            filepath: path.basename(file.originalname),
        });

        const headers = {
            'pinata_api_key': PINATA_API_Key,
            'pinata_secret_api_key': PINATA_API_Secret,
            ...formData.getHeaders(),
        };

        try {
            const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, { headers });
            uploadedFileCids.push(response.data.IpfsHash);
        } catch (error) {
            console.error('Error uploading to Pinata:', error.response ? error.response.data : error.message);
            throw new Error('Pinata upload failed: ' + (error.response ? JSON.stringify(error.response.data) : error.message));
        }
    }

    return uploadedFileCids;
};

module.exports = { pinFilesToIPFS };

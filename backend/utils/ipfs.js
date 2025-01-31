// const { create } = require("ipfs-http-client");
// require("dotenv").config();

// // Debugging: Check the environment variables
// console.log("Using APILLON_URL:", process.env.APILLON_URL);
// console.log("Using APILLON_PROJECT_ID:", process.env.APILLON_PROJECT_ID);
// console.log("Using APILLON_SECRET:", process.env.APILLON_SECRET);

// // Set up IPFS client
// const client = create({
//   url: process.env.APILLON_URL,
//   headers: {
//     authorization: `Basic ${Buffer.from(process.env.APILLON_PROJECT_ID + ':' + process.env.APILLON_SECRET).toString('base64')}`,
//   },
// });

// // Debugging: Confirm that the client is set up correctly
// console.log("IPFS client set up successfully");

// // Function to upload files to IPFS
// const uploadFilesToIPFS = async (files) => {
//   console.log("Starting IPFS upload...");

//   try {
//     console.log(`Uploading ${files.length} file(s) to IPFS`);

//     const results = await Promise.all(files.map((file) => {
//       console.log(`Uploading file: ${file.name}`);
//       return client.add(file);
//     }));

//     console.log("Files uploaded successfully. CIDs:", results);

//     // Return CIDs for each file
//     return results.map((res) => res.cid.toString());
//   } catch (error) {
//     console.error("Error uploading files to IPFS:", error.message);
//     throw new Error("IPFS upload failed: " + error.message);
//   }
// };

// module.exports = { uploadFilesToIPFS };


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

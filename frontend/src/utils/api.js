import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllFolders = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/getAllFolders`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all folders:', error);
        return [];
    }
};

export const getUserFolders = async (userAddress) => {
    try {
        const response = await axios.get(`${API_URL}/api/getUserFolders/${userAddress}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching folders for user ${userAddress}:`, error);
        return [];
    }
};

export const uploadFolderToIPFS = async (files) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
        formData.append('file', file);
    });

    try {
        const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            headers: {
                'pinata_api_key': process.env.PINATA_API_KEY,
                'pinata_secret_api_key': process.env.PINATA_API_SECRET,
            },
        });
        return response.data.IpfsHash; // Return the CID of the uploaded folder/files
    } catch (error) {
        console.error('Error uploading folder to IPFS:', error);
    }
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { uploadFolderToIPFS } from '../utils/api';
import { connectWallet } from '../utils/web3';
import axios from 'axios';

const UploadFolder = () => {
    const [folderName, setFolderName] = useState('');
    const [files, setFiles] = useState([]);
    const [account, setAccount] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [cid, setCid] = useState('');

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleFolderNameChange = (e) => {
        setFolderName(e.target.value);
    };

    const handleUpload = async () => {
        if (!folderName || files.length === 0) {
            alert("Please provide a folder name and files.");
            return;
        }
    
        setIsLoading(true);
    
        try {
            // Connect wallet (if not already connected)
            const acc = await connectWallet();
            setAccount(acc);
    
            // Create FormData to send files along with folderName to the backend
            const formData = new FormData();
            formData.append('folderName', folderName);
            Array.from(files).forEach((file) => {
                formData.append('files', file); // Ensure the key is 'files'
            });
    
            // Send the folder name and files to the backend
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/uploadFolder`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'account': acc, // Ensure backend handles this header
                },
            });
    
            if (response.status === 200) {
                alert('Folder uploaded successfully!');
                setCid(response.data.cid || ''); // Update CID if provided
            } else {
                alert('Error uploading folder.');
            }
        } catch (error) {
            console.error('Error uploading folder to backend:', error.response ? error.response.data : error.message);
            alert('Failed to upload folder to backend.');
        }
    
        setIsLoading(false);
    };

    return (
        <div>
            <Link to="/">Home</Link>
            <h1>Upload Folder</h1>
            <input
                type="text"
                value={folderName}
                onChange={handleFolderNameChange}
                placeholder="Folder Name"
            />
            <input type="file" multiple directory="" webkitdirectory="" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={isLoading}>
                {isLoading ? 'Uploading...' : 'Upload'}
            </button>
            {cid && <p>Folder CID: {cid}</p>}
        </div>
    );
};

export default UploadFolder;

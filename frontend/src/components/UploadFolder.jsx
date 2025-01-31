// import React, { useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const UploadFolder = ({ account }) => {
//   const [folderName, setFolderName] = useState("");
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [cid, setCid] = useState("");

//   const handleFolderSelect = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setFiles(selectedFiles);
//   };

//   const uploadFolder = async () => {
//     if (!folderName || files.length === 0) {
//       alert("Please provide a folder name and select files.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const formData = new FormData();
//       files.forEach((file) => formData.append("files", file)); // Append files
//       formData.append("folderName", folderName); // Append folder name

//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/uploadFolder`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.data.success) {
//         setCid(response.data.cid);
//         alert("Folder uploaded successfully!");
//       }
//     } catch (error) {
//       alert("Error uploading folder: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Link to="/">Home</Link>
//       <h2>Upload Folder</h2>
//       <input
//         type="text"
//         placeholder="Enter folder name"
//         value={folderName}
//         onChange={(e) => setFolderName(e.target.value)}
//       />
//       <input type="file" multiple directory="" webkitdirectory="" onChange={handleFolderSelect} />
//       <button onClick={uploadFolder} disabled={loading}>
//         {loading ? "Uploading..." : "Upload Folder"}
//       </button>
//       {cid && <p>Folder CID: {cid}</p>}
//     </div>
//   );
// };

// export default UploadFolder;


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

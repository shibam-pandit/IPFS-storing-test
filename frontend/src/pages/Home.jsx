// // src/pages/Home.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   const [folders, setFolders] = useState([]);

//   useEffect(() => {
//     const fetchFolders = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getAllFolders`);
//         // Make sure we set an array for folders
//         setFolders(Array.isArray(response.data) ? response.data : []);
//       } catch (error) {
//         alert('Error fetching folders: ' + error.message);
//       }
//     };

//     fetchFolders();
//   }, []);

//   const handleDownload = (folder) => {
//     folder.files.forEach((file) => {
//       const link = document.createElement('a');
//       link.href = `${import.meta.env.VITE_APILLON_URL}/${file.cid}`;
//       link.download = file.cid;
//       link.click();
//     });
//   };

//   return (
//     <div>
//       <h2>All Folders</h2>
//       {folders.length > 0 ? (
//         folders.map((folder) => (
//           <div key={folder.folderName}>
//             <h3>{folder.folderName}</h3>
//             <button onClick={() => handleDownload(folder)}>Download Folder</button>
//           </div>
//         ))
//       ) : (
//         <p>No folders available</p>
//       )}
//       <Link to="/upload">Upload Folder</Link>
//       <br />
//       <Link to="/userfolders">Your uploaded folders</Link>
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllFolders } from '../utils/api.js';
import { connectWallet } from '../utils/web3.js';

const Home = () => {
    const [folders, setFolders] = useState([]);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const fetchFolders = async () => {
            const folder = await getAllFolders();
            setFolders(folder);
        };
        fetchFolders();
    }, []);

    useEffect(() => {
        const getWalletAccount = async () => {
            const connectedAccount = await connectWallet();
            setAccount(connectedAccount);
        };
        getWalletAccount();
    }, []);

    return (
        <div>
            <h1>All Uploaded Folders</h1>
            {!account && <button onClick={connectWallet}>Connect Wallet</button>}
            {account && <p>Connected Wallet: {account}</p>}
            <br />
            <Link to="/upload">Upload Folder</Link>
            <br />
            <Link to={`/user/${account}`}>Your Uploaded Folders</Link> {/* Pass account as address */}
            <div>
                {folders.map((folder) => (
                    <div key={folder[1]}>
                        <h3>
                            {folder[0]}{"       "}
                            <button onClick={() => downloadFolder(folder)}>
                                Download Folder
                            </button>
                        </h3>
                    </div>
                ))}
                {folders.length === 0 && <p>No folders available</p>}
            </div>
        </div>
    );
};

// Download folder logic
const downloadFolder = (folder) => {
    folder.files.forEach((file) => {
        const fileLink = `https://<CIDv1>.ipfs.web3approved.com/${file.cid}`;
        window.open(fileLink, '_blank');
    });
};

export default Home;

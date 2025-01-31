import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllFolders } from '../utils/api.js';
import { connectWallet } from '../utils/web3.js';

const Home = () => {
    const [folders, setFolders] = useState([]);
    const [account, setAccount] = useState(null);

    // Download folder logic
    const downloadFolder = (folder) => {
        console.log('Downloading folder:', folder);
    
        // Ensure folder.files is an array and contains file data
        if (folder[3] && Array.isArray(folder[3])) {
            folder[3].forEach((file) => {
                console.log('Downloading file:', file);
    
                // Check that the file array has the CID at index 0
                const cid = file[0]; // The CID is the first element in the file array
    
                // Construct the Pinaka IPFS gateway URL with the file's CID
                const fileLink = `https://gateway.pinata.cloud/ipfs/${cid}`;  // Pinaka gateway format
                window.open(fileLink, '_blank');
            });
        } else {
            console.error('No files available to download for this folder.');
        }
    };

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

export default Home;

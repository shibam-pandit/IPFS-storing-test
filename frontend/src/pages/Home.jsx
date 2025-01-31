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

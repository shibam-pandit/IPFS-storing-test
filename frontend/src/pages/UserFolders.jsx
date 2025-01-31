import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserFolders } from '../utils/api';
import { useParams } from 'react-router-dom'; // Import useParams

const UserFolder = () => {
    const { address } = useParams(); // Retrieve address from route parameters
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        const fetchUserFolders = async () => {
            const userFolders = await getUserFolders(address); // Use address instead of prop
            setFolders(userFolders);
        };
        fetchUserFolders();
    }, [address]); // Depend on address

    return (
        <div>
            <Link to="/">Home</Link>
            <h1>Folders Uploaded by {address}</h1>
            <div>
                {folders.map((folder) => (
                    <div key={folder.timestamp}>
                        <h3>{folder.folderName}</h3>
                        <button onClick={() => downloadFolder(folder)}>
                            Download Folder
                        </button>
                    </div>
                ))}
                {folders.length === 0 && <p>You have not uploaded any folder yet</p>}
            </div>
        </div>
    );
};

export default UserFolder;

// // src/pages/UserFolders.jsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const UserFolders = ({ account }) => {
//   const [folders, setFolders] = useState([]);

//   useEffect(() => {
//     if (account) {
//       const fetchUserFolders = async () => {
//         try {
//           const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getUserFolders/${account}`);
//           setFolders(Array.isArray(response.data) ? response.data : []);
//         } catch (error) {
//           alert('Error fetching user folders: ' + error.message);
//         }
//       };

//       fetchUserFolders();
//     }
//   }, [account]);

//   return (
//     <div>
//       <Link to="/">Home</Link>
//       <h2>Your Folders</h2>
//       {folders.length > 0 ? (
//         folders.map((folder) => (
//           <div key={folder.folderName}>
//             <h3>{folder.folderName}</h3>
//             <p>Uploaded on: {new Date(folder.timestamp * 1000).toLocaleString()}</p>
//           </div>
//         ))
//       ) : (
//         <p>No folders uploaded yet</p>
//       )}
//     </div>
//   );
// };

// export default UserFolders;


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

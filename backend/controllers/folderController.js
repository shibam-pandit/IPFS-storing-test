const { uploadFolder, getAllFolders, getUserFolders } = require('../utils/blockchain.js');
const { pinFilesToIPFS } = require('../utils/ipfs.js');

// Controller for uploading a folder
const uploadFolderHandler = async (req, res) => {
    const { folderName } = req.body;
    const files = req.files; // Retrieve uploaded files

    if (!folderName || !files || files.length === 0) {
        return res.status(400).send({ message: 'Folder name and files are required.' });
    }

    try {
        // Pin files to IPFS and get their CIDs
        const uploadedFileCids = await pinFilesToIPFS(files);

        // Upload folder details to the blockchain
        await uploadFolder(folderName, uploadedFileCids);
        
        res.status(200).send({ message: 'Folder uploaded successfully' });
    } catch (error) {
        console.error('Error in uploadFolderHandler:', error);
        res.status(500).send({ message: 'Error uploading folder', error: error.message });
    }
};

// Controller to get all folders
const getAllFoldersHandler = async (req, res) => {
    try {
        const folders = await getAllFolders();
        res.status(200).json(folders);
    } catch (error) {
        console.error('Error in getAllFoldersHandler:', error);
        res.status(500).send({ message: 'Error fetching folders', error: error.message });
    }
};

// Controller to get folders of a specific user
const getUserFoldersHandler = async (req, res) => {
    const { userAddress } = req.params;
    try {
        const folders = await getUserFolders(userAddress);
        res.status(200).json(folders);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching user folders', error: error.message });
    }
};

module.exports = { uploadFolderHandler, getAllFoldersHandler, getUserFoldersHandler };

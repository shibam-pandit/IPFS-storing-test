const { uploadFolderToBlockchain, getUserFoldersFromBlockchain, getAllFoldersFromBlockchain } = require('../utils/blockchain');

// Endpoint to upload a folder to blockchain
const uploadFolder = async (req, res) => {
    const { folderName, fileCids } = req.body;

    try {
        const transaction = await uploadFolderToBlockchain(folderName, fileCids);
        res.status(200).json({ success: true, transaction });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Endpoint to get all folders uploaded by a specific user
const getUserFolders = async (req, res) => {
    const { address } = req.params;
    try {
        const folders = await getUserFoldersFromBlockchain(address);
        res.status(200).json(folders);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Endpoint to get all uploaded folders
const getAllFolders = async (req, res) => {
    try {
        const folders = await getAllFoldersFromBlockchain();
        res.status(200).json(folders);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { uploadFolder, getUserFolders, getAllFolders };

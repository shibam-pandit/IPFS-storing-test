const express = require('express');
const { uploadFolder, getUserFolders, getAllFolders } = require('../controllers/blockchainController');

const router = express.Router();

// Upload folder to blockchain
router.post('/upload', uploadFolder);

// Get folders uploaded by a specific user
router.get('/user/:address', getUserFolders);

// Get all uploaded folders
router.get('/all', getAllFolders);

module.exports = router;

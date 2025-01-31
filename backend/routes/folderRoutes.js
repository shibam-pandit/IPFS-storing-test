const express = require('express');
const multer = require('multer'); // Import multer
const { uploadFolderHandler, getAllFoldersHandler, getUserFoldersHandler } = require('../controllers/folderController');
const router = express.Router();

// Configure multer for file storage (in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Use multer middleware for uploadFolder route
router.post('/uploadFolder', upload.array('files'), uploadFolderHandler);
router.get('/getAllFolders', getAllFoldersHandler);
router.get('/getUserFolders/:userAddress', getUserFoldersHandler);

module.exports = router;

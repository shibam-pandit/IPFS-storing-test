const express = require("express");
const { uploadFolderToIPFS, uploadMiddleware } = require("../controllers/ipfsController");

const router = express.Router();

router.post("/upload", uploadMiddleware, uploadFolderToIPFS);

module.exports = router;

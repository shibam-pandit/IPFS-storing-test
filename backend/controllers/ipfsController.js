const multer = require("multer");
const { uploadFilesToIPFS } = require("../utils/ipfs");

// Configure Multer to handle file uploads
const storage = multer.memoryStorage(); // Stores files in memory as buffers
const upload = multer({ storage });

// Middleware to handle folder uploads
const uploadMiddleware = upload.array("files"); // "files" should match the frontend field name

// Upload folder to Apillon Storage
const uploadFolderToIPFS = async (req, res) => {
  try {

    console.log("Received upload request:", req.body); // Log request data
        console.log("Received files:", req.files); // Log uploaded files

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded." });
    }

    const files = req.files.map((file) => ({
      originalname: file.originalname,
      content: file.buffer,
      mimetype: file.mimetype
    }));

    // Upload all files to Apillon Storage
    const result = await uploadFilesToIPFS(files);

    res.status(200).json({ success: true, bucketUuid: result.bucketUuid, sessionUuid: result.sessionUuid });
  } catch (error) {
    console.error("Error uploading folder to Apillon Storage:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Export both the middleware and controller function
module.exports = { uploadFolderToIPFS, uploadMiddleware };

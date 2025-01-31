// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const ipfsRoutes = require('./routes/ipfsRoutes');
// const blockchainRoutes = require('./routes/blockchainRoutes');

// const app = express();

// // Enable CORS for all routes
// app.use(cors({
//     origin: "http://localhost:5173", // Allow requests from React frontend
//     methods: "GET,POST,PUT,DELETE",
//     allowedHeaders: "Content-Type,Authorization",
//   }));

// app.use(express.json());

// // Routes
// app.use('/api/ipfs', ipfsRoutes);
// app.use('/api/blockchain', blockchainRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const folderRoutes = require('./routes/folderRoutes');

dotenv.config();
const app = express();

app.use(cors({
    origin: "http://localhost:5173", // Allow requests from React frontend
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization,account",
}));

app.use(express.json());
app.use('/api', folderRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

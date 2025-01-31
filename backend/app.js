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

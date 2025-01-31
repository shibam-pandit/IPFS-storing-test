import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import UserFolder from './pages/UserFolders.jsx';
import UploadFolder from './components/UploadFolder.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:address" element={<UserFolder />} /> {/* Ensure :address parameter */}
        <Route path="/upload" element={<UploadFolder />} />
      </Routes>
    </Router>
  );
}

export default App;

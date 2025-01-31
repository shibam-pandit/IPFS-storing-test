// // src/App.jsx
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ConnectWallet from './components/connectWallet.jsx';
// import Home from './pages/Home';
// import UploadFolder from './pages/UploadFolder.jsx';
// import UserFolders from './pages/UserFolders.jsx';

// const App = () => {
//   const [account, setAccount] = useState(null);

//   return (
//     <Router>
//       <div>
//         <h1>Web3 IPFS Storage</h1>
//         {!account ? (
//           <ConnectWallet setAccount={setAccount} />
//         ) : (
//           <div>
//             <h2>Welcome, {account}</h2>
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/upload" element={<UploadFolder account={account} />} />
//               <Route path="/userfolders" element={<UserFolders account={account} />} />
//             </Routes>
//           </div>
//         )}
//       </div>
//     </Router>
//   );
// };

// export default App;


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

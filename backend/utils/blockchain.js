// const Web3 = require('web3');
// const fs = require('fs');
// const path = require('path');
// const { abi } = require('../../smart_contracts/artifacts/contracts/IPFSStorage.sol/IPFSStorage.json');  // ABI for your contract

// const web3 = new Web3(process.env.POLYGON_RPC_URL);
// const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);

// // Get wallet address from private key
// const getWalletAddress = () => {
//     const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
//     return account.address;
// };

// // Upload folder details to blockchain
// const uploadFolderToBlockchain = async (folderName, fileCids) => {
//     const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
//     web3.eth.accounts.wallet.add(account);
    
//     const gas = await contract.methods.uploadFolder(folderName, fileCids).estimateGas({ from: account.address });
    
//     const transaction = await contract.methods.uploadFolder(folderName, fileCids).send({
//         from: account.address,
//         gas,
//         value: 0,
//     });

//     return transaction;
// };

// // Get all folders uploaded by a specific user
// const getUserFoldersFromBlockchain = async (address) => {
//     const folders = await contract.methods.getUserFolders(address).call();
//     return folders;
// };

// // Get all uploaded folders
// const getAllFoldersFromBlockchain = async () => {
//     const folders = await contract.methods.getAllFolders().call();
//     return folders;
// };

// module.exports = { uploadFolderToBlockchain, getUserFoldersFromBlockchain, getAllFoldersFromBlockchain };

require('dotenv').config();
const Web3 = require('web3');
const { CONTRACT_ADDRESS, PRIVATE_KEY, POLYGON_RPC_URL } = process.env;
const web3 = new Web3(POLYGON_RPC_URL);
const ABI = require('../../smart_contracts/artifacts/contracts/IPFSStorage.sol/IPFSStorage.json'); // Import ABI

const contractABI = ABI.abi;

const contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);

web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

// Function to upload a folder
const uploadFolder = async (_folderName, _fileCids) => {
    try {
        const tx = contract.methods.uploadFolder(_folderName, _fileCids);
        const gas = await tx.estimateGas({ from: account.address });
        const gasPrice = await web3.eth.getGasPrice();
        
        const data = tx.encodeABI();
        const signedTx = await web3.eth.accounts.signTransaction(
            {
                to: CONTRACT_ADDRESS,
                data: data,
                gas: gas,
                gasPrice: gasPrice,
            },
            PRIVATE_KEY
        );
        
        return await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    } catch (error) {
        console.error('Error uploading folder to blockchain:', error);
        throw error;
    }
};

// Function to get all folders
const getAllFolders = async () => {
    return await contract.methods.getAllFolders().call();
};

// Function to get user's folders
const getUserFolders = async (userAddress) => {
    return await contract.methods.getUserFolders(userAddress).call();
};

module.exports = { uploadFolder, getAllFolders, getUserFolders };

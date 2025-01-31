import Web3 from 'web3';

// Initialize Web3
export const web3 = new Web3(window.ethereum);

// MetaMask connection
export const connectWallet = async () => {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            return accounts[0];
        } catch (error) {
            console.error("Error connecting to wallet:", error);
        }
    } else {
        alert("Please install MetaMask!");
    }
};

// Get the user's MetaMask account
export const getAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
};

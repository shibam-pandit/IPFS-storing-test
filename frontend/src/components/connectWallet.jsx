// src/components/ConnectWallet.jsx
import React, { useState } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

const ConnectWallet = ({ setAccount }) => {
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    setLoading(true);
    try {
      const provider = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3(provider);
        await provider.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        setLoading(false);
      } else {
        alert('MetaMask is not installed!');
        setLoading(false);
      }
    } catch (err) {
      alert('Error connecting wallet!');
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={connectWallet} disabled={loading}>
        {loading ? 'Connecting...' : 'Connect MetaMask Wallet'}
      </button>
    </div>
  );
};

export default ConnectWallet;

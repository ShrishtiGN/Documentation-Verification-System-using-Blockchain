import React from 'react';
import { ethers } from 'ethers';

const App = () => {
    const [account, setAccount] = React.useState(null);

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
            } catch (error) {
                console.error('Failed to connect wallet:', error);
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        // Add your file upload logic, perhaps uploading to IPFS or a server
        console.log('File uploaded:', file);
    };

    return (
        <div>
            <h1>Document Verification System</h1>
            {account ? <p>Connected: {account}</p> : <button onClick={connectWallet}>Connect Wallet</button>}
            <input type="file" onChange={handleFileUpload} />
        </div>
    );
};

export default App;
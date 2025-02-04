import React, {useState} from 'react';
import './InviteForm.css';
import {BrowserProvider} from 'ethers';

function InviteForm() {
    const [code, setCode] = useState('');
    const [wallet, setWallet] = useState('');
    const [email, setEmail] = useState('');
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleConnectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                setWallet(address);
                setMessage("Wallet connected: " + address);
            } catch (error) {
                setError("Failed to connect wallet");
            }
        } else {
            setError("MetaMask is not installed");
        }
    };

    const handleVerifyCode = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            const verifyCodeResponse = await fetch(`http://localhost:5050/api/verifyCode?code=${code}`);
            const verifyCode = await verifyCodeResponse.json();

            if (!verifyCode.valid) {
                setError('Invalid or expired invite code');
            } else {
                setStep(2);
            }
        } catch (error) {
            setError('Network error');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await fetch('http://localhost:5050/api/reserve', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({code, email, wallet, signature: 'mock-signature'})
            });

            if (response.status === 200) {
                setMessage('Reservation successful');
            } else {
                const data = await response.json();
                setError(data.error || 'Error processing request');
            }
        } catch (error) {
            setError('Network error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="invite-container">
            {step === 1 && (
                <div className="invite-columns">
                    <div className="invite-section left-section">
                        <h2>I own a <span className="highlight">Moca NFT</span></h2>
                        <p>Own a Moca NFT(s) to claim Moca ID and get extra Moca holder benefits!</p>
                        <div className="nft-preview">
                            <img src="/images/image.webp" alt="NFT 1"/>
                            <img src="/images/image.webp" alt="NFT 2"/>
                            <img src="/images/image.webp" alt="NFT 3"/>
                        </div>
                        <p className="note">*Your Moca must be staked for the entire previous weekly staking period</p>
                        <button className="claim-button">Claim with Mocas!</button>
                    </div>

                    <div className="invite-section right-section">
                        <h2>Use My <span className="highlight">Invite Code</span></h2>
                        <p>Enter a Mocaverse distributed invite code to claim your own exclusive Moca ID!</p>
                        <div className="nft-preview">
                            <img src="/images/image.webp" alt="NFT 1"/>
                        </div>
                        <form onSubmit={handleVerifyCode}>
                            <input
                                type="text"
                                placeholder="Enter invite code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                            />
                            <button type="submit" className="claim-button" disabled={loading}>
                                {loading ? 'Verifying...' : 'Claim with Code!'}
                            </button>
                        </form>
                        {error && <p className="error-text">{error}</p>}
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="invite-section">
                    <h2>Connect Your <span className="highlight">Wallet</span></h2>
                    <button onClick={handleConnectWallet} className="claim-button">
                        {wallet ? `Connected: ${wallet.slice(0, 6)}...${wallet.slice(-4)}` : "Connect Wallet"}
                    </button>
                    {wallet && (
                        <div><button className="claim-button" onClick={() => setStep(3)}>Proceed to Email</button></div>
                    )}
                </div>
            )}

            {step === 3 && (
                <div className="invite-section">
                    <h2>Enter Your <span className="highlight">Email</span></h2>
                    <p>Provide your email to complete the reservation process.</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className="claim-button" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                    {error && <p className="error-text">{error}</p>}
                    {message && <p className="success-text">{message}</p>}
                </div>
            )}
        </div>
    );
}

export default InviteForm;

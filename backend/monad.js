const { ethers } = require('ethers');
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.MONAD_RPC_URL || "https://testnet-rpc.monad.xyz");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || ethers.Wallet.createRandom().privateKey, provider);

// Placeholder ABIs for Demo Mode / Mocking if not deployed
const RegistryABI = [
    "function registerVC(string _did, string _claimHash, string _zkProof) external",
    "function verifyVC(string _did) external view returns (bool, string)"
];

const EscrowABI = [
    "function approveClaim(string _did, uint256 _amount) external",
    "function approvals(string) external view returns (uint256, bool, uint256)"
];

const registryContract = new ethers.Contract(
    process.env.SURVIVOR_REGISTRY_ADDRESS || ethers.ZeroAddress,
    RegistryABI,
    wallet
);

const escrowContract = new ethers.Contract(
    process.env.ESCROW_ADDRESS || ethers.ZeroAddress,
    EscrowABI,
    wallet
);

module.exports = {
    provider,
    wallet,
    registryContract,
    escrowContract
};

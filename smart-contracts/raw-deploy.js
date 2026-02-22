import { ethers } from "ethers";
import fs from "fs";

const PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // Default Hardhat Account #0
const RPC_URL = "http://127.0.0.1:8545";

async function main() {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    console.log("Using account:", wallet.address);

    const registryPath = "./artifacts/contracts/SurvivorVCRegistry.sol/SurvivorVCRegistry.json";
    const escrowPath = "./artifacts/contracts/ReliefThresholdEscrow.sol/ReliefThresholdEscrow.json";

    const registryJson = JSON.parse(fs.readFileSync(registryPath, "utf8"));
    const escrowJson = JSON.parse(fs.readFileSync(escrowPath, "utf8"));

    const RegistryFactory = new ethers.ContractFactory(registryJson.abi, registryJson.bytecode, wallet);
    console.log("Deploying SurvivorVCRegistry...");
    const registry = await RegistryFactory.deploy();
    await registry.waitForDeployment();
    const registryAddr = await registry.getAddress();
    console.log("Registry deployed to:", registryAddr);

    const EscrowFactory = new ethers.ContractFactory(escrowJson.abi, escrowJson.bytecode, wallet);
    console.log("Deploying ReliefThresholdEscrow...");
    const escrow = await EscrowFactory.deploy();
    await escrow.waitForDeployment();
    const escrowAddr = await escrow.getAddress();
    console.log("Escrow deployed to:", escrowAddr);

    console.log(`\nDeployment Complete!`);
    console.log(`SURVIVOR_REGISTRY_ADDRESS=${registryAddr}`);
    console.log(`ESCROW_ADDRESS=${escrowAddr}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

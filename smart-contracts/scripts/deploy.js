import hre from "hardhat";

async function main() {
    console.log("Starting deployment to Local Monad Testnet...");

    // Explicitly grab the signers from the hardhat provider
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);

    const Registry = await hre.ethers.getContractFactory("SurvivorVCRegistry");
    const registry = await Registry.deploy();
    await registry.waitForDeployment();
    const registryAddress = await registry.getAddress();
    console.log("Registry deployed to:", registryAddress);

    const Escrow = await hre.ethers.getContractFactory("ReliefThresholdEscrow");
    const escrow = await Escrow.deploy();
    await escrow.waitForDeployment();
    const escrowAddress = await escrow.getAddress();
    console.log("Escrow deployed to:", escrowAddress);

    console.log("Deployment Complete!");
    console.log(`\nRegistry: ${registryAddress}\nEscrow: ${escrowAddress}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

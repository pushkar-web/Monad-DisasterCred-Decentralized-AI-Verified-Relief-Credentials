import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("DisasterCred", (m) => {
    const registry = m.contract("SurvivorVCRegistry");
    const escrow = m.contract("ReliefThresholdEscrow");

    return { registry, escrow };
});

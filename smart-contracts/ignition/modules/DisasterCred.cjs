const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DisasterCred", (m) => {
    const registry = m.contract("SurvivorVCRegistry");
    const escrow = m.contract("ReliefThresholdEscrow");

    return { registry, escrow };
});

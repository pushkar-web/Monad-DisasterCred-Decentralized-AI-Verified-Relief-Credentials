import "@nomicfoundation/hardhat-ethers";
import * as dotenv from "dotenv";
import * as ethers from "ethers";
dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
export default {
  solidity: "0.8.20",
  networks: {
    monadTestnet: {
      url: process.env.MONAD_TESTNET_RPC || "https://testnet-rpc.monad.xyz",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 10143
    },
    localMonadTestnet: {
      url: "http://127.0.0.1:8545",
      chainId: 10143
    }
  }
};

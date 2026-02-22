# 🌊 DisasterCred — Decentralized AI-Verified Relief Credentials

**DisasterCred** is a decentralized disaster relief platform that combines **AI-powered damage verification**, **blockchain-backed credential issuance**, and **multi-stakeholder governance** to ensure transparent, tamper-proof, and equitable distribution of relief funds to verified survivors.

Built on the **Monad blockchain** for high-throughput, low-cost on-chain operations.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Mobile App (Expo/React Native)          │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐ │
│  │ Victim Flow  │  │  NGO Flow    │  │ Government Flow   │ │
│  │ • Create     │  │ • Review     │  │ • National        │ │
│  │   Claim      │  │   Claims     │  │   Overview        │ │
│  │ • AI Verify  │  │ • QR Scan    │  │ • District        │ │
│  │ • Track      │  │ • Approve/   │  │   Analytics       │ │
│  │   Status     │  │   Reject     │  │ • Blockchain      │ │
│  │ • Wallet     │  │ • Dashboard  │  │   Audit Trail     │ │
│  └──────┬───────┘  └──────┬───────┘  └───────┬───────────┘ │
└─────────┼─────────────────┼──────────────────┼─────────────┘
          │                 │                  │
          ▼                 ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                   Express.js Backend API                     │
│   POST /claim  •  POST /generate-zk  •  POST /sync         │
│   GET /status/:did  •  SQLite Database                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Monad Blockchain (Testnet)                      │
│   ┌──────────────────────┐  ┌────────────────────────────┐  │
│   │ SurvivorVCRegistry   │  │ ReliefThresholdEscrow      │  │
│   │ • Issue credentials  │  │ • Multi-NGO approval       │  │
│   │ • ZK proof storage   │  │ • Threshold-based release  │  │
│   │ • On-chain verify    │  │ • Automated fund disburst  │  │
│   └──────────────────────┘  └────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features

### 🤖 AI-Powered Damage Verification
- Survivors upload geo-tagged photos and voice memos
- AI analyzes damage severity, type, and estimated loss
- Generates verifiable claim data without requiring manual inspections

### 🔗 Blockchain-Backed Credentials (Monad)
- **SurvivorVCRegistry**: Issues on-chain Verifiable Credentials tied to a DID (Decentralized Identifier)
- **ReliefThresholdEscrow**: Holds relief funds in escrow, releasing only after a multi-NGO approval threshold (3-of-N) is met
- ZK-proof simulation for privacy-preserving eligibility verification

### 📱 Three-Role Mobile App
| Role | Features |
|------|----------|
| **Victim** | Create claims with photos/voice, AI damage assessment, claim tracker, digital wallet, offline-first sync |
| **NGO** | Review submitted claims, QR-based identity scanning, approve/reject with on-chain recording |
| **Government** | National disaster overview, per-district analytics, full blockchain audit trail |

### 🔒 Offline-First & Privacy-Preserving
- Claims can be created offline and batch-synced when connectivity returns
- ZK proofs ensure sensitive data stays off-chain while eligibility is provable on-chain

---

## 📂 Project Structure

```
DisasterCred/
├── backend/                  # Express.js API server
│   ├── server.js             # REST API endpoints
│   ├── database.js           # SQLite setup & schema
│   ├── monad.js              # Monad blockchain integration (ethers.js)
│   └── uploads/              # Uploaded claim photos
├── mobile/                   # React Native / Expo app
│   └── src/
│       ├── components/       # Shared UI (Layout, BottomNavs)
│       ├── constants/        # Theme & design tokens
│       ├── context/          # Auth context provider
│       ├── navigation/       # Stack & tab navigators
│       └── screens/
│           ├── Victim/       # Claim creation, AI result, wallet, status
│           ├── NGO/          # Dashboard, claim review, QR scanner
│           └── Government/   # National overview, analytics, audit
├── smart-contracts/          # Solidity + Hardhat
│   ├── contracts/
│   │   ├── SurvivorVCRegistry.sol      # Verifiable Credential registry
│   │   └── ReliefThresholdEscrow.sol   # Multi-sig escrow with threshold
│   ├── scripts/deploy.js    # Deployment script
│   └── hardhat.config.js    # Monad testnet config
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **Expo CLI** — `npm install -g expo-cli`
- **Hardhat** — included in smart-contracts dev dependencies
- A **Monad Testnet** wallet with test tokens ([Monad Faucet](https://faucet.monad.xyz))

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=3000
MONAD_RPC_URL=https://testnet-rpc.monad.xyz
PRIVATE_KEY=your_wallet_private_key
SURVIVOR_REGISTRY_ADDRESS=0x_deployed_registry_address
ESCROW_ADDRESS=0x_deployed_escrow_address
```

Start the server:

```bash
node server.js
```

### 2. Smart Contracts

```bash
cd smart-contracts
npm install
```

Deploy to Monad Testnet:

```bash
npx hardhat run scripts/deploy.js --network monadTestnet
```

Update the deployed contract addresses in `backend/.env`.

### 3. Mobile App

```bash
cd mobile
npm install
expo start
```

Scan the QR code with **Expo Go** (Android/iOS) or press `w` for web.

---

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/claim` | Submit a new relief claim (multipart with photos) |
| `POST` | `/generate-zk` | Generate ZK proof & record credential on-chain |
| `POST` | `/sync` | Batch sync offline claims |
| `GET` | `/status/:did` | Get claim status, approvals, and threshold progress |

---

## ⛓️ Smart Contracts

### SurvivorVCRegistry
- `issueCredential(did, claimHash, zkProof)` — Owner issues a verified credential
- `verifyCredential(did)` — Anyone can verify a survivor's credential on-chain

### ReliefThresholdEscrow
- `createRequest(claimId, recipient, amount)` — Owner creates a relief request
- `approveRequest(claimId)` — Authorized NGOs approve (threshold: 3 approvals)
- Auto-releases funds to the survivor wallet once the threshold is met
- `authorizeNGO(ngo)` — Owner whitelists NGO addresses

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Blockchain** | Monad Testnet (EVM-compatible, Chain ID 10143) |
| **Smart Contracts** | Solidity 0.8.20, OpenZeppelin, Hardhat |
| **Backend** | Node.js, Express.js, SQLite3, ethers.js |
| **Mobile** | React Native, Expo SDK 54, React Navigation |
| **AI/ML** | On-device damage classification (photo + voice analysis) |
| **Identity** | DID-based identity, QR code scanning, ZK proofs |

---

## 🤝 How It Works

1. **Survivor** creates a claim with geo-tagged photos and a voice description
2. **AI engine** analyzes the evidence and produces a damage assessment score
3. **Backend** generates a ZK proof and issues a Verifiable Credential on-chain via `SurvivorVCRegistry`
4. **NGOs** review claims, scan QR identities, and cast on-chain approvals
5. **ReliefThresholdEscrow** automatically releases funds once 3+ NGOs approve
6. **Government** monitors all activity through a real-time blockchain audit dashboard

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).

---

## 👥 Team

Built for the **Monad Hackathon** — bringing trust, transparency, and speed to disaster relief through decentralized AI-verified credentials.

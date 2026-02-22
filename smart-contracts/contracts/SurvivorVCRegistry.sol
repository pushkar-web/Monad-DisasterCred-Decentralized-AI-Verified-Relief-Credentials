// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SurvivorVCRegistry is Ownable {
    struct Credential {
        bytes32 claimHash;
        string zkProof;
        uint256 timestamp;
        bool isVerified;
    }

    mapping(string => Credential) public credentials; // DID -> Credential
    mapping(string => bool) public hasCredential;

    event CredentialIssued(string indexed did, bytes32 claimHash);

    constructor() Ownable(msg.sender) {}

    function issueCredential(string memory did, bytes32 claimHash, string memory zkProof) external onlyOwner {
        credentials[did] = Credential({
            claimHash: claimHash,
            zkProof: zkProof,
            timestamp: block.timestamp,
            isVerified: true
        });
        hasCredential[did] = true;
        emit CredentialIssued(did, claimHash);
    }

    function verifyCredential(string memory did) external view returns (bool) {
        return hasCredential[did] && credentials[did].isVerified;
    }
}

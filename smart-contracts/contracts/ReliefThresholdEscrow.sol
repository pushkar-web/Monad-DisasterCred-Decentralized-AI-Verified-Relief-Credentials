// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ReliefThresholdEscrow is Ownable {
    struct ReliefRequest {
        string claimId;
        address payable recipient;
        uint256 amount;
        uint256 approvals;
        bool fundsReleased;
        mapping(address => bool) hasApproved;
    }

    mapping(string => ReliefRequest) public requests;
    mapping(address => bool) public authorizedNGOs;
    uint256 public constant APPROVAL_THRESHOLD = 3;

    event ReliefApproved(string claimId, address ngo);
    event FundsReleased(string claimId, uint256 amount);

    constructor() Ownable(msg.sender) {}

    function authorizeNGO(address ngo) external onlyOwner {
        authorizedNGOs[ngo] = true;
    }

    function createRequest(string memory claimId, address payable recipient, uint256 amount) external onlyOwner {
        require(requests[claimId].recipient == address(0), "Request exists");
        ReliefRequest storage r = requests[claimId];
        r.claimId = claimId;
        r.recipient = recipient;
        r.amount = amount;
    }

    function approveRequest(string memory claimId) external {
        require(authorizedNGOs[msg.sender], "Not authorized NGO");
        ReliefRequest storage r = requests[claimId];
        require(!r.hasApproved[msg.sender], "Already approved");
        require(!r.fundsReleased, "Already released");

        r.hasApproved[msg.sender] = true;
        r.approvals += 1;

        emit ReliefApproved(claimId, msg.sender);

        if (r.approvals >= APPROVAL_THRESHOLD) {
            _releaseFunds(claimId);
        }
    }

    function _releaseFunds(string memory claimId) internal {
        ReliefRequest storage r = requests[claimId];
        r.fundsReleased = true;
        r.recipient.transfer(r.amount);
        emit FundsReleased(claimId, r.amount);
    }

    receive() external payable {}
}

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract DocumentVerification {
    struct Document {
        bytes32 hash;
        address uploader;
        uint256 timestamp;
    }

    mapping(bytes32 => Document) private documents;

    event DocumentUploaded(bytes32 indexed hash, address indexed uploader, uint256 timestamp);

    function uploadDocument(bytes32 _hash) public {
        require(documents[_hash].timestamp == 0, "Document already exists");

        documents[_hash] = Document({
            hash: _hash,
            uploader: msg.sender,
            timestamp: block.timestamp
        });

        emit DocumentUploaded(_hash, msg.sender, block.timestamp);
    }

    function verifyDocument(bytes32 _hash) public view returns (address, uint256) {
        Document memory doc = documents[_hash];
        require(doc.timestamp != 0, "Document not found");
        return (doc.uploader, doc.timestamp);
    }
}
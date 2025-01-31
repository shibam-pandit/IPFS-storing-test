// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract IPFSStorage {
    // Struct for a File
    struct File {
        string cid;
        uint256 timestamp;
    }

    // Struct for a Folder
    struct Folder {
        string folderName;
        address uploader;
        uint256 timestamp;
        File[] files;
    }

    mapping(address => Folder[]) private userFolders;  // Mapping user to their uploaded folders
    Folder[] public allFolders;  // List of all uploaded folders

    event FolderUploaded(address indexed uploader, string folderName, uint256 timestamp);
    event FileUploaded(address indexed uploader, string folderName, string cid, uint256 timestamp);

    // Upload a folder (store folder details on-chain with multiple files)
    function uploadFolder(string memory _folderName, string[] memory _fileCids) external {
        require(bytes(_folderName).length > 0, "Folder name cannot be empty");
        require(_fileCids.length > 0, "At least one file must be uploaded in the folder");

        Folder storage newFolder = userFolders[msg.sender].push();
        newFolder.folderName = _folderName;
        newFolder.uploader = msg.sender;
        newFolder.timestamp = block.timestamp;

        // Add files to the folder
        for (uint i = 0; i < _fileCids.length; i++) {
            newFolder.files.push(File(_fileCids[i], block.timestamp));
            emit FileUploaded(msg.sender, _folderName, _fileCids[i], block.timestamp);
        }

        // Add to the global list of all folders
        allFolders.push(newFolder);
        emit FolderUploaded(msg.sender, _folderName, block.timestamp);
    }

    // Retrieve all folders uploaded by a specific user
    function getUserFolders(address _user) external view returns (Folder[] memory) {
        return userFolders[_user];
    }

    // Retrieve all folders uploaded by any user (for homepage view)
    function getAllFolders() external view returns (Folder[] memory) {
        return allFolders;
    }
}

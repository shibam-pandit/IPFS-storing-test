const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const Contract = await ethers.getContractFactory("IPFSStorage");

  // Deploy the contract
  const contract = await Contract.deploy();

  // Wait for the contract to be deployed
  await contract.waitForDeployment(); 

  // Get the deployed contract address
  console.log(`Contract deployed at: ${await contract.getAddress()}`);
}

// Run the deployment script
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
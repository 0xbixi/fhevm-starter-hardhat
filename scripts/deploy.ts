import { ethers } from "hardhat";
import { PrivateCounter } from "../typechain-types";

async function main() {
  console.log("🚀 Starting PrivateCounter deployment...");

  try {
    // Check environment variables
    const privateKey = process.env.PRIVATE_KEY;
    const rpcUrl = process.env.RPC_URL;
    
    if (!privateKey) {
      throw new Error("❌ PRIVATE_KEY environment variable is not set. Please check your network configuration and private key.");
    }
    
    if (!rpcUrl) {
      console.log("⚠️  RPC_URL not set, using default localhost");
    }

    // Get the deployer account
    const signers = await ethers.getSigners();
    if (signers.length === 0) {
      throw new Error("❌ No signers available for deployment. Please check your network configuration and private key.");
    }
    const deployer = signers[0]!; // Non-null assertion since we checked length above
    console.log("📝 Deploying with account:", deployer.address);

    // Check deployer balance
    const balance = await ethers.provider.getBalance(deployer.address);
    console.log("💰 Account balance:", ethers.formatEther(balance), "ETH");

    if (balance === 0n) {
      throw new Error("❌ Deployer account has no ETH balance");
    }

    // Get the contract factory
    console.log("🏭 Getting PrivateCounter contract factory...");
    const PrivateCounterFactory = await ethers.getContractFactory("PrivateCounter");

    // Deploy the contract
    console.log("⏳ Deploying PrivateCounter contract...");
    const privateCounter: PrivateCounter = await PrivateCounterFactory.deploy();

    // Wait for deployment to be mined
    console.log("⛏️  Waiting for deployment transaction to be mined...");
    await privateCounter.waitForDeployment();

    // Get the deployed contract address
    const contractAddress = await privateCounter.getAddress();
    console.log("✅ PrivateCounter deployed successfully!");
    console.log("📍 Contract address:", contractAddress);
    console.log("🔗 Transaction hash:", privateCounter.deploymentTransaction()?.hash);

    // Verify the deployment by calling a view function
    console.log("🔍 Verifying deployment...");
    const owner = await privateCounter.owner();
    const currentValue = await privateCounter.current();

    console.log("👤 Contract owner:", owner);
    console.log("🔢 Initial counter value:", currentValue.toString());

    // Save deployment info to a file for later use
    const deploymentInfo = {
      contractAddress,
      deployerAddress: deployer.address,
      deploymentTime: new Date().toISOString(),
      network: (await ethers.provider.getNetwork()).name,
      transactionHash: privateCounter.deploymentTransaction()?.hash,
    };

    console.log("\n📋 Deployment Summary:");
    console.log("=".repeat(50));
    console.log(`Contract Address: ${contractAddress}`);
    console.log(`Deployer: ${deployer.address}`);
    console.log(`Network: ${deploymentInfo.network}`);
    console.log(`Deployment Time: ${deploymentInfo.deploymentTime}`);
    console.log("=".repeat(50));

    console.log("\n💡 Next steps:");
    console.log(`1. Set COUNTER_ADDR=${contractAddress} in your .env file`);
    console.log("2. Run interaction script: npx hardhat run scripts/interact.ts");
    console.log("3. Run tests: npx hardhat test");
  } catch (error) {
    console.error("❌ Deployment failed:");
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      if (error.stack) {
        console.error("Stack trace:", error.stack);
      }
    } else {
      console.error("Unknown error:", error);
    }
    process.exitCode = 1;
  }
}

// Execute the deployment
main().catch((error) => {
  console.error("💥 Unhandled error in deployment script:");
  console.error(error);
  process.exitCode = 1;
});

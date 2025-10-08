import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  console.log("🔗 Starting PrivateCounter interaction script...");

  try {
    // Get the signer
    const signers = await ethers.getSigners();
    const signer = signers[0];
    if (!signer) {
      throw new Error("❌ No signer available for interaction");
    }
    console.log("👤 Interacting with account:", signer.address);

    // Get contract address from environment
    const contractAddress = process.env.COUNTER_ADDR;
    if (!contractAddress) {
      throw new Error(
        "❌ COUNTER_ADDR not set in environment variables. Please deploy the contract first and set the address in .env file.",
      );
    }

    console.log("📍 Contract address:", contractAddress);

    // Get the contract instance
    const privateCounter = await ethers.getContractAt("PrivateCounter", contractAddress);

    // Verify contract is accessible
    console.log("🔍 Verifying contract accessibility...");
    const owner = await privateCounter.owner();
    console.log("👑 Contract owner:", owner);

    // Check if current signer is the owner
    const isOwner = owner.toLowerCase() === signer.address.toLowerCase();
    console.log("🔐 Is current signer the owner?", isOwner);

    if (!isOwner) {
      console.log(
        "⚠️  Warning: Current signer is not the contract owner. Some operations may fail.",
      );
    }

    // Display current counter value
    console.log("\n📊 Current State:");
    console.log("=".repeat(30));
    const currentValue = await privateCounter.current();
    console.log(`Counter Value: ${currentValue.toString()}`);
    console.log("=".repeat(30));

    if (isOwner) {
      console.log("\n🎮 Performing contract operations...");

      // Increment the counter
      console.log("⬆️  Incrementing counter by 5...");
      const incrementTx = await privateCounter.increment(5);
      await incrementTx.wait();
      console.log("✅ Increment transaction confirmed");

      // Check new value
      const afterIncrement = await privateCounter.current();
      console.log(`📈 Counter after increment: ${afterIncrement.toString()}`);

      // Increment again with a different value
      console.log("⬆️  Incrementing counter by 3...");
      const increment2Tx = await privateCounter.increment(3);
      await increment2Tx.wait();
      console.log("✅ Second increment transaction confirmed");

      // Check new value
      const afterSecondIncrement = await privateCounter.current();
      console.log(`📈 Counter after second increment: ${afterSecondIncrement.toString()}`);

      // Decrement the counter
      console.log("⬇️  Decrementing counter by 2...");
      const decrementTx = await privateCounter.decrement(2);
      await decrementTx.wait();
      console.log("✅ Decrement transaction confirmed");

      // Check new value
      const afterDecrement = await privateCounter.current();
      console.log(`📉 Counter after decrement: ${afterDecrement.toString()}`);

      // Demonstrate event listening
      console.log("\n👂 Setting up event listeners for next operations...");

      // Listen for Incremented events
      privateCounter.on(privateCounter.filters.Incremented(), (by, newValue, event) => {
        console.log(`🎉 Event: Counter incremented by ${by} to ${newValue.toString()}`);
      });

      // Listen for Reset events
      privateCounter.on(privateCounter.filters.Reset(), (oldValue, event) => {
        console.log(`🎉 Event: Counter reset from ${oldValue.toString()}`);
      });

      // Perform one more increment to trigger event
      console.log("⬆️  Final increment by 10 (with event listening)...");
      const finalIncrementTx = await privateCounter.increment(10);
      await finalIncrementTx.wait();

      // Wait a bit for events to be processed
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Final state
      const finalValue = await privateCounter.current();
      console.log(`🏁 Final counter value: ${finalValue.toString()}`);

      // Optional: Reset counter (uncomment if you want to reset)
      // console.log("🔄 Resetting counter to zero...");
      // const resetTx = await privateCounter.reset();
      // await resetTx.wait();
      // console.log("✅ Reset transaction confirmed");
      // const afterReset = await privateCounter.current();
      // console.log(`🔄 Counter after reset: ${afterReset.toString()}`);
    } else {
      console.log("\n⚠️  Skipping owner-only operations since current signer is not the owner.");
      console.log("💡 To perform operations, use the owner account or transfer ownership.");
    }

    // Display transaction costs summary
    console.log("\n💰 Gas Usage Summary:");
    console.log("=".repeat(40));
    console.log("ℹ️  Gas costs depend on network conditions");
    console.log("ℹ️  Increment/Decrement: ~30,000-50,000 gas");
    console.log("ℹ️  Reset: ~25,000-40,000 gas");
    console.log("ℹ️  Transfer Ownership: ~25,000-40,000 gas");
    console.log("=".repeat(40));

    console.log("\n✨ Interaction script completed successfully!");
  } catch (error) {
    console.error("❌ Interaction script failed:");
    if (error instanceof Error) {
      console.error("Error message:", error.message);

      // Provide helpful error messages for common issues
      if (error.message.includes("COUNTER_ADDR")) {
        console.error("\n💡 Solution: Run the deployment script first:");
        console.error("   npx hardhat run scripts/deploy.ts --network localhost");
        console.error("   Then copy the contract address to your .env file");
      } else if (error.message.includes("caller is not the owner")) {
        console.error("\n💡 Solution: Use the owner account or transfer ownership");
      } else if (error.message.includes("network")) {
        console.error("\n💡 Solution: Make sure your network is running:");
        console.error("   npx hardhat node");
      }
    } else {
      console.error("Unknown error:", error);
    }
    process.exitCode = 1;
  }
}

// Execute the interaction script
main().catch((error) => {
  console.error("💥 Unhandled error in interaction script:");
  console.error(error);
  process.exitCode = 1;
});
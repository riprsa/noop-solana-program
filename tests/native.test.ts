import * as web3 from "@solana/web3.js";
import dotenv from "dotenv";

dotenv.config();

// its an array of numbers as a string
const ppk = process.env.PROGRAM_PRIVATE_KEY;
const ppkArray = ppk.slice(1, -1).split(",").map(Number);

const dpk = process.env.DEPLOYER_PRIVATE_KEY;
const dpkArray = dpk.slice(1, -1).split(",").map(Number);

// Manually initialize variables that are automatically defined in Playground
const PROGRAM_ID = web3.Keypair.fromSecretKey(Buffer.from(ppkArray)).publicKey;
const connection = new web3.Connection("https://api.devnet.solana.com", "confirmed");
const wallet = {
  keypair: web3.Keypair.fromSecretKey(Buffer.from(dpkArray)),
};

describe("Test", () => {
  it("noop", async () => {

    // Create greet instruction
    const greetIx = new web3.TransactionInstruction({
      keys: [],
      programId: PROGRAM_ID,
    });

    // Create transaction and add the instructions
    const tx = new web3.Transaction();
    tx.add(greetIx);

    // Send and confirm the transaction
    const txHash = await web3.sendAndConfirmTransaction(connection, tx, [
      wallet.keypair,
    ]);
    console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);
  });
});

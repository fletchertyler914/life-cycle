import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { LifeCycle } from "../target/types/life_cycle";

describe("life-cycle", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.LifeCycle as Program<LifeCycle>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});

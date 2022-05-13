# Life Cycle
This is a WIP that serves as a CM Creator/Closer (via Sugar), and enables a Life Cycle on the (specified) minted NFTs.

## Dependencies (Install First):
- [Metaplex Sugar](http://docs.metaplex.com/sugar/installation)
- [Metaboss](https://metaboss.rs/overview.html)

## Run Steps:
- Step 1: `yarn run init_project`
- Step 2: Copy [assets](http://docs.metaplex.com/candy-machine-v2/preparing-assets) into `./assets`
- Step 3: `yarn run create_candy_machine`
- Step 4: Find and Replace '<DEVNET_CM_ID>' With New Candy Machine ID 
- Step 5: `yarn run start_lifecycle:devnet`

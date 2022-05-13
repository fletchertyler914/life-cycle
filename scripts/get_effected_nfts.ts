import { Metaplex, keypairIdentity, Nft } from '@metaplex-foundation/js-next';
import { Connection, clusterApiUrl, Keypair, PublicKey } from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('devnet'));
const wallet = Keypair.generate();

const metaplex = Metaplex.make(connection).use(keypairIdentity(wallet));
const candyMachinePublicKey = new PublicKey(
  '7GKdrQvstf78sWEM4qBuZEYisbktYCgjSS76XarS9iBk'
);

const lifeCycleEffectedPercentage = 0.75;

const main = async () => {
  console.log(
    `Life Cycle Starting - ~${
      lifeCycleEffectedPercentage * 100
    }% of all NFTs will be effected in this life cycle...`
  );

  // Get All Mints From Metaplex By The Candy Machine Public Key
  const nfts: Nft[] = await metaplex
    .nfts()
    .findAllByCandyMachine(candyMachinePublicKey);

  // Map The NFTs To An Array Of Mint Ids
  const mintIds = nfts.map((nft) => nft.mint.toString());

  // Hold The Mint Ids That Will Be Effected By The Life Cycle
  const effectedNfts = [];

  // If the effected % is less than 1, we need to get random Mint Ids
  // Otherwise, we can push all Mint Ids
  if (lifeCycleEffectedPercentage < 1) {
    effectedNfts.push(...getRandomMintIds(mintIds));
  } else {
    effectedNfts.push(...mintIds);
  }

  console.log(
    `Effected NFTs (~${lifeCycleEffectedPercentage * 100}%): `,
    effectedNfts
  );
};

const getRandomMintIds = (mintIds: string[]): string[] => {
  const randomMintIds = [];

  // Push A Random Mint Id to the Array (Avoiding Duplicates) Until The Length Matches The Effected %
  do {
    const randomMintId = getRandomMintId(mintIds);
    if (!randomMintIds.includes(randomMintId)) {
      randomMintIds.push(randomMintId);
    }
  } while (
    randomMintIds.length <
    Math.floor(mintIds.length * lifeCycleEffectedPercentage)
  );

  return randomMintIds;
};

const getRandomMintId = (mintIds: string[]) =>
  mintIds[Math.floor(Math.random() * mintIds.length)];

main()
  .then(() => {
    console.log(
      'Done Fetching NFTs For Candy Machine: ' + candyMachinePublicKey
    );
  })
  .catch((e) => {
    console.error(
      'Error Fetching NFTs For Candy Machine: ' + candyMachinePublicKey,
      e
    );
  });

// const test = () => {
//   const arrayLength = 6;
//   const mintIds = [];

//   for (let i = 1; i < arrayLength + 1; i++) {
//     mintIds.push(i.toString());
//   }

//   console.log(
//     'Expected Effected Length: ',
//     Math.floor(mintIds.length * lifeCycleEffectedPercentage)
//   );

//   console.log('Effected NFTs: ', getRandomMintIds(mintIds));
// };

// test();

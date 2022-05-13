import { JobBuilder, Snowflake } from '@snowflake-so/snowflake-sdk';
import { AnchorProvider } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';

/** Initialize a Snowflake service on Devnet **/
const API_URL: string = 'https://api.devnet.solana.com';
const provider: AnchorProvider = AnchorProvider.local(API_URL);
const snowflake: Snowflake = new Snowflake(provider);

async function main() {
  /** Create a sample instruction **/
  const instructions = [
    {
      programId: new PublicKey('ETwBdF9X2eABzmKmpT3ZFYyUtmve7UWWgzbERAyd4gAC'),
      data: Buffer.from('74b89fceb3e0b22a', 'hex'),
      keys: [
        {
          pubkey: new PublicKey('5jo4Lh2Z9FGQ87sDhUBwZjNZdL15MwdeT5WUXKfwFSZY'),
          isSigner: false,
          isWritable: false,
        },
      ],
    },
  ];

  /** Create a new once-off scheduled job **/
  const onceOffJob = new JobBuilder()
    .jobName('once-off job')
    .jobInstructions(instructions)
    .scheduleOnce(1646034062)
    // Timestamp: Monday, 28-Feb-22 07:41:02 UTC
    .build();

  const onceOffJobTxID = await snowflake.createJob(onceOffJob);
  console.log('Create a recurring job with txId: ' + onceOffJobTxID);

  /** Create a new recurring scheduled job **/
  //   const recurringJob = new JobBuilder()
  //     .jobName('recurring job')
  //     .jobInstructions(instructions)
  //     .scheduleCron('* * * * *')
  //     // Every minute
  //     .build();

  //   const recurringJobTxID = await snowflake.createJob(recurringJob);
  //   console.log('Create a recurring job with txId: ' + recurringJobTxID);

  /** Fetch an once-off job **/
  //   const fetchedOnceOffJob = await snowflake.fetch(onceOffJob.pubKey);

  // Build from an existing job
  //   const updatedJob = new JobBuilder()
  //     .fromExistingJob(fetchedOnceOffJob)
  //     .jobName('hello world 2')
  //     .scheduleCron('0 * * * *', 2)
  //     .build();

  /** Update a job **/
  //   await snowflake.updateJob(updatedJob);

  /** Delete a job **/
  //   await snowflake.deleteJob(job.pubKey);

  /** Get Snowflake PDA for user **/
  //   const walletAddress: PublicKey = provider.wallet.publicKey;
  //   await snowflake.getSnowflakePDAForUser(walletAddress);

  /** Deposit to fee account (5000000 lamports) **/
  //   await snowflake.depositFeeAccount(5000000);
}

main();

import { Web3 } from 'web3';
import dotenv from 'dotenv';
dotenv.config()

import '../utils/logger';

console.log(process.env.WS_ENDPOINTS!)

let seen: {[hash: string]: boolean} = {}

const subscribe = async(endpoint:string) => {
  // @ts-ignore
  const web3 = new Web3(endpoint)
  // @ts-ignore
  const sub = await web3.eth.subscribe('logs', {
    fromBlock: 'earliest',
    address: '0x63db7e86391F5d31BAB58808Bcf75eDB272F4F5C', // CL aggregator address on polygon
   })
  // @ts-ignore
  sub.on( // 'newBlockHeaders' would work as well
    'data',
    async(msg:any) => {
      const hash = msg.transactionHash.toLowerCase()
      if (!seen[hash]) {
        seen[hash] = true
        console.log('gotta', hash, 'source:', endpoint)
      }
    }
  );
}

for (const endpoint of process.env.WS_ENDPOINTS!.split(',')) {
  subscribe(endpoint)
}
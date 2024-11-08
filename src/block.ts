import { Web3 } from 'web3';
import dotenv from 'dotenv';
dotenv.config()

import '../utils/logger';

console.log(process.env.WS_ENDPOINTS!)
let lastBlockNumber = 0
let receivedTime = +new Date()

const subscribe = async(endpoint:string) => {
  // @ts-ignore
  const web3 = new Web3(endpoint)
  // @ts-ignore
  const sub = (await web3.eth.subscribe('newHeads'))
  // @ts-ignore
  sub.on(
    'data',
    async(blockHeader:any) => {
      if (blockHeader.number! > lastBlockNumber) {
        const blockHeaderLatency =+new Date()-Number(blockHeader.timestamp)*1000
        const prevBlockLatency =+new Date()-receivedTime
        lastBlockNumber = blockHeader.number;
        receivedTime = +new Date()
        // fetch block
        await web3.eth.getBlock(lastBlockNumber)
        const fetchLatency = +new Date() - receivedTime
        const total = blockHeaderLatency + fetchLatency
        console.log(`new #${blockHeader.number} source:${endpoint}, header:${+new Date()-Number(blockHeader.timestamp)*1000}ms, fetch:${+new Date()-receivedTime}ms, total:${total}ms, prev block:${prevBlockLatency}ms`)
      }
    }
  );
}

for (const endpoint of process.env.WS_ENDPOINTS!.split(',')) {
  subscribe(endpoint)
}
# Rpc latency tests by rekt-labs

Please read the instructions carefully before running tests.

## Configuration

Make sure you're running node 20+.

Install required packages via `npm i`

Place websocket urls into `WS_ENDPOINTS` variable separated by comma, i.e
```
export WS_ENDPOINTS=wss://quik-node/apikey,wss://chainstack-node/apikey,wss://ankr/apikey
```
You can also place the variable into `.env`.

## Block arrival latency

Use
```
npm run block-latency
```
to run the collect latencies for blocks.

Sample output:
```
2024-11-08 14:39:16.374] new #64024608 source:wss://polygon-mainnet.core.chainstack.com/<DELETED>, header:374ms, fetch:219ms, total:374ms, prev block:3985ms
[2024-11-08 14:39:18.489] new #64024609 source:wss://rpc.ankr.com/polygon/ws/<DELETED>, header:489ms, fetch:409ms, total:489ms, prev block:1925ms
[2024-11-08 14:39:20.364] new #64024610 source:wss://polygon-mainnet.core.chainstack.com/<DELETED>, header:364ms, fetch:219ms, total:364ms, prev block:2065ms
...
```

Can run with tmux with stdout redirected to a file and leave it for a few hours. Once you've gathered enough data use `utils/blockParser.ts` to parse logs.

```
ts-node ./utils/blockParser.ts ./block-latency-logs.txt
```
Sample output:
```
Median header time: 364 ms, Max header time: 489 ms
Median fetch time: 219 ms, Max fetch time: 448 ms
Median total time: 364 ms, Max total time: 489 ms
Median prev block time: 1981 ms
```

You can do so for each provider in a separate tmux session and then use the tool to compare latencies.

## Mempool txn latency

Use
```
npm run mempool-latency
```
to run the mempool latency script

Sample output
```
[2024-11-08 14:54:32.230] gotta 0x306e92a5dc7aad7af7764e444471e06155096a01c10b251d06e0541fcd09b299 source: wss://holy-shy-mound.matic.quiknode.pro/<DELEETED>
[2024-11-08 14:54:35.659] gotta 0xf3b22e78d8c8b0526de78e6d0338cf95ea0687aae05ac00b56e0db7ea37f68a1 source: wss://polygon-mainnet.g.alchemy.com/v2/<DELETED>
...
```
Run
```
ts-node ./utils/mempoolParser.ts ./mempool-txn-latency-logs.txt
```
to parse the logs

```
Source: wss://polygon-mainnet.core.chainstack.com/1cf561dc165d08efd5ae8864a52f7ec1, Count: 1, Percentage: 50.00%
Source: wss://rpc.ankr.com/polygon/ws/c5a7f556aa739a53bfdf76ff619e4d2f5be614d506a2f5c185d71f017fa2df2c, Count: 1, Percentage: 50.00%
```
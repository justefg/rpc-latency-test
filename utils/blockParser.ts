import * as fs from 'fs';

// Function to calculate the median
function median(values: number[]): number {
    if (values.length === 0) return 0;
    values.sort((a, b) => a - b);
    const mid = Math.floor(values.length / 2);
    return values.length % 2 !== 0
        ? values[mid]
        : (values[mid - 1] + values[mid]) / 2;
}

// Function to calculate the maximum value
function max(values: number[]): number {
    return values.length === 0 ? 0 : Math.max(...values);
}

// Get log file path from command-line argument
const logFilePath = process.argv[2];
if (!logFilePath) {
    console.error("Please provide a log file path as a command-line argument.");
    process.exit(1);
}

// Read and parse the log file
const logData = fs.readFileSync(logFilePath, 'utf-8');
const logLines = logData.split('\n');

// Arrays to hold extracted values for each metric
const headerTimes: number[] = [];
const fetchTimes: number[] = [];
const totalTimes: number[] = [];
const prevBlockTimes: number[] = [];

// Regular expression to match and extract relevant metrics
const logPattern = /\bheader:(\d+)ms, fetch:(\d+)ms, total:(\d+)ms, prev block:(\d+)ms\b/;

for (const line of logLines) {
    const match = line.match(logPattern);
    if (match) {
        headerTimes.push(Number(match[1]));
        fetchTimes.push(Number(match[2]));
        totalTimes.push(Number(match[3]));
        prevBlockTimes.push(Number(match[4]));
    }
}
// Calculate median and max values
const medianHeader = median(headerTimes);
const maxHeader = max(headerTimes);

const medianFetch = median(fetchTimes);
const maxFetch = max(fetchTimes);

const medianTotal = median(totalTimes);
const maxTotal = max(totalTimes);

const medianPrevBlock = median(prevBlockTimes);

console.log(`Median header time: ${medianHeader} ms, Max header time: ${maxHeader} ms`);
console.log(`Median fetch time: ${medianFetch} ms, Max fetch time: ${maxFetch} ms`);
console.log(`Median total time: ${medianTotal} ms, Max total time: ${maxTotal} ms`);
console.log(`Median prev block time: ${medianPrevBlock} ms`);

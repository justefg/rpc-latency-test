import * as fs from 'fs';

// Get the log file path from command-line arguments
const logFilePath = process.argv[2];
if (!logFilePath) {
  console.error('Please provide the path to the log file as an argument.');
  process.exit(1);
}

// Read the log file
const logData = fs.readFileSync(logFilePath, 'utf-8');

// Initialize a map to store counts of each source
const sourceCounts = new Map<string, number>();
let totalEntries = 0;

// Process each line in the log file
logData.split('\n').forEach(line => {
  const sourceMatch = line.match(/source:\s+(.*)$/);
  if (sourceMatch) {
    const source = sourceMatch[1];
    totalEntries += 1;
    sourceCounts.set(source, (sourceCounts.get(source) || 0) + 1);
  }
});

// Calculate and print the percentage for each source
sourceCounts.forEach((count, source) => {
  const percentage = ((count / totalEntries) * 100).toFixed(2);
  console.log(`Source: ${source}, Count: ${count}, Percentage: ${percentage}%`);
});

const originalLog = console.log;

// Redefine console.log
console.log = function(...args) {
  // Get the current timestamp
  const now = new Date();
  const timestamp = now.getFullYear() + '-' +
                    String(now.getMonth() + 1).padStart(2, '0') + '-' +
                    String(now.getDate()).padStart(2, '0') + ' ' +
                    String(now.getHours()).padStart(2, '0') + ':' +
                    String(now.getMinutes()).padStart(2, '0') + ':' +
                    String(now.getSeconds()).padStart(2, '0') + '.' +
                    String(now.getMilliseconds()).padStart(3, '0');

  // Call the original console.log with the timestamp and original arguments
  originalLog.apply(console, [`[${timestamp}]`, ...args]);
};
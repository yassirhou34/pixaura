const { spawn } = require('child_process');
const net = require('net');

function checkPort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.once('close', () => resolve(true));
      server.close();
    });
    server.on('error', () => resolve(false));
  });
}

async function getAvailablePort() {
  for (let port = 3000; port <= 3010; port++) {
    if (await checkPort(port)) {
      return port;
    }
  }
  return 3000;
}

(async () => {
  const port = await getAvailablePort();
  const proc = spawn('next', ['dev', '-p', port.toString()], {
    stdio: 'inherit',
    shell: true,
    env: process.env
  });

  proc.on('exit', (code) => process.exit(code || 0));
  process.on('SIGINT', () => proc.kill('SIGINT'));
  process.on('SIGTERM', () => proc.kill('SIGTERM'));
})();


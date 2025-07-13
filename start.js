const portfinder = require('portfinder');
const { exec } = require('child_process');

(async () => {
  try {
    portfinder.basePort = 3000;
    const port = await portfinder.getPortPromise();

    console.log(`\n🚀 Starting Nexus Academy on http://localhost:${port}\n`);

    // run next
    const nextProcess = exec(`next ${process.env.NODE_ENV === 'production' ? 'start' : 'dev'} -p ${port}`);

    nextProcess.stdout.on('data', data => process.stdout.write(data));
    nextProcess.stderr.on('data', data => process.stderr.write(data));

    nextProcess.on('close', code => {
      console.log(`\n✅ Next.js process exited with code ${code}`);
    });

  } catch (err) {
    console.error('❌ Failed to find a free port or start Next.js:', err);
    process.exit(1);
  }
})();
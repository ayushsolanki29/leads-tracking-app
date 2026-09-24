import 'dotenv/config';
import http from 'http';
import app from './app';

const PORT = process.env.PORT ?? 5050;
const CLIENT_URL = process.env.CLIENT_URL ?? 'http://localhost:3000';
const SERVER_URL = process.env.SERVER_URL ?? `http://localhost:${PORT}`;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('\n========================================');
  console.log('  backend backend online');
  console.log('  Server  :', SERVER_URL);
  console.log('  Client  :', CLIENT_URL);
  console.log('  Health  :', `${SERVER_URL}/health`);
  console.log('  Started :', new Date().toLocaleString());
  console.log('========================================\n');
});

const shutdown = () => {
  console.log('\n⚠️  Shutting down...');
  server.close(() => { console.log('✅ Server closed.'); process.exit(0); });
  setTimeout(() => { console.log('⏳ Forced exit.'); process.exit(1); }, 5000);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export default server;

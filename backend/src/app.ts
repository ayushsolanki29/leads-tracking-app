import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import router from './modules';

const app = express();

const CLIENT_URL = process.env.CLIENT_URL ?? '*';

app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'API Running ✅',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((error: Error & { status?: number }, _req: Request, res: Response, _next: NextFunction) => {
  console.error('🔥 Error:', error);
  res.status(error.status ?? 500).json({
    success: false,
    message: error.message ?? 'Internal server error',
  });
});

export default app;

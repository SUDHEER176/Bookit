import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bookingRoutes from './routes/bookings';
import experienceRoutes from './routes/experiences';
import promoRoutes from './routes/promo';

dotenv.config();

const app = express();

// Supabase is initialized via env in config/db.ts; no separate connection step is required

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware (for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body && Object.keys(req.body).length > 0 ? 'with body' : '');
  next();
});

// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/promo', promoRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route not found: ${req.method} ${req.path}`,
    availableRoutes: [
      'GET /health',
      'GET /api/experiences',
      'GET /api/experiences/:id',
      'POST /api/bookings',
      'POST /promo/validate'
    ]
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET  http://localhost:${PORT}/health`);
  console.log(`  GET  http://localhost:${PORT}/api/experiences`);
  console.log(`  GET  http://localhost:${PORT}/api/experiences/:id`);
  console.log(`  POST http://localhost:${PORT}/api/bookings`);
  console.log(`  POST http://localhost:${PORT}/promo/validate`);
});
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const net = require('net');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const aiRoutes = require('./routes/aiRoutes');

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Task Manager API is running',
    version: '1.0.0',
    endpoints: {
      tasks: '/api/tasks',
      ai: '/api/ai/plan-task'
    }
  });
});

app.use('/api/tasks', taskRoutes);
app.use('/api/ai', aiRoutes);

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

const getAvailablePort = (preferredPort) => new Promise((resolve, reject) => {
  const tester = net.createServer();

  tester.once('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      resolve(preferredPort + 1);
      return;
    }

    reject(error);
  });

  tester.once('listening', () => {
    const port = tester.address().port;
    tester.close(() => resolve(port));
  });

  tester.listen(preferredPort);
});

const startServer = async () => {
  const preferredPort = Number(process.env.PORT) || 5000;
  const port = await getAvailablePort(preferredPort);

  app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});

module.exports = app;
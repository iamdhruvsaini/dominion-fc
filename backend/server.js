import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import http from "http";
import { Server } from "socket.io";
import { DominionFcModel } from './database/model.js';
import dashboardRouter from './routes/dashboard/dashboard.route.js';
import potentialRankingRouter from './routes/stats/stats.route.js';
import playerPositionRouter from './routes/player-positon/playerPosition.route.js';
import userSelectionRouter from './routes/user-selection/selection.route.js';
import usersRouter from './routes/users/users.route.js';
import adminPortalRouter from './routes/admin/admin.route.js';
import { markPlayerAsSoldHandler } from './controllers/admin/home/admin.home.controller.js';
import predictionRoutes from "./routes/prediction/predictPlaying11.js";
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name properly in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Go up one directory to the project root (football)
const projectRoot = path.resolve(__dirname, '..');

const app = express();
const PORT = process.env.PORT || 3000;

// Enhanced CORS configuration
const corsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ['Cross-Origin-Opener-Policy', 'Cross-Origin-Embedder-Policy']
};

// Middleware
app.use(express.json());

// Removed Helmet completely

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(cors(corsOptions));

// API Routes
app.use('/api/stats/', potentialRankingRouter);
app.use('/api/dashboard/', dashboardRouter);
app.use('/api/position/', playerPositionRouter);
app.use('/api/user-selection/', userSelectionRouter);
app.use('/api/users', usersRouter);
app.use('/api/admin', adminPortalRouter);
app.use('/api/prediction', predictionRoutes);


app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running!' });
});

// ------------ Deployment ---------------
if (process.env.NODE_ENV === 'production') {
  // Path to frontend build
  const distPath = path.join(projectRoot, 'frontend', 'dist');

  // Serve static files
  app.use(express.static(distPath));

  // For any route that doesn't match an API route, send the index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  // Default route for development
  app.get('/', (req, res) => {
    res.status(200).send('Server is running in development mode!');
  });
}
//------------- End Deployment ---------------

app.use((req, res) => {
  res.status(404).send("Sorry, can't find that!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.IO with CORS
const io = new Server(server, {
  cors: corsOptions,
  pingTimeout: 60000,
  pingInterval: 25000,
  transports: ['websocket', 'polling'],
});

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Send initial connection confirmation
  socket.emit("connection_established", { status: "connected" });

  // Respond to heartbeat to keep connection alive
  socket.on("heartbeat", () => {
    socket.emit("heartbeat_response");
  });

  // Handle player sold status updates
  socket.on("updateSoldStatus", async (data) => {
    try {
      const { playerId, sold, wage } = data;
      console.log("Updating player status:", { playerId, sold, wage });

      const result = await markPlayerAsSoldHandler(playerId, sold, wage);
      console.log("Player sold status updated:", result);

      // Broadcast the update to all connected clients
      io.emit("playerUpdated", { playerId, updatedRecord: result[0] });
    } catch (error) {
      console.error("Error updating sold status:", error);
      socket.emit("error", { message: "Could not update sold status" });
    }
  });

  // Handle errors
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Connect to database and start server
DominionFcModel()
  .then(() => {
    console.log("Database Connected Successfully");
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });
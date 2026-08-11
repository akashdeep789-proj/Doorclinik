// sockets/sockets.js
const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");

const adminSockets = new Map(); // adminId -> Set of socketIds

/**
 * Middleware to authenticate socket connections
 */
function authenticateSocket(socket, next) {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) {
      console.warn("❌ Socket connection rejected: Missing token");
      return next(new Error("Authentication token missing"));
    }

    // Verify JWT (use same secret as your Express app)
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || "mysupersecretcode"
    );

    // Attach user info to socket
    socket.data.userId = payload.id;
    socket.data.role = payload.role;

    return next();
  } catch (err) {
    console.error("❌ Socket authentication failed:", err.message);
    return next(new Error("Unauthorized socket connection"));
  }
}

/**
 * Initialize Socket.IO server
 */
function setupSocketIO(server) {
  const io = new Server(server, {
    cors: {
      origin: [
        "https://doorclinik.vercel.app", // ✅ your deployed frontend
        "http://localhost:3000",         // ✅ local dev frontend
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"], // ✅ ensure fallback
    allowEIO3: true, // ✅ backward compatibility
    pingTimeout: 60000, // ✅ prevent early disconnects
    pingInterval: 25000,
  });

  // 🔒 Use authentication middleware
  io.use(authenticateSocket);

  io.on("connection", (socket) => {
    console.log(`✅ Socket connected: ${socket.id} [Role: ${socket.data.role}]`);

    // --- ADMIN REGISTRATION ---
    if (socket.data.role === "admin") {
      const adminId = socket.data.userId;
      if (!adminSockets.has(adminId)) {
        adminSockets.set(adminId, new Set());
      }
      adminSockets.get(adminId).add(socket.id);
      console.log(`🧑‍💼 Admin registered: ${adminId} -> ${socket.id}`);
    }

    // --- GENERIC EVENTS ---
    socket.on("pingServer", () => {
      socket.emit("pongServer", { message: "Server is alive" });
    });

    // --- Notify Admin ---
    socket.on("newBooking", (bookingData) => {
      if (!bookingData.adminId) return;
      const sockets = adminSockets.get(bookingData.adminId);
      if (sockets) {
        sockets.forEach((sid) => {
          io.to(sid).emit("bookingNotification", {
            msg: "New booking received!",
            booking: bookingData,
          });
        });
      }
    });

    // --- DISCONNECT ---
    socket.on("disconnect", (reason) => {
      if (socket.data.role === "admin") {
        const adminId = socket.data.userId;
        const s = adminSockets.get(adminId);
        if (s) {
          s.delete(socket.id);
          if (s.size === 0) adminSockets.delete(adminId);
        }
        console.log(`❌ Admin disconnected: ${adminId} <- ${socket.id} (${reason})`);
      } else {
        console.log(`❌ Socket disconnected: ${socket.id} (${reason})`);
      }
    });

    // --- ERROR HANDLER ---
    socket.on("error", (err) => {
      console.error(`⚠️ Socket error [${socket.id}]:`, err.message);
    });
  });

  return io;
}

module.exports = { setupSocketIO, adminSockets };

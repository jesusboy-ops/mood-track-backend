import { initializeSocket } from '../sockets/socketHandler.js';

/**
 * Setup Socket.io with HTTP server
 */
export const setupSocket = (server) => {
  return initializeSocket(server);
};

let ioInstance;

function initSocket(io) {
  ioInstance = io;
  io.on('connection', (socket) => {
    console.log('A user connected');
  });
}

function getIoInstance() {
  return ioInstance;
}

module.exports = { initSocket, getIoInstance };
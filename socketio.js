const connection = (socket) => {
  console.log("New client connected", socket.id);

  socket.on("disconnect", () => {});
};

module.exports = { connection };

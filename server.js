const server = require('./app');

const port = process.env.PORT || 3200;

server.listen(port, () => {
  console.log(`UR Plugin server listening on port ${port}`);
});

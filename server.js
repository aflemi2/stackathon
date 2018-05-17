const server = require('http').createServer(require('./app'));
const { syncAndSeed } = require('./server/db');
const port = process.env.PORT || 9000;

syncAndSeed()
.then(()=>{
  server.listen( port, ()=> console.log(`You are listening to port ${port}`));
});

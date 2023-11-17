require('dotenv').config({ path: `.${process.env.NODE_ENV}.env` });
const PORT = process.env.PORT;

exports.mochaGlobalSetup = async function() {
  console.log('\n=====> START TEST <=====\n');
  const { server, mongoose } = require('../api');
  this.server = server;
  this.mongoose = mongoose;
  await require('../db/test/seed')(this.mongoose);

}

exports.mochaGlobalTeardown = function() {
  this.server.close(function() {
    console.log('Server closed');
  });
  
  this.mongoose.connection.close().then(() => {
    console.log('  || Mongoose connection closed ||');
    console.log('\n<===== END TEST =====>\n')
  });
}

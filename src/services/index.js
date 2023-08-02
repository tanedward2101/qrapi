const users = require('./users/users.service.js');
const qrdb = require('./qrdb/qrdb.service.js');
const test = require('./test/test.service.js');

const verify = require('./verify/verify.service.js');

const qrcount = require('./qrcount/qrcount.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(qrdb);
  app.configure(test);

  app.configure(verify);
  app.configure(qrcount);
};

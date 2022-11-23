const knex = require('knex');

module.exports = function (app) {
  const { client, connection } = app.get('dbqr');
  const db = knex({ client, connection });

  app.set('dbqr', db);
};

// Initializes the `qrdb` service on path `/qrdb`
const { Qrdb } = require('./qrdb.class');
const hooks = require('./qrdb.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/qrdb', new Qrdb(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('qrdb');

  service.hooks(hooks);
};

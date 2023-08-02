// Initializes the `qrcount` service on path `/qrcount`
const { Qrcount } = require('./qrcount.class');
const hooks = require('./qrcount.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/qrcount', new Qrcount(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('qrcount');

  service.hooks(hooks);
};

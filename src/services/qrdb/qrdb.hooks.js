const { authenticate } = require('@feathersjs/authentication').hooks;
function updateNama() {
  return async (context) => {
    //console.log(context)
    try {
      const dbQR = context.app.get('dbqr');
      var x = await dbQR('qrdb').where('active', 0).del()
    }
    catch (e) {
      console.log(e)
    }
    // console.log(x)
  };
}
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

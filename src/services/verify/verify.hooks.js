
function updateDoc() {

  return async (context) => {
   
      console.log(context.id)
      // const dbAgent= context.app.get('db-agent');
      // const result = await dbAgent('gmra_trans').increment('approval_amount').where({ id: context.id })
  
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

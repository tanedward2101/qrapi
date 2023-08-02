/* eslint-disable no-unused-vars */
exports.Qrcount = class Qrcount {
  constructor(options, app) {
    this.options = options || {};
    this.app = app
  }

  async find(params) {
   // console.log("MASUK")
    const dbQR = this.app.get('dbqr');
    
    var data
    data = await dbQR('qrdb').count('id as id')
   // console.log(data)
    return data;
  }

  async get(id, params) {
    
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return { id };
  }
};

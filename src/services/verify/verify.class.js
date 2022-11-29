const e = require("cors");

/* eslint-disable no-unused-vars */
exports.Verify = class Verify {
  constructor(options, app) {
    this.options = options || {};
    this.app = app
  }

  async find(params) {
    var filter

    const dbQR = this.app.get('dbqr');
    var data

    if (params.query.code) {

      data = await dbQR('qrdb').select('*').where('code', params.query.code).andWhere('active', 1)
      if (data.length != 0) {
        if (data[0].scanned == 0) {
          await dbQR('qrdb').update('first_verify_date', new Date()).where('code', params.query.code).andWhere('active', 1)
        }
        else {
          await dbQR('qrdb').update('last_verify_date', new Date()).where('code', params.query.code).andWhere('active', 1)
        }
      }
      else {
        data[0] = "Null"
      }
    }
    else {
      data[0] = "Null"
    }

    if (data.length == 0) {
      data[0] = "Null"
    }
    else {
      await dbQR('qrdb').increment('scanned').where('code', params.query.code).andWhere('active', 1)
    }

    return data;
  }

  async get(id, params) {
    return {}
  }

  async create(data, params) {
    return {}
  }

  async update(id, data, params) {
    return {}
  }

  async patch(id, data, params) {
    return {}
  }

  async remove(id, params) {
    return { id };
  }
};

/* eslint-disable no-unused-vars */
exports.Qrdb = class Qrdb {
  constructor(options, app) {
    this.options = options || {};
    this.app = app
  }

  async find(params) {
    var filter

    const dbQR = this.app.get('dbqr');
    var data

    data = await dbQR('qrdb').select('*')
    if (params.query.fraud) {
      data = await dbQR('qrdb').select('*').where('fraud', params.query.fraud)
    }

    if (params.query.code && params.query.code['$like'] != '') {
      filter = params.query.code['$like']
      if (params.query.fraud) {
        data = await dbQR('qrdb').select('*').where('code', 'like', `%${filter}%`).andWhere('fraud', params.query.fraud)
      }
      else { data = await dbQR('qrdb').select('*').where('code', 'like', `%${filter}%`) }
    }
    if (params.query.tipe && params.query.tipe['$like'] != '') {
      filter = params.query.tipe['$like']
      if (params.query.fraud) {
        data = await dbQR('qrdb').select('*').where('tipe', 'like', `%${filter}%`).andWhere('fraud', params.query.fraud)
      }
      else {
        data = await dbQR('qrdb').select('*').where('tipe', 'like', `%${filter}%`)
      }
    }
    return data;
  }

  async get(id, params) {

    const dbQR = this.app.get('dbqr');
    const data = await dbQR('qrdb').select('*').where({ id: id })
    return data;
  }

  async create(data, params) {

    var lengthdata = data.title.split("\n");
    // console.log(lengthdata)
    const dbQR = this.app.get('dbqr');
    // console.log(data)
    for (var i = 0; i < lengthdata.length; i++) {
      //  console.log(data.title.split("\n")[i])
      try {
        await dbQR('qrdb').insert({
          tipe: data.tipe,
          code: data.title.split("\n")[i],
          scanned: 0,
          fraud: 0,
          created_date: new Date(),
          active: 1
        }).catch(console.error)
      } catch (e) {
        console.log(e);
      }
    }

    // if (Array.isArray(data)) {
    //   return Promise.all(data.map(current => this.create(current, params)));
    // }

    return lengthdata.length + " data INSERTED TO DB";
  }

  async update(id, data, params) {
    const dbQR = this.app.get('dbqr');
    console.log(id)
    console.log(data)
    await dbQR('qrdb').update({
      tipe: data.tipe,
      code: data.code,
      fraud: data.fraud
    }).where({ id: id })
    return "Success"
  }

  async patch(id, data, params) {
    return "PATCH";
  }

  async remove(id, params) {
    return { id };
  }
};

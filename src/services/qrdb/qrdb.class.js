/* eslint-disable no-unused-vars */
exports.Qrdb = class Qrdb {
  constructor(options, app) {
    this.options = options || {};
    this.app = app
  }

  async find(params) {
    const dbQR = this.app.get('dbqr');
    const data = await dbQR('qrdb').select('*')
    //console.log(data);
    return data;
  }

  async get(id, params) {
    console.log(id)
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
          created_date: new Date()
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

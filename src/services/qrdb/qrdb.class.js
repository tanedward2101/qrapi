/* eslint-disable no-unused-vars */
exports.Qrdb = class Qrdb {
  constructor(options, app) {
    this.options = options || {};
    this.app = app
  }

  async find(params) {
    var filter

    const dbQR = this.app.get('dbqr');
    // console.log(params)
    var data

    var sqlQuery = "SELECT * FROM qrdb WHERE 1=1 "
    var sqlCount = "SELECT COUNT(id) as total FROM qrdb WHERE 1=1 "
    var sqlVerified = "SELECT COUNT(id) as verified FROM qrdb WHERE scanned>=1 "
    // console.log(sqlQuery)
    if (params.query.fraud) {
      sqlQuery += "AND fraud='" + params.query.fraud + "' "
      sqlCount += "AND fraud='" + params.query.fraud + "' "
      sqlVerified += "AND fraud='" + params.query.fraud + "' "
    }
    if (params.query.code) {
      filter = params.query.code['$like']
      sqlQuery += "AND code LIKE '%" + filter + "%'  "
      sqlCount += "AND code LIKE '%" + filter + "%'  "
      sqlVerified += "AND code LIKE '%" + filter + "%'  "
    }
    if (params.query.tipe) {
      filter = params.query.tipe['$like']
      sqlQuery += "AND tipe LIKE '%" + filter + "%'  "
      sqlCount += "AND tipe LIKE '%" + filter + "%'  "
      sqlVerified += "AND tipe LIKE '%" + filter + "%'  "
    }

    sqlQuery += "AND active=1 order by id desc ";
    sqlCount += "AND active=1  ";
    sqlVerified += "AND active=1  ";


    if (params.query.limit) {
      sqlQuery += "LIMIT " + params.query.limit + " "
    }
    if (params.query.offset) {
      sqlQuery += "OFFSET " + params.query.offset + " "
    }
    // console.log(sqlQuery)
    data = await dbQR.raw(sqlQuery);
    var total = await dbQR.raw(sqlCount);
    var verified = await dbQR.raw(sqlVerified)
    data[1] = total[0]
    data[2] = verified[0]
    // data = await dbQR('qrdb').select('*').where('active', 1).orderBy('id', 'desc')
    // if (params.query.fraud) {
    //   data = await dbQR('qrdb').select('*').where('fraud', params.query.fraud).andWhere('active', 1).orderBy('id', 'desc')
    // }

    // if (params.query.code && params.query.code['$like'] != '') {
    //   filter = params.query.code['$like']
    //   if (params.query.fraud) {
    //     data = await dbQR('qrdb').select('*').where('code', 'like', `%${filter}%`).andWhere('fraud', params.query.fraud).andWhere('active', 1).orderBy('id', 'desc')
    //   }
    //   else { data = await dbQR('qrdb').select('*').where('code', 'like', `%${filter}%`).andWhere('active', 1).orderBy('id', 'desc') }
    // }
    // if (params.query.tipe && params.query.tipe['$like'] != '') {
    //   filter = params.query.tipe['$like']
    //   if (params.query.fraud) {
    //     data = await dbQR('qrdb').select('*').where('tipe', 'like', `%${filter}%`).andWhere('fraud', params.query.fraud).andWhere('active', 1).orderBy('id', 'desc')
    //   }
    //   else {
    //     data = await dbQR('qrdb').select('*').where('tipe', 'like', `%${filter}%`).andWhere('active', 1).orderBy('id', 'desc')
    //   }
    // }
    return data;
  }

  async get(id, params) {
    const dbQR = this.app.get('dbqr');
    const data = await dbQR('qrdb').select('*').where({ id: id }).andWhere('active', 1)
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
    // console.log(id)
    // console.log(data)
    await dbQR('qrdb').update({
      tipe: data.tipe,
      code: data.code,
      fraud: data.fraud
    }).where({ id: id })
    return "Success"
  }

  async patch(id, data, params) {
    const dbQR = this.app.get('dbqr');
    var idx = data.id
    // console.log(idx)
    for (var x = 0; x < idx.length; x++) {
      // console.log(idx[x])
      await dbQR('qrdb').update({
        active: 0
      }).where({ id: idx[x] })
    }
    return "PATCH";
  }

  async remove(id, params) {
    const dbQR = this.app.get('dbqr');
    await dbQR('qrdb').where({ id: id }).del()
    return "Deleted"
  }
};

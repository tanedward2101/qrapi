const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');
const CryptoJS  = require('crypto-js')
const AES = require('crypto-js/aes');
const bcrypt = require('bcryptjs')
class MyLocalStrategy extends LocalStrategy {
  async comparePassword(entity, password) {
    const bytes = CryptoJS.AES.decrypt(password, '4g3nts3cr3t');
    const decryptedPwd = bytes.toString(CryptoJS.enc.Utf8);

    const { errorMessage } = this.configuration;    
    if (entity.password == null) {
      throw new errors.NotAuthenticated('Password is empty');
    }
    const result = await bcrypt.compare(decryptedPwd, entity.password);
  //  console.log(entity)
    if (result) {
      return entity;
    } else {
      console.log(errorMessage)
      throw new errors.NotAuthenticated(errorMessage);
    }
  }
}

module.exports = app => {
  const authentication = new AuthenticationService(app);
 
  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new MyLocalStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};



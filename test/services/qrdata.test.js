const app = require('../../src/app');

describe('\'qrdata\' service', () => {
  it('registered the service', () => {
    const service = app.service('qrdata');
    expect(service).toBeTruthy();
  });
});

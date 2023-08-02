const app = require('../../src/app');

describe('\'qrcount\' service', () => {
  it('registered the service', () => {
    const service = app.service('qrcount');
    expect(service).toBeTruthy();
  });
});

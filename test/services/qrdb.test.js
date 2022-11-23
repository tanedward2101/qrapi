const app = require('../../src/app');

describe('\'qrdb\' service', () => {
  it('registered the service', () => {
    const service = app.service('qrdb');
    expect(service).toBeTruthy();
  });
});

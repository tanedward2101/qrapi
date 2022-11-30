/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const https = require('https');
const fs = require('fs');
//const server = app.listen(port);
const server = https.createServer({
  key: fs.readFileSync('src/cert/private.key'),
  cert: fs.readFileSync('src/cert/certificate.crt'),
  ca: fs.readFileSync('src/cert/ca_bundle.crt')
}, app).listen(port)
process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);

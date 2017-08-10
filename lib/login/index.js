const portfinder = require('portfinder');
const http = require('http');
const chalk = require('chalk');
const jwt = require('jsonwebtoken');
const url = require('url');
const open = require('opn');
const _ = require('lodash');

const logger = require('../utils/logger');

const nonce = _.random(1, 2 << 29).toString();

portfinder.basePort = 8081;

let port;
let callbackUrl;
let loginUrl;
let server;
let user;
let tokens;

function setPort(retrievedPort) {
  console.log('setPort');
  port = retrievedPort;
}

// TODO: setup configstore to get / set local auth tokens
function checkExistingAuth() {
  console.log('checkExistingAuth');
  // throw new Error('You are alread logged in!')
  return true;
}

function setCallbackUrl() {
  console.log('setCallbackUrl');
  callbackUrl = `http://localhost:${port}`;
}

// TODO: make this production ready
function setLoginUrl() {
  console.log('setLoginUrl');
  // todo: add the nonce to the URL query params so we can
  // get it back and check it's correct
  // const webAppBaseUrl = "https://www.ducktypecoder.com/login"
  const webAppBaseUrl = 'http://localhost:3000/login';
  loginUrl = `${webAppBaseUrl}?state=${nonce}&callbackUrl=${callbackUrl}`;
}

function _respondWithFile(req, res, statusCode, filename) {
  console.log('_respondWithFile');
  // TODO: setup 'success' and 'error' HTML templates to show in browser
  // return new RSVP.Promise(((resolve, reject) => {
  //   fs.readFile(path.join(__dirname, filename), (err, response) => {
  //     if (err) {
  //       return reject(err);
  //     }
  //     res.writeHead(statusCode, {
  //       'Content-Length': response.length,
  //       'Content-Type': 'text/html'
  //     });
  //     res.end(response);
  //     req.socket.destroy();
  //     return resolve();
  //   });
  // }));
}

function createServer() {
  console.log('createServer');
  server = http.createServer(handleCallback);
}

function _getTokensFromAuthorizationCode(code, callbackUrl) {
  console.log('_getTokensFromAuthorizationCode');

  // TODO: receive jwt, decode it and store as appropriate
  // user = jwt.decode.tokens.id_token;
  user = code;
  tokens = ['foobar'];

  return Promise.resolve();
}

function handleCallback(req, res) {
  console.log('handleCallback >  our callback was hit!!!');
  const query = _.get(url.parse(req.url, true), 'query', {});
  console.log({ query });

  const reqIsInvalid = query.state !== nonce || !_.isString(query.code);

  if (reqIsInvalid) {
    console.log('req is invalid');
    _respondWithFile(req, res, 400, '../templates/loginFailure.html');
    server.close();
    return;
  }

  _getTokensFromAuthorizationCode(query.code, callbackUrl)
    .then(() => {
      server.close();
      _respondWithFile(req, res, 200, '../templates/loginSuccess.html');
    })
    .then(storeTokens)
    .catch(e => {
      console.log(e);
      _respondWithFile(req, res, 400, '../templates/loginFailure.html');
    });
}

function storeTokens() {
  console.log('storeTokens');
  // use configstore to set local auth tokens
  console.log({ user, tokens });
}

function startServer() {
  console.log('startServer');
  server.listen(port, () => {
    logger.info('');
    logger.info('Login at this url:');
    logger.info(chalk.bold.underline(loginUrl));
    logger.info('');
    logger.info('Waiting for authentication...');
  });

  server.on('error', e => console.log(e));
}

function openAuthPage() {
  console.log('openAuthPage');
  open(loginUrl);
}

module.exports = function login() {
  console.log('login...');
  portfinder
    .getPortPromise()
    .then(setPort)
    .then(checkExistingAuth)
    .then(setCallbackUrl)
    .then(setLoginUrl)
    .then(createServer) // get tokens from code
    .then(startServer)
    .then(openAuthPage)
    .catch(e => logger.error(e.message));
};

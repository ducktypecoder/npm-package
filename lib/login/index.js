const portfinder = require('portfinder');
const http = require('http');
const chalk = require('chalk');
const jwt = require('jsonwebtoken');
const url = require('url');
const open = require('opn');
const _ = require('lodash');

const configstore = require('../utils/configstore');
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

// TODO: check if the auth exists, and if it is not yet expired...
function checkExistingAuth() {
  console.log('checkExistingAuth');

  // const userRecord = configstore.get('user');
  // const tokens = configstore.get('tokens');
  // console.log({ tokens });
  //
  // if (userRecord && tokens) throw new Error('You are alread logged in!');

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

function _respondWithFile(req, res, statusCode) {
  console.log('_respondWithFile');
  res.writeHead(statusCode, {
    'Content-Type': 'application/json'
  });
  res.end(JSON.stringify({ success: true }));
  req.socket.destroy();
}

function createServer() {
  console.log('createServer');
  server = http.createServer(handleCallback);
}

function decodeAuthCode(code, callbackUrl) {
  console.log('_getTokensFromAuthorizationCode: code: ', code);

  // TODO: receive jwt, decode it and store as appropriate
  // user = jwt.decode.tokens.id_token;
  const decodedCode = jwt.decode(code);

  if (!decodedCode) {
    throw new Error('Could not decode the token');
  }

  user = decodedCode.user; // user email, other info to show
  // TODO: implement a refresh token flow
  // - set expiration on access tokens
  // - get refresh token to refresh expired access tokens
  tokens = { access: code }; // access token to use on subsequent requests

  return Promise.resolve();
}

function respondToInvalidRequest(req, res) {
  console.log('req is invalid');
  _respondWithFile(req, res, 400, '../templates/loginFailure.html');
  server.close();
}

// TODO: use configstore to set local auth tokens
function storeTokens() {
  console.log('storeTokens', { user, tokens });
  const updatedTokens = configstore.get('tokens') || {};

  updatedTokens.access = tokens.access;

  configstore.set('user', user);
  configstore.set('tokens', updatedTokens);
}

function handleCallback(req, res) {
  console.log('handleCallback');
  const query = _.get(url.parse(req.url, true), 'query', {});
  const reqIsInvalid = query.state !== nonce || !_.isString(query.code);

  console.log(query);

  if (reqIsInvalid) return respondToInvalidRequest(req, res);

  return decodeAuthCode(query.code, callbackUrl)
    .then(() => {
      _respondWithFile(req, res, 200, '../templates/loginSuccess.html');
      server.close();
    })
    .then(storeTokens)
    .then(() => {
      const userInfo = configstore.get('user');
      logger.success(
        `You are logged in as ${userInfo.email}! Press ctrl-c to exit to the command line.`
      );
    })
    .catch(e => {
      console.log(e);
      _respondWithFile(req, res, 400, '../templates/loginFailure.html');
      server.close();
    });
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

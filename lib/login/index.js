const portfinder = require('portfinder');
const https = require('https');
const fs = require('fs');
const chalk = require('chalk');
const jwt = require('jsonwebtoken');
const url = require('url');
const open = require('opn');
const _ = require('lodash');

const configstore = require('../utils/configstore');
const logger = require('../utils/logger');
const getLoginUrl = require('../utils/get-login-url');

const nonce = _.random(1, 2 << 29).toString();

portfinder.basePort = 8081;

let port;
let callbackUrl;
let loginUrl;
let server;
let user;
let tokens;

const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};

function setPort(retrievedPort) {
  port = retrievedPort;
}

// TODO: check if the auth exists, and if it is not yet expired...
function checkExistingAuth() {
  // const userRecord = configstore.get('user');
  // const tokens = configstore.get('tokens');
  // console.log({ tokens });
  //
  // if (userRecord && tokens) throw new Error('You are alread logged in!');

  return true;
}

function setCallbackUrl() {
  callbackUrl = `https://localhost:${port}`;
}

function setLoginUrl() {
  loginUrl = `${getLoginUrl()}?state=${nonce}&callbackUrl=${callbackUrl}`;
}

function _respondWithFile(req, res, statusCode) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json'
  });
  res.end(JSON.stringify({ success: true }));
  req.socket.destroy();
}

function createServer() {
  server = https.createServer(httpsOptions, handleCallback);
}

function decodeAuthCode(code, callbackUrl) {
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
  const updatedTokens = configstore.get('tokens') || {};

  updatedTokens.access = tokens.access;

  configstore.set('user', user);
  configstore.set('tokens', updatedTokens);
}

function userNameOrEmail() {
  const userInfo = configstore.get('user');

  if (userInfo.email) return userInfo.email;
  if (userInfo.name) return userInfo.name;
}

function handleCallback(req, res) {
  console.log('handling callback...');
  const query = _.get(url.parse(req.url, true), 'query', {});
  const reqIsInvalid = query.state !== nonce || !_.isString(query.code);

  if (reqIsInvalid) return respondToInvalidRequest(req, res);

  return decodeAuthCode(query.code, callbackUrl)
    .then(() => {
      _respondWithFile(req, res, 200, '../templates/loginSuccess.html');
      server.close();
    })
    .then(storeTokens)
    .then(() => {
      logger.success(
        `You are logged in as ${userNameOrEmail()}! Press ctrl-c to exit to the command line.`
      );
    })
    .catch(e => {
      console.log(e);
      _respondWithFile(req, res, 400, '../templates/loginFailure.html');
      server.close();
    });
}

function startServer() {
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
  open(loginUrl);
}

module.exports = function login() {
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

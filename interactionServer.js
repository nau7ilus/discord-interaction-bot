'use strict';

// Because Impress doesn't provide a way to get a list of request headsers, which is
// very necessary  to verify requests from Discord, we have to come up with solutions.

const http = require('http');
const { Metacom } = require('metacom');
const nacl = require('@nieopierzony/tweetnacl');

let metacom = null;
let api = null;

const { INTERACTION_ENDPOINT, INTERACTION_SERVER_PORT, PUBLIC_KEY, MAIN_SERVER_URL, LOGIN_TOKEN } = process.env;
const InteractionTypes = {
  1: 'ping',
  2: 'applicationCommand',
  3: 'messageComponent',
  4: 'appCommandAutocomplete',
  5: 'modalSubmit',
};

const send = (res, statusCode, body, json = false) => {
  const type = json ? 'application/json' : 'text/plain';
  res.writeHead(statusCode, { 'Content-Type': type });
  res.end(body);
};

const connectToMainServer = async () => {
  metacom = new Metacom(MAIN_SERVER_URL);
  api = metacom.api;
  await metacom.load('interactions');
};

const verifyRequest = (req, rawBody) => {
  const signature = req.headers['x-signature-ed25519'];
  const timestamp = req.headers['x-signature-timestamp'];
  if (!signature || !timestamp) return false;
  const isVerified = nacl.verify(
    Buffer.from(timestamp + rawBody),
    Buffer.from(signature, 'hex'),
    Buffer.from(PUBLIC_KEY, 'hex')
  );
  return isVerified;
};

const getRequestBody = (req) => {
  return new Promise((resolve) => {
    const data = [];
    req.on('data', (chunk) => data.push(chunk));
    req.on('end', () => resolve(Buffer.concat(data).toString()));
  });
};

const handleInteraction = async (req, res) => {
  const rawBody = await getRequestBody(req);
  const isVerified = verifyRequest(req, rawBody);
  if (!isVerified) return send(res, 401, 'Unauthorized');
  const body = JSON.parse(rawBody);
  const result = await api.interactions[InteractionTypes[body.type]]({ rawInteraction: body });
  send(res, 200, JSON.stringify(result), true);
};

const handleRequest = async (req, res) => {
  try {
    const { method, url } = req;
    if (method === 'POST' && url === INTERACTION_ENDPOINT) {
      if (!metacom) await connectToMainServer();
      return handleInteraction(req, res);
    }
    send(res, 404, 'Not found');
  } catch (err) {
    console.error(err);
    send(res, 500, 'Internal server error');
  }
};

const server = http.createServer(handleRequest);
server.listen(INTERACTION_SERVER_PORT);

const RpcEngine = require('json-rpc-engine');
const providerFromEngine = require('eth-json-rpc-middleware/providerFromEngine');
const createIn3Middleware = require('./index');

module.exports = createIn3Provider;

function createIn3Provider(opts){
  const engine = new RpcEngine();
  engine.push(createIn3Middleware(opts));
  return providerFromEngine(engine);
}
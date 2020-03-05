const { errors: rpcErrors } = require('eth-json-rpc-errors');
const createAsyncMiddleware = require('json-rpc-engine/src/createAsyncMiddleware');
const In3Spawn = require('./In3Spawn.js');
const defaultIn3Config = require('./defaultIn3Config.js');

module.exports = {
  default: createIn3Middleware,
  In3Spawn,
  defaultIn3Config
}

function createIn3Middleware (config = {}) {

  //create a new client object
  const in3 = In3Spawn(config);
  const replaceLatestBlock = config.replaceLatestBlock || defaultIn3Config.replaceLatestBlock;

  return createAsyncMiddleware(async (req, res, next) => {
    let in3Res = await in3.sendRPC(req.method, req.params);

    if (req.method == "eth_blockNumber" && in3Res) { //TODO: add tests for this
      in3Res = "0x" + (parseInt(in3Res) - replaceLatestBlock).toString(16);
    }

    if(!in3Res) throw new Error("Couldn't get the response using In3");

    if (in3Res.error) throw rpcErrors.internal(in3Res.error.toString(), in3Res.error);

    // set result
    res.result = in3Res;
    return;
  })
}
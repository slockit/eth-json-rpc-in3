const In3Wasm = require('in3-wasm')
const { errors: rpcErrors } = require('eth-json-rpc-errors')
const createAsyncMiddleware = require('json-rpc-engine/src/createAsyncMiddleware')

module.exports = createIn3Middleware

function createIn3Middleware (config = {}) {

  //use default values if the values don't exist
  config["chainId"] = config.chainId || 'mainnet'
  config["signatureCount"] = config.signatureCount || 0
  config["maxAttempts"] = config.maxAttempts || 5
  config["proof"] = config.proof || 'standard'
  config["keepIn3"] = false

  //create a new client object
  const in3 = new In3Wasm(config)

  return createAsyncMiddleware(async (req, res, next) => {

    const in3Res = await in3.sendRPC(req.method, req.params)

    if (in3Res.error) throw rpcErrors.internal(in3Res.error.toString(), in3Res.error)

    // set result
    res.result = in3Res;
    return
  })
}
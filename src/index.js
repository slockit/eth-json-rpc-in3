const { errors: rpcErrors } = require('eth-json-rpc-errors')
const createAsyncMiddleware = require('json-rpc-engine/src/createAsyncMiddleware')
const In3Spawn = require('./In3Spawn.js')

module.exports = createIn3Middleware

function createIn3Middleware (config = {}) {

  //create a new client object
  const in3 = In3Spawn(config)

  return createAsyncMiddleware(async (req, res, next) => {
    const in3Res = await in3.sendRPC(req.method, req.params)
    if (in3Res.error) throw rpcErrors.internal(in3Res.error.toString(), in3Res.error)

    // set result
    res.result = in3Res;
    return
  })
}
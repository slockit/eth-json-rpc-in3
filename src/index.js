const { errors: rpcErrors } = require('eth-json-rpc-errors')
const createAsyncMiddleware = require('json-rpc-engine/src/createAsyncMiddleware')
const IN3Wasm = require('in3-wasm')

module.exports = createIn3Middleware

const defaultIn3Config = {
  signatureCount: 2,
  maxAttempts: 5,
  proof: 'standard',
  keepIn3: false,
  replaceLatestBlock: 10
}

const in3 = new IN3Wasm({ chainId: "mainnet", ... defaultIn3Config})

function createIn3Middleware (config = {}) {

  //reconfigure the client
  in3.setConfig(config)

  const replaceLatestBlock = config.replaceLatestBlock || defaultIn3Config.replaceLatestBlock

  return createAsyncMiddleware(async (req, res, next) => {
    let in3Res = await in3.sendRPC(req.method, req.params)

    if (req.method == "eth_blockNumber") {
      in3Res = "0x" + (parseInt(in3Res) - replaceLatestBlock).toString(16)
    }

    if (in3Res.error) throw rpcErrors.internal(in3Res.error.toString(), in3Res.error)

    // set result
    res.result = in3Res;
    return
  })
}
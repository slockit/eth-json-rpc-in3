const { errors: rpcErrors } = require('eth-json-rpc-errors')
const createAsyncMiddleware = require('json-rpc-engine/src/createAsyncMiddleware')
const IN3Wasm = require('in3-wasm')

module.exports = createIn3Middleware

const defaultIn3Config = {
  signatureCount: 2,
  maxAttempts: 5,
  proof: 'standard',
  keepIn3: false,
  replaceLatestBlock: 6
}

var In3Singleton = (function () {
    var instance = null

    function createInstance() {
        var object = new IN3Wasm({ chainId: "0x0", ... defaultIn3Config})
        return object;
    }

    return {
      getInstance: function (config) {
        if (!instance) {
          instance = createInstance();
          instance.setConfig(config)
        } else {
          //reconfigure in3
          instance.setConfig(config)
        }
        return instance;
      }
    };
})();

function createIn3Middleware (config = {}) {

  //create a new client object
  const in3 = In3Singleton.getInstance(config);
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
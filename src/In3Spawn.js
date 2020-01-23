const IN3Wasm = require('in3-wasm').default

module.exports = In3Spawn

const defaultIn3Config = {
  signatureCount: 0, // TODO: eth_blockNumber request fails when signature count is non zero
  maxAttempts: 5,
  proof: 'standard',
  keepIn3: false,
  replaceLatestBlock: 6
}

let mainnetInstance = new IN3Wasm({ chainId: "mainnet", ... defaultIn3Config})
let kovanInstance = new IN3Wasm({ chainId: "kovan", ... defaultIn3Config})
let goerliInstance = new IN3Wasm({ chainId: "goerli", ... defaultIn3Config})
let rinkebyInstance = new IN3Wasm({ chainId: "rinkeby", ... defaultIn3Config})
let ropstenInstance = new IN3Wasm({ chainId: "ropsten", ... defaultIn3Config})

function In3Spawn(config = {}) {
  if(!config.chainId) {
    return mainnetInstance;
  }

  if (config.chainId == "kovan") {
    return kovanInstance
  } else if (config.chainId == "goerli") {
    return goerliInstance
  } else if (config.chainId == "ropsten") {
    return ropstenInstance
  } else if (config.chainId == "rinkeby") {
    return rinkebyInstance
  }

  return mainnetInstance
}
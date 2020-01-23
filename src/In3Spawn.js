const In3Wasm = require('in3-wasm')

module.exports = In3Spawn

const defaultIn3Config = {
  signatureCount: 0,
  maxAttempts: 5,
  proof: 'standard',
  keepIn3: false
}

let mainnetInstance = new In3Wasm({ chainId: "mainnet", ... defaultIn3Config})
let kovanInstance = new In3Wasm({ chainId: "kovan", ... defaultIn3Config})
let goerliInstance = new In3Wasm({ chainId: "goerli", ... defaultIn3Config})
let rinkebyInstance = new In3Wasm({ chainId: "rinkeby", ... defaultIn3Config})
let ropstenInstance = new In3Wasm({ chainId: "ropsten", ... defaultIn3Config})

function In3Spawn(chainId) {
  if (chainId == "kovan") {
    return kovanInstance
  } else if (chainId == "goerli") {
    return goerliInstance
  } else if (chainId == "ropsten") {
    return ropstenInstance
  } else if (chainId == "rinkeby") {
    return rinkebyInstance
  }

  return mainnetInstance
}
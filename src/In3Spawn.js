const IN3asm = require('in3-asmjs').default

const defaultIn3Config = {
  signatureCount: 2,
  maxAttempts: 5,
  proof: 'standard',
  keepIn3: false,
  replaceLatestBlock: 10
}

module.exports = In3Spawn
module.exports.defaultIn3Config = defaultIn3Config

let mainnetInstance = new IN3asm({ chainId: "mainnet", ... defaultIn3Config})
let kovanInstance = new IN3asm({ chainId: "kovan", ... defaultIn3Config})
let goerliInstance = new IN3asm({ chainId: "goerli", ... defaultIn3Config})
let rinkebyInstance = new IN3asm({ chainId: "rinkeby", ... defaultIn3Config})
let ropstenInstance = new IN3asm({ chainId: "ropsten", ... defaultIn3Config})

function In3Spawn(config = {}) {
  if (!config.chainId) {
    throw new Error("config has no property chainId");
  }

  if (config.chainId == "kovan") {
    return kovanInstance
  } else if (config.chainId == "goerli") {
    return goerliInstance
  } else if (config.chainId == "ropsten") {
    return ropstenInstance
  } else if (config.chainId == "rinkeby") {
    return rinkebyInstance
  } else if (config.chainId == "mainnet") {
    return mainnetInstance
  }
}
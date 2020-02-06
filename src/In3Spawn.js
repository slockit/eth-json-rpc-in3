const IN3asm = require('in3-asmjs').default;
const defaultIn3Config = require("./defaultIn3Config.js")

module.exports = In3Spawn;

const mainnetInstance = new IN3asm({ chainId: "mainnet", ... defaultIn3Config});
const kovanInstance = new IN3asm({ chainId: "kovan", ... defaultIn3Config});
const goerliInstance = new IN3asm({ chainId: "goerli", ... defaultIn3Config});
const rinkebyInstance = new IN3asm({ chainId: "rinkeby", ... defaultIn3Config});
const ropstenInstance = new IN3asm({ chainId: "ropsten", ... defaultIn3Config});

function In3Spawn(config = {}) {
  if (!config.chainId) {
    throw new Error("config has no property chainId");
  }

  if (config.chainId == "kovan") {
    return kovanInstance;
  } else if (config.chainId == "goerli") {
    return goerliInstance;
  } else if (config.chainId == "ropsten") {
    return ropstenInstance;
  } else if (config.chainId == "rinkeby") {
    return rinkebyInstance;
  } else if (config.chainId == "mainnet") {
    return mainnetInstance;
  }
}
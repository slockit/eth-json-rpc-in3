const IN3asm = require('in3-asmjs').default;
const defaultIn3Config = require("./defaultIn3Config.js")

module.exports = In3Spawn;

const mainnetInstance = new IN3asm({ chainId: "mainnet", ... defaultIn3Config});
const kovanInstance = new IN3asm({ chainId: "kovan", ... defaultIn3Config});
const goerliInstance = new IN3asm({ chainId: "goerli", ... defaultIn3Config});

function In3Spawn(config = {}) {
  if (!config.chainId) {
    throw new Error("config has no property chainId");
  }

  if (config.chainId == "kovan") {
    kovanInstance.setConfig(config);
    return kovanInstance;
  } else if (config.chainId == "goerli") {
    goerliInstance.setConfig(config);
    return goerliInstance;
  } else if (config.chainId == "mainnet") {
    mainnetInstance.setConfig(config);
    return mainnetInstance;
  }
}
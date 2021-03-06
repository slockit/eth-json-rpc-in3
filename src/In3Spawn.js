const IN3asm = require('in3-asmjs').default;
const defaultIn3Config = require("./defaultIn3Config.js")

module.exports = in3Spawn;

const mainnetInstance = new IN3asm({ chainId: "mainnet", ... defaultIn3Config});
const kovanInstance = new IN3asm({ chainId: "kovan", ... defaultIn3Config});
const goerliInstance = new IN3asm({ chainId: "goerli", ... defaultIn3Config});

function checkChainId(unknownId, chainName) {
  const chainIdMap = {
    kovan: ["kovan", 42, "42", "0x2a", "2a", "2A"],
    mainnet: ["mainnet", 1, "0x1", "1"],
    goerli: ["goerli", 5, "0x5", "5"]
  }

  return chainIdMap[chainName].includes(unknownId)
}

function in3Spawn(config = {}) {
  if (!config.chainId) {
    throw new Error("config has no property chainId");
  }

  if (checkChainId(config.chainId, "kovan")) {
    config.chainId = 'kovan' //overwrite chainId after checking it.
    kovanInstance.setConfig(config);
    return kovanInstance;
  } else if (checkChainId(config.chainId, "goerli")) {
    config.chainId = 'goerli' //overwrite chainId after checking it.
    goerliInstance.setConfig(config);
    return goerliInstance;
  } else if (checkChainId(config.chainId, "mainnet")) {
    config.chainId = 'mainnet' //overwrite chainId after checking it.
    mainnetInstance.setConfig(config);
    return mainnetInstance;
  }
}
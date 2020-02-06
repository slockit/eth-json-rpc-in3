/** Tests
* test the persistence of blacklists on respawn
* test the persistence of cache on respawn
* test blacklist resetting at >50% blacklisting.
*/

const createIn3Middleware = require("../src/index.js");
const RpcEngine = require('json-rpc-engine')
const assert = require('chai').assert;
const defaultIn3Config = require('../src/defaultIn3Config.js')

describe('JSON-RPC-MAINNET', () => {

  const tests = JSON.parse(fs.readFileSync("./test/mainnetTests.json", 'utf8').toString())

  for (const testCase of tests) {
    it(testCase.testMessage, async () => {
      const result = await handleTestCase(testCase)
      assert.deepEqual(result, testCase.exp_result)
    })
  }

})

describe('JSON-RPC-KOVAN', () => {

  const tests = JSON.parse(fs.readFileSync("./test/kovanTests.json", 'utf8').toString())

  for (const testCase of tests) {
    it(testCase.testMessage, async () => {
      const result = await handleTestCase(testCase)
      assert.deepEqual(result, testCase.exp_result)
    })
  }

})

async function handleTestCase(testCase) {
  const engine = new RpcEngine()
  engine.push(createIn3Middleware(testCase.config))

  return new Promise((resolve, reject) => {
    engine.handle(testCase.request, function (err,res) {
      if (err) reject(err);
      else resolve(res.result);
    })
  })
}
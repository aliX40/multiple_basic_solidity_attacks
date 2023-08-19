
require("@nomiclabs/hardhat-waffle");
require("hardhat-etherscan-abi");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
module.exports = {
  // networks: {
  //   hardhat: {
  //   chainId: 1,
  //   forking: {
  //     url: "https://eth-mainnet.g.alchemy.com/v2/6-9RQyL5qVBFsF2NFmHSpK8ikhkF_0LC",
  //     blockNumber: 4500000
  //     },
  //   }
  // },
  // etherscan: {
  //    apiKey: "RPHWY2UMTIXFK9B3MXFY9NYM2N4YG7EY67"
  // },
  solidity: {
    compilers: [
      { version: "0.8.9", }, { version: "0.6.6", },  { version: "0.5.4", },
  ]},
};

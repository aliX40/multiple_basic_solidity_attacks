
require("@nomiclabs/hardhat-waffle");
require("hardhat-etherscan-abi");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.9", }, { version: "0.6.6", },  { version: "0.5.4", },
  ]},
};

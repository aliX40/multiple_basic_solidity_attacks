## Pocs 
This repository contains multiple examples of pocs that exploit basic and well-know solidity vulnerabilities.
You can check all smart contracts that are either used as target or  to attack  smart-contracts under .\contracts
Most of the contracts being used as practice targets are from the [ethereum book](https://github.com/ethereumbook/ethereumbook/blob/develop/09smart-contracts-security.asciidoc)
## Available Pocs
parity.js: paity multisig wallet second hack        
reentrency.js: exploit for the reentrency vulnerability on EtherStore       
time_lock_attack: exploit uint overflow vulnerability on TimeLock.        
fibonacci_delegate_attack: exploit the unsecure delegatecall + proxy setup to run arbitrary code on the contract.          
## Run Test
To run the test use:
```
npx hardhat test .\tests\test_name.js
```

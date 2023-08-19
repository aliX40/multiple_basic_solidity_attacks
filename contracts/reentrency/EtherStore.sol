// SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.6;
import "hardhat/console.sol";
contract EtherStore {

    uint256 public withdrawalLimit = 1 ether;
    mapping(address => uint256) public lastWithdrawTime;
    mapping(address => uint256) public balances;

    function depositFunds() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdrawFunds (uint256 _weiToWithdraw) public {
        require(balances[msg.sender] >= _weiToWithdraw,"insufficient Ballance ");
        (bool success,bytes memory data) = msg.sender.call{value:_weiToWithdraw}("");
        console.log("Ballance",balances[msg.sender]);
        console.log(_weiToWithdraw);
        require(success, "something went wrong");
        balances[msg.sender] -= _weiToWithdraw;
        lastWithdrawTime[msg.sender] = now;
    }
 }
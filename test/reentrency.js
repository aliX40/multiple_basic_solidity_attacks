const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");
const { parseEther } = require("ethers/lib/utils");

describe("Reentrency", function async () {
    let etherstore_contract;
    let attack_contract;
    describe("Deployment", async function () {
        it("Should be initialized", async function () {
            // Deploy the ether store
            const etherstore= await ethers.getContractFactory("EtherStore");
            etherstore_contract = await  etherstore.deploy()
            await etherstore_contract.deployed();
            console.log(`the store is deployed ${etherstore_contract.address}`)
            // Deploy the attack contract 
            const att= await ethers.getContractFactory("EtherStoreAttack");
            attack_contract = await  att.deploy(etherstore_contract.address)
            await attack_contract.deployed()
            console.log(`the attack is deployed ${attack_contract.address}`)
            expect(etherstore_contract.address != null);
            expect(attack_contract.address != null);
            [_ , good_address, attacker_address] = await ethers.getSigners();
            console.log(`good address: ${good_address.address}`);
            console.log(`bad address ${attacker_address.address}`)
            let tx = await etherstore_contract.connect(good_address).depositFunds({value:parseEther("11")});
            await tx.wait();
             // Check that at this point the GoodContract's balance is 10 ETH
            let balanceETH = await ethers.provider.getBalance(etherstore_contract.address);
            console.log("store balance", balanceETH)
            expect(balanceETH).to.equal(parseEther("11"));
            // Attack bro
            tx = await attack_contract.connect(attacker_address).attack({value:parseEther("1")})

            balanceETH = await ethers.provider.getBalance(attack_contract.address);
            console.log(`attacker_contract_ballance: ${balanceETH}`)
            expect(balanceETH).to.equal(parseEther("12"))
            balanceETH = await ethers.provider.getBalance(etherstore_contract.address);
            console.log(`etherstore_ballance: ${balanceETH}`)
            expect(balanceETH).to.equal(parseEther("0"))


        })



    })

})
const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");
const { parseEther } = require("ethers/lib/utils");

describe("Fibonacci Ballance", async function () {
    let fl_contract;
    let fb_contract;
    let attacker;
    describe("Deploy",async function(){
        it("should be deployed", async function(){
            // Deploy Fibonnaci Library
            const lib = await ethers.getContractFactory("FibonacciLib");
            fl_contract = await lib.deploy();
            await fl_contract.deployed();
            console.log(fl_contract.address);
            expect(fl_contract.address).not.null;
            // Deploy the fibonnaci Ballance library
            const fballace = await ethers.getContractFactory("FibonacciBalance");
            fb_contract = await fballace.deploy(fl_contract.address,{value:parseEther("89")});
            await fb_contract.deployed();
            console.log(fb_contract.address);
            expect(fb_contract.address).not.null;
            const att = await ethers.getContractFactory("FibonacciLibEvil") ;
            attacker = await att.deploy()
            console.log("attacker",attacker.address)
        })
    })

    describe("Exploit", async function(){
        it("Should be able to swap lib address", async function(){
            await attacker.attack(fb_contract.address);

            console.log("done")
        })


    })



});
const {expect} = require("chai");
const { ethers } = require("hardhat");

describe("Token contract",function (){

    it("Deployment should assign the total supply of tokens to the owner",async function() {

        const [owner] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Token");//instance contract
        const hardhatToken = await Token.deploy();//deploy contract

        const ownerBalance = await hardhatToken.balanceOf(owner.address);//ownerBalance = 10000
        console.log("Owner Address:",owner.address);

        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);//total supply = 10000

    });

    it("Should transfer tokens between accounts",async function() {

        const [owner,addr1, addr2] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Token");//instance contract
        const hardhatToken = await Token.deploy();//deploy contract
        //Transer 10 tokens from owner to addr1

        await hardhatToken.transfer(addr1.address,10);
        expect(await hardhatToken.balanceOf(addr1.address)).to.equal(10);
        
        //Transfer 5 tokens from addr1 to addr2
        await hardhatToken.connect(addr1).transfer(addr2.address,5);
        expect(await hardhatToken.balanceOf(addr2.address)).to.equal(5);

    });
});
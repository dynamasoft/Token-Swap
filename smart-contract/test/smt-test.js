const { expect,use } = require("chai");
const { ethers } = require("hardhat");
//import { BigNumber } from 'ethers';
const {deployContract, MockProvider, solidity} = require('ethereum-waffle');
use(solidity);
use(require('chai-bignumber')());

describe("SMT Token Testing", function () {

  const name = 'Smitty Token';
  const symbol = 'SMT';
  const initialExchangeRate = "2"; //1 ETH = 2 SMT Token
  let SMTToken;
  let provider = ethers.provider; 
  let accounts;
  let owner, recipient;

  before("setup contract", async () => {
    
    //deployment
    const token = await ethers.getContractFactory("SMT");
    SMTToken = await token.deploy(name, symbol, initialExchangeRate);
    await SMTToken.deployed();
    accounts = await ethers.getSigners();
    owner = accounts[0];    
    recipient = accounts[1];    

    // for (let i = 1; i < accounts.length; i++) {
    //   if (i < 10) {
    //     propertyOwners.push(accounts[i]);
    //   } 
    //   else 
    //   {
    //     applicants.push(accounts[i]);
    //   }
    // }
  });


   it('Check to make sure the owner is correct', async () => {    
    expect(await SMTToken.owner(), owner.address);
  });

  it('has a name', async function () {
    expect(await SMTToken.name()).to.equal(name);
  });

  it('has a symbol', async function () {
    expect(await SMTToken.symbol()).to.equal(symbol);
  });

  it('has 18 decimals', async function () {
    expect(await SMTToken.decimals()).to.be.bignumber.equal('18');
  });

   //it('Assigns initial balance', async () => {    
     //let initialSupply = 1000;
     //await SMTToken.mint(owner.address, initialSupply);     
     //expect(await SMTToken.balanceOf(owner.address)).to.equal(initialSupply);
  // });


  it('Get exchange rate' , async () => {  
    
    var rate = await SMTToken.getExchangeRate();        
    var exchangeRate = ethers.utils.formatUnits(rate,0);    
    expect(parseInt(exchangeRate)).to.equal(parseInt(initialExchangeRate));

  });

   it('Swap Token between ETH to SMT and verify the smart contract balance and owner balance' , async () => {  
   
    //get exchange rate;
    var rate = await SMTToken.getExchangeRate();        
    var exchangeRate = ethers.utils.formatUnits(rate,0);    
    console.log("exchange rate: ", exchangeRate);
    
    //token balance before;    
    var beforeBal =  await SMTToken.balanceOf(owner.address);
    console.log("beforeMintBal:" + beforeBal);

    //mint
    var ethTobeTransfered = "1";
    await SMTToken.mint({from: owner.address, value: ethers.utils.parseEther(ethTobeTransfered)}); 

    var afterBal =  await SMTToken.balanceOf(owner.address);
    afterBal = ethers.utils.formatUnits(afterBal,0);
    console.log("aftermintBal:" + afterBal);           

    expect(parseInt(ethTobeTransfered) * parseInt(exchangeRate)).to.equal(parseInt(afterBal));
   });  
  
  
   it('Testing the receive function', async () => {  

    //amount of eth to be transferred
    var ethTobeTransfered = "1";
    
    //balance of token and owner before
    var ownerBalBeforeTransfer = await provider.getBalance(owner.address);
    var contractBalBeforeTransfer = await provider.getBalance(SMTToken.address);    
    
    //transfer
    await owner.sendTransaction({to: SMTToken.address, value: ethers.utils.parseEther(ethTobeTransfered) });
    
    // balance of token and owner after.
    var ownerBalAfterTransfer = await provider.getBalance(owner.address);    
    var contractBalAfterTransfer = await provider.getBalance(SMTToken.address);
    
    // console.log("owner balance before transfer:" + ethers.utils.formatEther(ownerBalBeforeTransfer));    
    // console.log("owner balance after transfer:" + ethers.utils.formatEther(ownerBalAfterTransfer));    
    // console.log("contract balance before transfer:" + ethers.utils.formatEther(contractBalBeforeTransfer));    
    // console.log("contract balance after transfer:" + ethers.utils.formatEther(contractBalAfterTransfer));    

    var result = +(ethers.utils.formatEther(contractBalBeforeTransfer)) + parseInt(1);    
    expect(+(ethers.utils.formatEther(contractBalAfterTransfer))).to.equal(result);
  });

});

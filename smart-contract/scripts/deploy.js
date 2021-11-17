// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const fs = require('fs');


async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');




  const name = 'Smitty Token';
  const symbol = 'SMT';
  const initialExchangeRate = "0.5"; //1 ETH = 2 SMT Token

  // We get the contract to deploy
  const SMT = await hre.ethers.getContractFactory("SMT");
  const smt = await SMT.deploy(name, symbol, ethers.utils.parseEther(initialExchangeRate));

  await smt.deployed();
  console.log("SML deployed to:", smt.address);

  console.log("Coping the deployed address..", smt.address);
  
  fs.writeFileSync(
    __dirname + "/../../client/src//artifacts/contracts/config.json",
    JSON.stringify(smt.address, null, "\t"),
    "utf-8"
  );
 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

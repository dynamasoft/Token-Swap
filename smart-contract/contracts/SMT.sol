// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";


contract SMT is ERC20, Pausable, Ownable {

    uint public  _initialExchangeRate;

    constructor(string memory name, string memory symbol,  uint initialExchangeRate) ERC20(name, symbol) 
    {
        _initialExchangeRate = initialExchangeRate;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }    
    
    function withdraw() public onlyOwner
    {
        payable(owner()).transfer(address(this).balance);
    }

    function totalBalance() external view returns(uint bal)
    {
        return address(this).balance;
    }

    // React to receiving ether
    receive() external payable {}    
}




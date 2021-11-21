// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol";


contract SMT is ERC20, Pausable, Ownable, ReentrancyGuard {

    /******************************************************************
        STATE VARIABLES
    ******************************************************************/
    uint public  _initialExchangeRate;
    using SafeMath for uint256;
    
    /******************************************************************
        MODIFIER
    ******************************************************************/
     /// @notice this modifier checks to make sure the property exists
    modifier requireFund() {
        //check if the object is null
        require(msg.value > 0, "this transaction requires eth");
        _;
    }

    /**
     * @notice constructor
     * @dev make sure to pass name and symbol to the parent class
     * @param name name of token
     * @param symbol symbon of token
     * @param initialExchangeRate initial exchange rate
     */
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

    function mint() payable 
    requireFund    
    nonReentrant
    public {        
        uint smtToken = msg.value.div(10 ** decimals()).mul(_initialExchangeRate);               
        _mint(msg.sender, smtToken);
    }    

    function getExchangeRate() public view returns(uint)
    {
        return _initialExchangeRate;
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

    function balanceOf(address owner) public view override returns(uint256) 
    {
        return super.balanceOf(owner); 
    }

    function totalBalance() external view returns(uint bal)
    {
        return address(this).balance;
    }

    // React to receiving ether
    receive() external payable {}    
}




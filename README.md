# Token Swap Project

This project demonstrate the token swap functionality from ETH to SMT Token.

It was built using:

Smart Contract:
- Hardhat
- Solidity 0.8.2
- Unit Testing using Waffle and Chai

Front End
- React
- Web3-React for Smart Contract Connection
- BootStrap
- Context for state management.
- Hooks

Deployment:
- Ropsten Network


Smart Contract Best Pattern:
- Reentrancy Guard using open zeppelin
- Arithmetic flow protection by using safe math
- using modifier to check the value before code the execution.
- Using specific compiler pragma 0.8.4



step to deploy to github pages
npm install gh-pages --save-dev

add the following in the package.json
"homepage": "https://dynamasoft.github.io/token-swap/",

"predeploy": "npm run build",
"deploy": "gh-pages -d build"


https://dynamasoft.github.io/Token-Swap/
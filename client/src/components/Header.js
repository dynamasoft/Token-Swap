import React, { useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { useWeb3React } from "@web3-react/core";
import Wallet from "../hooks/Wallet";
import { SMTToken } from "../hooks/SMTToken";
import WalletConnect from "../hooks/WalletConnect";
import {
  Row,
  Container,
  Col,
  Breadcrumb,
  Card,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

const Header = () => {
  const { account } = useWeb3React();
  const { fetchEthBalance, ethBalance } = Wallet();
  const {
    fetchSMTTokenBalance,
    fetchSMTTokenExchangeRate,
    SMTTokenBalance,
    exchangeRate,
  } = SMTToken();

  useEffect(() => {
    if (account) {
      debugger;
      fetchEthBalance();
      fetchSMTTokenBalance();
      fetchSMTTokenExchangeRate();
    }
  }, [account]);

  return (
    <Container>    
      <Card className="mb-15" style={{ textAlign:'center' }}>
        <WalletConnect />
      </Card>

      <Card>
        <Row className="mx-auto my-2">
          <Col>
            ETH balance: {ethBalance}
          </Col>
          <Col>
            SMT balance: {SMTTokenBalance}
          </Col>
          <Col>
            SMT Exchange Rate: {exchangeRate}
          </Col>
        </Row>
      </Card>    
    </Container>
  );
};

export default Header;

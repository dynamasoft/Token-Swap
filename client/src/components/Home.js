import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Wallet from '../hooks/Wallet';
import { SMTToken } from '../hooks/SMTToken';
import Swap from '../components/Swap';
const Home = () => {

  return (
    <Container className="mt-5">
      <Swap></Swap>
    </Container>
  );
};

export default Home;

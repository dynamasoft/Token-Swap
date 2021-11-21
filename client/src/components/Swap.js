import React, { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { SMTToken } from "../hooks/SMTToken";
import { TokenContext } from "../context/TokenContext";
import Spinner from "react-bootstrap/Spinner";
import Wallet from "../hooks/Wallet";
import Transaction from "../hooks/Transaction";
import { Card, Button, Row, Col } from "react-bootstrap";

const Swap = () => {
  const [depositAmount, setDepositAmount] = useState(0);

  const { deposit, SMTTokenBalance, exchangeRate } = SMTToken();

  const { ethBalance } = Wallet();

  const { txnStatus, setTxnStatus } = Transaction();

  const handleDepositSubmit = () => deposit(depositAmount);

  const convertedAmount = useMemo(
    () => Number(depositAmount / exchangeRate).toFixed(4),
    [depositAmount, exchangeRate]
  );

  console.log(exchangeRate);

  if (txnStatus === "LOADING") {
    return (
      <Container show>
        <div>
          <Spinner animation="border" role="status" className="m-auto" />
        </div>
      </Container>
    );
  }

  if (txnStatus === "COMPLETE") {
    return (
      <Container show>
        <div>
          <div block center className="mb-5">
            Txn Was successful!
          </div>
          <Button onClick={() => setTxnStatus("NOT_SUBMITTED")}>Go Back</Button>
        </div>
      </Container>
    );
  }

  if (txnStatus === "ERROR") {
    return (
      <Container show>
        <div>
          <div>Txn ERROR</div>
          <Button onClick={() => setTxnStatus("NOT_SUBMITTED")}>Go Back</Button>
        </div>
      </Container>
    );
  }

  return (
    <Card>
      <div className="mb-3">Deposit</div>

      <Row>
        <Col>
          <input
            type="number"
            onChange={(e) => setDepositAmount(e.target.value)}
          />
        </Col>

        <Col>
          <input type="number" readOnly value={convertedAmount} />
        </Col>

        <Col>
          <Button disabled={depositAmount <= 0} onClick={handleDepositSubmit}>
            Deposit {depositAmount} ETH
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default Swap;

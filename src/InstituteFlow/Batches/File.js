import React from "react";

import { Button, Container, Col, Form, InputGroup } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";

class File extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tiers: [
        {
          region: [],
          tieredInputs: [{ min: 0, max: 0, metric: "aDAU", amt: 0 }]
        }
      ]
    };
  }

  //to add a tier
  addTClick = (i) => {
    const tiers = [...this.state.tiers];
    tiers[i].tieredInputs.push({ min: 0, max: 0, metric: "aDAU", amount: 0 });
    this.setState({ tiers });
  };

  //to remove a tier
  removeTClick = (i, idx) => {
    const tiers = [...this.state.tiers];
    tiers[i].tieredInputs.splice(idx, 1);
    this.setState({ tiers });
  };

  //to add region and tier
  addFTClick = () => {
    const tiers = [...this.state.tiers];
    tiers.push({
      region: [],
      tieredInputs: [{ min: 0, max: 0, metric: "aDAU", amt: 0 }]
    });
    this.setState({ tiers });
  };

  render() {
    return (
      <Container>
        {this.state.tiers.map((tier, i) => (
          <Form.Row key={i}>
            <div>
              <Form.Group className="full-width">
                <Form.Label className="main-label">Geography</Form.Label>
              </Form.Group>
              <Form.Group className="full-width">
                <Form.Label className="main-label">Tiers</Form.Label>


                {tier.tieredInputs.map((tieredInput, idx) => (
                  <div key={idx} className="tier">
                    <Form.Row>
                      <Col sm={12} md={2} lg={2}>
                        <Form.Group className="">
                          <Form.Label>Min</Form.Label>
                          <Form.Control
                            placeholder="0"
                            aria-label="min range"
                            name="min_range"
                            required
                            ref="min_range"
                            onChange={(e) => this.handleTChange(e)}
                            onClick={(e) => this.setSelectedIndex(idx)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col sm={12} md={2} lg={2}>
                        <Form.Group className="">
                          <Form.Label>Max</Form.Label>
                          <Form.Control
                            placeholder="0"
                            aria-label="max range"
                            name="max_range"
                            required
                            ref="max_range"
                            onChange={(e) => this.handleTChange(e)}
                            onClick={(e) => this.setSelectedIndex(idx)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col sm={12} md={3} lg={3}>
                        <Form.Label>Amount</Form.Label>
                        <InputGroup className="mmb-3 fw">
                          <Form.Control
                            placeholder="0.00"
                            aria-label="tiered amount"
                            aria-describedby="tiered-amt-addon2"
                            name="tiered_amount"
                            pattern="^\d*\.\d{1,18}$"
                            required
                            ref="tiered_amt"
                            onChange={(e) => this.handleTChange(e)}
                            onClick={(e) => this.setSelectedIndex(idx)}
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="tiered-amt-addon2">
                              USD
                            </InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      </Col>
                      <Col
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: 16
                        }}
                      >
                        <Button
                          variant="danger"
                          onClick={this.removeTClick.bind(this, i, idx)}
                        >
                          <FaTrashAlt />
                        </Button>
                      </Col>
                    </Form.Row>
                  </div>
                ))}
                <Form.Row>
                  <Button
                    variant="link"
                    className="addMoreBtn"
                    onClick={this.addTClick.bind(this, i)}
                  >
                    +Add More
                  </Button>
                </Form.Row>
              </Form.Group>
            </div>
          </Form.Row>
        ))}
        <Form.Row>
          <Button className="addMoreBtn" onClick={this.addFTClick.bind(this)}>
            +Add Region
          </Button>
        </Form.Row>
      </Container>
    );
  }
}

export default File;

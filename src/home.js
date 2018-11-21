import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

// My own React components
import SpecialDay from './specialday';
import Pictures from './pictures';
import Map from "./Map.js";

const Home = (props) => (
    <div>
    <Container>
        <Row>
            <Col>
            <SpecialDay/>
            </Col>
        </Row>
        <Row>
            <Col>
                <Map />
            </Col>
        </Row>
        <Row>
          <Col>
            <Button tag="a" color="success" href="http://reactstrap.github.io" target="_blank">This is a button</Button>
            <Button tag="a" href="/404test">Nowhere</Button>
          </Col>
        </Row>
    </Container>
    </div>
)

export default Home;

import React from 'react';
import { Container, Row, Col, Button, Tooltip } from 'reactstrap';

// My own React components
import SpecialDay from './specialday';
import Pictures from './pictures';
import Map from "./Map.js";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state  = {
            tooltipOpen: false
        };
    }

    toggle() {
       this.setState({
         tooltipOpen: !this.state.tooltipOpen
       });
     }

    render(props) {
        return (
            <div>
            <Container>
                <Row>
                    <Col>
                    <span id="specialday">
                    <SpecialDay/>
                    <Tooltip target="specialday" isOpen={this.state.tooltipOpen}
                        toggle={this.toggle}><SpecialDay.TooltipContent /></Tooltip>
                    </span>
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
        );
    }
}

export default Home;

import React, {Component} from 'react';
import { connect } from 'react-redux'
import {Card, CardTitle, CardText, CardImg, CardSubtitle} from 'reactstrap';

class About extends Component {
    render() {
        let theme = this.props.theme;
        let inverse = (theme.name == "dark")
        return (
            <Card inverse={inverse} style={{backgroundColor: theme.background}}>
              <CardTitle>
                About react-bootstrap-test
              </CardTitle>
              <CardText>
                  This app is a test of React and Bootstrap.<br/>
                  Can you tell this is using the "{theme.name}" theme?
              </CardText>
            </Card>
        );
    }
}

let mapStateToProps = (state) => ( state.theme );
export default connect(mapStateToProps)(About);

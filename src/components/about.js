import React, {Component} from 'react';
import {Card, CardTitle, CardText, CardImg, CardSubtitle} from 'reactstrap';

export default class About extends Component {
    render() {
        let theme = this.props;
        let inverse = (theme.name == "dark")
        return (
            <div >
              <Card inverse={inverse} style={{backgroundColor: theme.background}}>
              <CardTitle>
                About react-bootstrap-test
              </CardTitle>
              <CardText>
                  This app is a test of React and Bootstrap.<br/>
                  Can you tell this is using the "{theme.name}" theme?
              </CardText>
              </Card>
            </div>
        );
    }
}

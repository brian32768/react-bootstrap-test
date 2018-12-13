import React, {Component} from 'react';
import {ThemeContext} from './theme-context';
import {Card, CardTitle, CardText, CardImg, CardSubtitle} from 'reactstrap';

class About extends Component {
    render() {
        let props = this.props;
        let theme = this.context;
        let inverse = (theme.name == "dark")
        console.log('About theme=', theme)
        return (
            <div>
              <Card inverse={inverse} style={{backgroundColor: theme.background}}>
              <CardTitle>
                About react-bootstrap-test
              </CardTitle>
              <CardText>
                  This app is a test of React and Bootstrap.
                  Can you tell this is using a "{theme.name}" theme?
              </CardText>
              </Card>
            </div>
        );
    }
}
About.contextType = ThemeContext;

export default About;

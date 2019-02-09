import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, CardImg, CardText, CardBody,
         CardTitle, CardSubtitle, Button } from 'reactstrap'

const img = require('/assets/Proud.jpg');
const alt = 'This is a pigeon';

class Contact extends React.Component {
    static propTypes = {
        theme: PropTypes.object
    }
    render() {
        let theme = this.props.theme;
        let inverse = (theme.name == "dark")
        return (
            <div>
              <Card inverse={inverse} style={{backgroundColor: theme.background}} >
                <CardImg className="card_image" src={img} alt={alt}></CardImg>
                <CardBody>
                  <CardTitle>Contact us</CardTitle>
                  <CardText>
                  Tie a message to this pigeon's leg or alternatively,
                    send me email at <a href="mailto:brian@wildsong.biz">brian@wildsong.biz</a>
                  </CardText>
                </CardBody>
              </Card>
            </div>
        );
    }
}

let mapStateToProps = (state) => ( state.theme );
export default connect(mapStateToProps)(Contact);

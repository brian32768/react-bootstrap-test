import React from 'react'   // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'react-bootstrap'  // eslint-disable-line no-unused-vars

const img = require('/assets/Proud.jpg');
const alt = 'This is a pigeon';

const Contact = ({ theme }) => (
    <>
      <Card inverse={ (theme.name == "dark") }
                style={{backgroundColor: theme.background}} >
        <CardImg className="card_image" src={img} width="320" alt={alt}></CardImg>
        <CardBody>
          <CardTitle>Contact us</CardTitle>
          <CardText>
          Tie a message to this pigeon's leg or alternatively,
            send me email at <a href="mailto:brian@wildsong.biz">brian@wildsong.biz</a>
          </CardText>
        </CardBody>
      </Card>
    </>
);
Contact.propTypes = {
    theme: PropTypes.object
}
const mapStateToProps = (state) => ({
    theme: state.theme
});
export default connect(mapStateToProps)(Contact);

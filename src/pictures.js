// picture.js
//
import React from "react";
import ReactDOM from "react-dom";

export default class Pictures extends React.Component {
    constructor() {
        super();
        this.state = {
            pictureclass: "bird_picture",
        }
        this.pictureSwitcher = this.pictureSwitcher.bind(this);
        this.gotFocus     = this.gotFocus.bind(this);
        this.lostFocus    = this.lostFocus.bind(this);
    }

    pictureSwitcher(alt) {
        // Called from the button component to switch the picture and footer text
        console.log('pictureSwitcher');
        this.setState({
            pictureclass: alt?"beaver_picture":"bird_picture"
        });
    }

    gotFocus() {
        if (this.state.pictureclass == 'bird_picture') {
            this.setState({
                pictureclass:  "animated_picture",
            });
        }
    }

    lostFocus() {
        if (this.state.pictureclass == 'animated_picture') {
            this.setState({
                pictureclass:  "bird_picture",
            });
        }
    }

    render() {
        console.log('the picture=', this.props.mypicture);
        if (this.state.picture) {
            console.log('dddddd');
        }
        let picture = this.state.pictureclass;
        if (this.props.mypicture) {
            picture = "beaver_picture"
        }
        return (
            <div onMouseOver={this.gotFocus} onMouseOut={this.lostFocus}
            className={picture}></div>
        );
    }
}

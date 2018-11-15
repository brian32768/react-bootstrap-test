// logo.js
//
import React from "react";
import ReactDOM from "react-dom";

export default class AppLogo extends React.Component {
    constructor() {
        super();
        this.state = {
            logoclass: "bird_logo",
        }
        this.logoSwitcher = this.logoSwitcher.bind(this);
        this.gotFocus     = this.gotFocus.bind(this);
        this.lostFocus    = this.lostFocus.bind(this);
    }

    logoSwitcher(alt) {
        // Called from the button component to switch the logo and footer text
        console.log('logoSwitcher');
        this.setState({
            logoclass: alt?"beaver_logo":"bird_logo"
        });
    }

    gotFocus() {
        if (this.state.logoclass == 'bird_logo') {
            this.setState({
                logoclass:  "animated_logo",
            });
        }
    }

    lostFocus() {
        if (this.state.logoclass == 'animated_logo') {
            this.setState({
                logoclass:  "bird_logo",
            });
        }
    }

    render() {
        console.log('the logo=', this.props.mylogo);
        if (this.state.logo) {
            console.log('dddddd');
        }
        let logo = this.state.logoclass;
        if (this.props.mylogo) {
            logo = "beaver_logo"
        }
        return (
            <div onMouseOver={this.gotFocus} onMouseOut={this.lostFocus}
            className={logo}></div>
        );
    }
}

import React, {Component} from 'react'

function fetchData() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(['First', 'Second', 'Third']);     }, 2000);
    });
}

export default class ContainerTest extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        fetchData.then(
            items => this.setState({ items })
        );
    }

    render() {
    }
}

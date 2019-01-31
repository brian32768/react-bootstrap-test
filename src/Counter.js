import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <div className="container">
        <button className="buttons" onClick={this.props.decCount}>-</button>
        <span>{ this.props.countValue }</span>
        <button className="buttons" onClick={this.props.incCount}>+</button>
      </div>
    );
  }
}

export default Counter;

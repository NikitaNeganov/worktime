import React, { Component } from "react";
import classes from "./LetterList.module.css";
import Letter from "../Letter/Letter";

class LetterList extends Component {
  render() {
    if (this.props.msg) {
      this.forceUpdate();
    }
    const letters = this.props.en.map(el => {
      return (
        <Letter
          onClick={this.props.onClick}
          key={el.name}
          state={el.state}
          name={el.name}
        />
      );
    });
    return <div className={classes.Letters}>{letters}</div>;
  }
}

export default LetterList;

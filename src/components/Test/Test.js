import React, { Component } from "react";
import { interpolateColors } from "../../utils/utils";
import classes from "./Test.module.css";

class Test extends Component {
  render() {
    //const arr = interpolateColors("255,0,0", "91,150,27", 100);
    const arr1 = interpolateColors("255,0,0", "255,184,0", 25);
    const arr2 = interpolateColors("255,184,0", "255,141,0", 25);
    const arr3 = interpolateColors("255,141,0", "91,150,27", 25);
    const arr4 = interpolateColors("91,150,27", "4,163,11", 25);
    const arr = [...arr1, ...arr2, ...arr3, ...arr4];
    const colors = arr.map(color => {
      return (
        <div
          key={color}
          className={classes.Li}
          style={{ color: `rgb(${color})` }}
        >
             61.54%
        </div>
      );
    });
    return <ul className={classes.Ul}>{colors}</ul>;
  }
}

export default Test;

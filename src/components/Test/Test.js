import React, { Component } from "react";

import { interpolateColors } from "../../utils/utils";
import classes from "./Test.module.css";

class Test extends Component {
  render() {
    //const arr = interpolateColors("255,0,0", "91,150,27", 100);
    const arr1 = interpolateColors("255,0,0", "255,184,0", 50);
    const arr2 = interpolateColors("255,184,0", "91,150,27", 50);
    const arr = [...arr1, ...arr2];
    const colors = arr.map(color => {
      return (
        <div className={classes.Li} style={{ color: `rgb(${color})` }}>
             61.54%
        </div>
      );
    });
    return <ul className={classes.Ul}>{colors}</ul>;
  }
}

export default Test;

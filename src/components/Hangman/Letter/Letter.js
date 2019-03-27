import React from "react";
import classes from "./Letter.module.css";

const letter = props => {
  const style = props.state
    ? { cursor: "not-allowed", backgroundColor: "#ddd", pointerEvents: "none" }
    : { cursor: "pointer" };
  return (
    <li onClick={props.onClick} style={style} className={classes.Letter}>
      {props.name}
    </li>
  );
};

export default letter;

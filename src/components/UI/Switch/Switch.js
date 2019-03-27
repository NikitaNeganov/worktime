import React from "react";
import classes from "./Switch.module.css";

const switchToggle = props => {
  return (
    <div className={classes.Container}>
      <label className={classes.Switch}>
        <input onChange={props.onToggle} type="checkbox" />
        <span className={classes.Slider} />
      </label>
    </div>
  );
};

export default switchToggle;

import React from "react";
import classes from "./Layout.module.css";

import Navigation from "../../components/Navigation/Navigation";

const layout = props => (
  <div className={classes.Layout} style={{ backgroundColor: "#f4f4f4" }}>
    <Navigation
      cookie={props.cookie}
      onPlay={props.onPlay}
      onPause={props.onPause}
      onStop={props.onStop}
      play={props.play}
      pause={props.pause}
    />
    {props.children}
  </div>
);

export default layout;

import React, { Component } from "react";
import classes from "./Layout.module.css";

import Navigation from "../../components/Navigation/Navigation";

const layout = props => (
  <div className={classes.Layout} style={{ backgroundColor: "#f4f4f4" }}>
    <Navigation cookie={props.cookie} />
    {props.children}
  </div>
);

export default layout;

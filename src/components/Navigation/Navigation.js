import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";

const navigation = props => {
  return (
    <div className={classes.Nav}>
      <NavLink
        exact
        activeClassName={classes.LinkActive}
        className={classes.NavLink}
        to="/home"
      >
        Home
      </NavLink>
      {props.cookie && (
        <NavLink
          activeClassName={classes.LinkActive}
          className={classes.NavLink}
          to="/time"
        >
          Time
        </NavLink>
      )}
    </div>
  );
};

export default navigation;

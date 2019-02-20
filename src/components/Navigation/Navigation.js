import React from "react";
import playImg from "../../assets/icons/play-button.png";
import pauseImg from "../../assets/icons/pause.png";
import stopImg from "../../assets/icons/stop.png";
import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";

const navigation = props => {
  const playing = props.play ? { backgroundColor: "#97c482" } : {};
  const paused = props.pause ? { backgroundColor: "#97c482" } : {};
  return (
    <div className={classes.Container}>
      <div className={classes.MusicContainer}>
        <div className={classes.Music}>
          <img
            onClick={props.onPlay}
            style={playing}
            src={playImg}
            alt="play"
            className={classes.Button}
          />
          <img
            onClick={props.onPause}
            style={paused}
            src={pauseImg}
            alt="pause"
            className={classes.Button}
          />
          <img
            onClick={props.onStop}
            src={stopImg}
            alt="stop"
            className={classes.Button}
          />
        </div>
      </div>
      <div className={classes.NavContainer}>
        <div className={classes.Nav}>
          <NavLink
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
      </div>
      <div className={classes.Empty} />
    </div>
  );
};

export default navigation;

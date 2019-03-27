import React from "react";

import classes from "./HangmanPic.module.css";
import { images } from "../../../assets/hangman";

const hangmanPic = props => {
  const imgSrc = images[props.mistakes];
  return <img className={classes.Pic} src={imgSrc} alt="hangman" />;
};

export default hangmanPic;

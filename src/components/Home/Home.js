import React, { Component } from "react";
import classes from "./Home.module.css";

class Home extends Component {
  render() {
    const cookieStart = this.props.readCookie("startHour");
    const cookieTotal = this.props.readCookie("hoursTotal");
    if (cookieStart && cookieTotal) {
      //this.props.handleCookies(cookieStart, cookieTotal);
      //this.props.history.push('/time');
    }
    let intro = (
      <div style={{ width: "100%" }}>
        <p>please, enter your name</p>
        <form onSubmit={this.props.onEnterName}>
          <input
            className={classes.Input}
            onChange={this.props.nameChangedHandler}
            type="text"
            value={this.props.name ? this.props.name : ""}
            placeholder="Michael G. Scott"
          />
        </form>
      </div>
    );
    const name = this.props.readCookie("Name");
    if (name) {
      const btn = name === "Stranger" ? "Enter your name" : "Change name";
      intro = (
        <div className={classes.Intro}>
          <div />
          <h3>Hello, {name}!</h3>
          <button
            className={classes.ButtonName}
            onClick={this.props.onClearName}
          >
            {btn}
          </button>
        </div>
      );
    }
    const startHour = this.props.startHour === 0 ? "" : this.props.startHour;
    const workingHours =
      this.props.workingHours === 0 ? "" : this.props.workingHours;
    return (
      <div className={classes.Home}>
        {intro}
        <form onSubmit={this.props.handleButton}>
          <p>please, enter the hour your job starts</p>
          <input
            className={classes.Input}
            type="number"
            lang="en-150"
            pattern="[0-9]*"
            onChange={e => this.props.onEnterHours(e.target.value)}
            value={startHour}
          />
          <p>
            please, enter the length of your workday (in case you work more/less
            than 8 hours)
          </p>
          <input
            className={classes.Input}
            type="number"
            lang="en-150"
            pattern="[0-9]*"
            onChange={e => this.props.onEnterLength(e.target.value)}
            value={workingHours}
          />
          <div className={classes.ButtonContainer}>
            <button className={classes.Button}>Done!</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Home;

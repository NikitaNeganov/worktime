import React, { Component } from "react";
import Plot from "react-plotly.js";
import classes from "./Time.module.css";
import music from "../../assets/closing time.mp3";

class Time extends Component {
  state = {
    play: false,
    pause: null
  };
  audio = new Audio(music);
  erase = () => {
    this.props.eraseCookie("startHour");
    this.props.eraseCookie("startMinute");
    this.props.eraseCookie("lengthHour");
    this.props.eraseCookie("lengthMinute");
    this.props.eraseCookie("lunchValue");
    this.pause();
    this.props.history.push("/home");
  };

  onClearNameInner = () => {
    this.erase();
    this.props.onClearName();
    this.props.history.push("/home");
  };
  play = () => {
    if (this.audio === null) {
      this.audio = new Audio(music);
    }
    this.setState({ play: true, pause: false });
    this.audio.play();
  };
  stop = () => {
    if (this.audio) {
      this.audio.pause();
    }
    this.setState({ play: false, pause: false });
    this.audio = null;
  };
  pause = () => {
    if (this.audio) {
      this.setState({ play: false, pause: true });
      this.audio.pause();
    }
  };
  update = () => {
    this.props.getDate();
    this.props.calculate();
    this.forceUpdate();
  };
  componentDidMount() {
    const lengthHour = parseInt(this.props.readCookie("lengthHour"));
    const lengthMinute = parseInt(this.props.readCookie("lengthMinute"));
    const startHour = parseInt(this.props.readCookie("startHour"));
    const startMinute = parseInt(this.props.readCookie("startMinute"));
    const lunch = parseInt(this.props.readCookie("lunch"));
    this.props.handleCookies(
      lengthHour,
      lengthMinute,
      startHour,
      startMinute,
      lunch
    );
    this.interval = setInterval(() => this.update(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const margin =
      document.body.clientHeight < 700
        ? {
            b: 0,
            l: 0,
            r: 0,
            t: 80,
            pad: 0
          }
        : {
            b: 20,
            l: 40,
            r: 40,
            t: 120,
            pad: 40
          };
    const playing = this.state.play ? { backgroundColor: "#97c482" } : {};
    const paused = this.state.pause ? { backgroundColor: "#97c482" } : {};
    const buttons = (
      <div style={{ backgroundColor: "#f4f4f4" }}>
        <button style={playing} className={classes.Button} onClick={this.play}>
          Play
        </button>
        <button style={paused} className={classes.Button} onClick={this.pause}>
          Pause
        </button>
        <button className={classes.Button} onClick={this.stop}>
          Stop
        </button>
      </div>
    );
    //#1 getting how much time done
    const currentTime = new Date().toLocaleString("ru-RU");
    const fullHours = (this.props.hoursDone - 0.5).toFixed(0);
    const minutes =
      this.props.hoursDone > 1
        ? ((this.props.hoursDone % fullHours) * 60 - 0.5).toFixed(0)
        : (this.props.hoursDone * 60 - 0.5).toFixed(0);
    const fullMinutes = minutes > 0 ? `${minutes.toString()} minutes` : "";
    const displayTime =
      this.props.hoursDone < 1
        ? `${fullMinutes}` //`${(this.props.hoursDone * 60).toFixed(0)} minutes`
        : `${fullHours} hours ${fullMinutes}`;
    const shareDone = this.props.secondsDone / (this.props.hoursTotal * 3600);
    const percentageDone = +(shareDone * 100).toFixed(2);
    //#1 finished
    //#2 getting intro
    let intro = null;
    const name = this.props.readCookie("Name");
    if (name) {
      const btn = name === "Stranger" ? "Enter your name" : "Change name";
      intro = (
        <div className={classes.Intro}>
          <p style={{ paddingTop: "10px", marginTop: "6px" }}>Hello, {name}!</p>
          <button className={classes.Button} onClick={this.onClearNameInner}>
            {btn}
          </button>
        </div>
      );
    }
    //#2 finished
    //#3 getting time left
    let hoursLeft = "";
    if (this.props.lengthMinute !== this.props.startMinute) {
      if (this.props.hoursTotal - fullHours > 1) {
        hoursLeft =
          (this.props.hoursTotal - fullHours - 0.5).toFixed(0) + " hours";
      }
    } else {
      hoursLeft =
        this.props.hoursTotal - this.props.hoursDone - 0.5 > 0
          ? (this.props.hoursTotal - this.props.hoursDone - 0.5).toFixed(0)
          : "";
      if (hoursLeft === "1") {
        hoursLeft += " hour";
      } else {
        hoursLeft += " hours";
      }
    }
    const minuteSubtractor =
      this.props.lengthMinute > 0 ? this.props.lengthMinute : 60;
    const minutesLeft =
      this.props.hoursDone - fullHours > 0
        ? `${minuteSubtractor - parseInt(fullMinutes)} minutes`
        : "";
    const displayLeft = `${hoursLeft} ${minutesLeft}`;
    //#3 finished
    const percColor =
      percentageDone > 50 ? { color: "green" } : { color: "lightcoral" };
    let working = (
      <div>
        <div className={classes.TimeCont}>
          <a name="intro" href="/">
            {" "}
          </a>
          <p className={classes.Par} style={{ marginTop: "18px" }}>
            You have spent at work {displayTime} out of{" "}
            {(this.props.hoursTotal - 0.5).toFixed(0)} hours
            {this.props.lengthMinute > 0
              ? ` ${this.props.lengthMinute} minutes`
              : ""}
            .
          </p>
          <p className={classes.Par} style={{ marginTop: "-1px" }}>
            That means <b>{displayLeft}</b> to go.
          </p>
          <p className={classes.Par}>
            This makes about <b style={percColor}>{percentageDone}%</b> of your
            day!{" "}
          </p>
          <p className={classes.Par} style={{ marginBottom: "0px" }}>
            Current time is: <b>{currentTime}</b>
          </p>
        </div>

        <div className={classes.PlotContainer}>
          <Plot
            className={classes.Plot}
            data={[
              {
                type: "pie",
                values: [percentageDone, 100 - percentageDone],
                labels: ["Work done", "Work left"],
                sort: false,
                marker: {
                  colors: ["#74e764", "#eb5f5f"]
                },
                responsive: true
              }
            ]}
            layout={{
              responsive: true,
              autosize: true,
              legend: {
                orientation: "h",
                xanchor: "center",
                x: 0.5
              },
              title: "Your left/done work for today",
              paper_bgcolor: "#f4f4f4",
              margin: margin
            }}
          />
        </div>
        {buttons}
        <div className={classes.CookieDiv}>
          <button className={classes.Button} onClick={this.erase}>
            Erase cookies
          </button>
          <p className={classes.CookieText}>
            Site has saved your preferences (start time and workday length) in
            cookies. In order to redirect to Home page and change your
            preferences click "Erase cookies".
          </p>
        </div>
      </div>
    );
    if (this.props.hoursDone > this.props.hoursTotal) {
      working = (
        <div>
          <h3>Your workday has already ended. Congratulations!</h3>
          <p>
            Current time is: <strong>{currentTime}</strong>
          </p>
          {buttons}
          <div className={classes.CookieDiv}>
            <button
              style={{ position: "fixed", bottom: "5px" }}
              className={classes.Button}
              onClick={this.erase}
            >
              Erase cookies
            </button>
            <p className={classes.CookieText}>
              Site has saved your preferences (start time and workday length) in
              cookies. In order to access Home page again and change your
              preferences click "Erase cookies".
            </p>
          </div>
        </div>
      );
    } else if (new Date().getHours() < this.props.startHour) {
      working = (
        <div>
          <h3>You haven't started yet, get off!</h3>
          <p>
            Current time is: <strong>{currentTime}</strong>
          </p>
          {buttons}
          <div className={classes.CookieDiv}>
            <button
              style={{ position: "fixed", bottom: "5px" }}
              className={classes.Button}
              onClick={this.erase}
            >
              Erase cookies
            </button>
            <p className={classes.CookieText}>
              Site has saved your preferences (start time and workday length) in
              cookies. In order to access Home page again and change your
              preferences click "Erase cookies".
            </p>
          </div>
        </div>
      );
    }

    return (
      <div style={{ height: "100vh" }}>
        {intro}
        {working}
      </div>
    );
  }
}

export default Time;

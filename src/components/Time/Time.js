import React, { Component } from "react";
import Plot from "react-plotly.js";
import classes from "./Time.module.css";
import music from "../../assets/closing time.mp3";
import { interpolateColors } from "../../utils/utils";

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
    const secondsTotal = this.props.hoursTotal * 60 * 60;
    const secondsTo = secondsTotal - this.props.secondsDone;
    if (
      (secondsTo >= 480 && secondsTo <= 600) ||
      this.props.hoursDone > this.props.hoursTotal
    ) {
      if (!this.state.play && !this.state.pause) {
        this.play();
      }
    }
  };
  componentDidMount() {
    const lengthHour = parseInt(this.props.readCookie("lengthHour"));
    const lengthMinute = parseInt(this.props.readCookie("lengthMinute"));
    const startHour = parseInt(this.props.readCookie("startHour"));
    const startMinute = parseInt(this.props.readCookie("startMinute"));
    const lunchValue = parseInt(this.props.readCookie("lunchValue"));
    this.props.handleCookies(
      lengthHour,
      lengthMinute,
      startHour,
      startMinute,
      lunchValue
    );
    this.interval = setInterval(() => this.update(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const color = this.props.display ? "#f4f4f4" : "#adb9c7";
    const fontColor = this.props.display ? "black" : "white";
    const arr1 = interpolateColors("255,0,0", "255,184,0", 25);
    const arr2 = interpolateColors("255,184,0", "255,141,0", 25);
    const arr3 = interpolateColors("255,141,0", "91,150,27", 25);
    const arr4 = interpolateColors("91,150,27", "4,163,11", 25);
    const colors = [...arr1, ...arr2, ...arr3, ...arr4];
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
      <div
        className={classes.Buttons} /*style={{ backgroundColor: "#f4f4f4" }}*/
      >
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
    const minuteRemainder = parseInt(minutes) === 1 ? "minute" : "minutes";
    const fullMinutes =
      parseInt(minutes) < 60 && parseInt(minutes) > 0
        ? `${minutes.toString()} ${minuteRemainder}`
        : parseInt(fullHours) > 0
        ? ""
        : "less than a minute";
    const hourRemainder = parseInt(fullHours) === 1 ? "hour" : "hours";
    let displayTime =
      this.props.hoursDone < 1
        ? `${fullMinutes}` //`${(this.props.hoursDone * 60).toFixed(0)} minutes`
        : `${fullHours} ${hourRemainder} ${fullMinutes}`;
    if (displayTime === "1 hour 60 minutes") {
      displayTime = "1 hour";
    }
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
    const timeLeft = this.props.hoursTotal - this.props.hoursDone;
    const remainder = timeLeft % 1;
    const caption =
      parseInt((timeLeft - remainder).toFixed(0)) >= 1 ? "hours" : "hour";
    let hoursLeft = "";
    if (timeLeft > 0.983) {
      hoursLeft =
        remainder > 0.983
          ? `${(timeLeft + 0.49).toFixed(0)} ${caption}`
          : `${timeLeft - remainder} ${caption}`;
    }
    const minutesLeftValue = (remainder * 60 + 0.5).toFixed(0);
    const minutesLeftCaption =
      parseInt(minutesLeftValue) === 1 ? "minute" : "minutes";
    const minutesLeft =
      remainder !== 0 && remainder < 0.983
        ? `${minutesLeftValue} ${minutesLeftCaption}`
        : "";
    const displayLeft =
      percentageDone < 99.99 ? `${hoursLeft} ${minutesLeft}` : "you are free";
    //#3 finished
    const approxPerc = parseInt((percentageDone - 0.49).toFixed(0));
    const percColor = `rgb(${colors[approxPerc]})`;
    const percColorDisplay = { color: percColor };
    let working = (
      <div>
        <div className={classes.TimeCont}>
          <p
            className={classes.Par + "" + classes.pTime}
            style={{ marginTop: "18px" }}
          >
            <a name="intro" href="/">
              {" "}
            </a>
            You have spent at work{" "}
            <b className={classes.Display}>{displayTime}</b> out of{" "}
            <br className={classes.br} />{" "}
            {this.props.hoursTotal > 1
              ? `${(this.props.hoursTotal - 0.5).toFixed(0)} hours`
              : ""}
            {this.props.lengthMinute > 0
              ? ` ${this.props.lengthMinute} minutes`
              : ""}
            .
          </p>
          <p
            className={classes.Par + "" + classes.pTime}
            style={{ marginTop: "-1px" }}
          >
            That means <b className={classes.Left}>{displayLeft}</b> to go.
          </p>
          <p className={classes.Par + "" + classes.pTime}>
            This makes about <b style={percColorDisplay}>{percentageDone}%</b>{" "}
            of your day!{" "}
          </p>
          <p
            className={classes.Par + "" + classes.pTime}
            style={{ marginBottom: "0px" }}
          >
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
              paper_bgcolor: color,
              margin: margin
            }}
          />
        </div>
        {buttons}
        <div className={classes.CookieDiv}>
          <button className={classes.Button} onClick={this.erase}>
            Erase cookies
          </button>
          <p className={classes.CookieText + " " + classes.pTime}>
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
          <p className={classes.pTime}>
            Current time is: <strong>{currentTime}</strong>
          </p>
          {buttons}
          <div className={classes.CookieDiv}>
            <button className={classes.ButtonErase} onClick={this.erase}>
              Erase cookies
            </button>
            <p className={classes.CookieText + "" + classes.pTime}>
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
          <p className={classes.pTime}>
            Current time is: <strong>{currentTime}</strong>
          </p>
          {buttons}
          <div className={classes.CookieDiv}>
            <button
              style={{ position: "relative", bottom: "5px" }}
              className={classes.Button}
              onClick={this.erase}
            >
              Erase cookies
            </button>
            <p className={classes.CookieText + " " + classes.pTime}>
              Site has saved your preferences (start time and workday length) in
              cookies. In order to access Home page again and change your
              preferences click "Erase cookies".
            </p>
          </div>
        </div>
      );
    }

    return (
      <div
        className={classes.TimeFull}
        style={{ color: fontColor, backgroundColor: color }}
      >
        {intro}
        {working}
      </div>
    );
  }
}

export default Time;

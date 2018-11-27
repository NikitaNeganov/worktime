import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";

import Home from "./components/Home/Home";
import Time from "./components/Time/Time";
import Test from "./components/Test/Test";
import Layout from "./hoc/Layout/Layout";

class App extends Component {
  state = {
    startHour: 9,
    starMinute: 0,
    workingHours: 8,
    workingMinutes: 0,
    hoursDone: 0,
    hoursTotal: 9,
    startDate: null,
    currentDate: null,
    name: null
  };
  createCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  };

  readCookie = name => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  eraseCookie = name => {
    this.createCookie(name, "", -1);
  };
  nameChangedHandler = e => {
    const name = e.target.value;
    this.setState({
      name
    });
  };
  onEnterHours = e => {
    this.setState({
      startHour: +e
    });
  };
  onEnterLength = e => {
    const workingHours = +e;
    const hoursTotal = workingHours + 1;
    this.setState({
      workingHours,
      hoursTotal
    });
  };
  onEnterName = e => {
    e.preventDefault();
    const value = this.state.name;
    this.createCookie("Name", value, 100);
    this.forceUpdate();
  };
  onClearName = () => {
    this.eraseCookie("Name");
    this.forceUpdate();
  };
  handleButton = () => {
    this.getDate();
    this.calculate();
    this.createCookie("startHour", this.state.startHour, 7);
    this.createCookie("hoursTotal", this.state.hoursTotal, 7);
    const name = this.state.name ? this.state.name : "Stranger";
    if (!this.readCookie("Name")) {
      this.createCookie("Name", name, 7);
    }
    this.props.history.push("/time#intro");
  };
  getDate = () => {
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      this.state.startHour,
      this.state.starMinute,
      0,
      0
    );
    const secondsDone = (currentDate - startDate) / 1000;
    const displayDate = currentDate.toString().slice(0, -39);
    this.setState({
      displayDate,
      currentDate,
      startDate,
      secondsDone
    });
  };
  calculate = () => {
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      this.state.startHour,
      this.state.starMinute,

      0,
      0
    );
    const secondsDone = (currentDate - startDate) / 1000;
    const hoursDone = +(secondsDone / 3600).toFixed(3);
    this.setState({
      secondsDone,
      hoursDone
    });
  };
  handleCookies = (startHour, hoursTotal) => {
    this.setState({
      startHour,
      hoursTotal
    });
  };
  componentDidMount() {
    this.getDate();
    this.calculate();
  }
  render() {
    //this.eraseCookie('Name')
    const myHome = props => {
      return (
        <Home
          handleCookies={this.handleCookies}
          handleButton={this.handleButton}
          onClearName={this.onClearName}
          readCookie={this.readCookie}
          nameChangedHandler={this.nameChangedHandler}
          onEnterName={this.onEnterName}
          onEnterHours={this.onEnterHours}
          onEnterLength={this.onEnterLength}
          {...this.state}
          {...props}
        />
      );
    };
    const myTime = props => {
      return (
        <Time
          readCookie={this.readCookie}
          eraseCookie={this.eraseCookie}
          onClearName={this.onClearName}
          onEnterHours={this.onEnterHours}
          onEnterLength={this.onEnterLength}
          getDate={this.getDate}
          calculate={this.calculate}
          {...this.state}
          {...props}
        />
      );
    };
    const myTest = props => {
      return (
        <Test
          readCookie={this.readCookie}
          eraseCookie={this.eraseCookie}
          onClearName={this.onClearName}
          onEnterHours={this.onEnterHours}
          onEnterLength={this.onEnterLength}
          getDate={this.getDate}
          calculate={this.calculate}
          {...this.state}
          {...props}
        />
      );
    };
    let redirect = () => <Redirect to="/time" />;
    if (!this.readCookie("startHour")) {
      redirect = () => <Redirect to="/home" />;
    }
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact render={redirect} />
            <Route path="/home" render={myHome} />
            <Route path="/time" render={myTime} />
            <Route path="/test" render={myTest} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);

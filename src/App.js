import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import axios from "axios";

import Home from "./components/Home/Home";
import Time from "./components/Time/Time";
import Test from "./components/Test/Test";
import Hangman from "./components/Hangman/Hangman";
import Layout from "./hoc/Layout/Layout";
import { quotes } from "./assets/quotes";
import { quotes as quotesTBBT } from "./assets/quotesTBBT";

let index = 0;
const officeNames = [
  "jim halpert",
  "james halpert",
  "jimothy",
  "halpert",
  "pam",
  "beesley",
  "dwight",
  "schrute",
  "malone",
  "martinez",
  "michael scott"
];
const tbbtNames = [
  "leonard",
  "hofstadter",
  "sheldon",
  "cooper",
  "penny",
  "howard",
  "wolowitz",
  "raj",
  "koothrappali",
  "bernadette",
  "rostenkowski",
  "amy",
  "farrah",
  "fowler"
];
const michael = "michael g. scott";
class App extends Component {
  state = {
    startHour: 9,
    startMinute: 0,
    lengthHour: 8,
    lengthMinute: 0,
    hoursDone: 0,
    secondsDone: 0,
    lunchValue: 0,
    hoursTotal: 9,
    minutesTotal: 0,
    startDate: null,
    currentDate: null,
    name: null,
    lunch: false,
    joke: null,
    display: true,
    phrase: null,
    author: null,
    quote: null
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
  onClearName = () => {
    this.eraseCookie("Name");
    this.setState({
      name: null,
      phrase: null,
      author: null,
      quote: null
    });
    this.forceUpdate();
  };
  eraseCookie = name => {
    this.createCookie(name, "", -1);
  };
  nameChangedHandler = e => {
    const name = e.target.value;
    if (name.toLowerCase().includes("hangman")) {
      this.props.history.push("/hangman");
    }
    let check = false;
    for (let officeName of officeNames) {
      if (name.toLowerCase().includes(officeName)) {
        check = true;
      }
    }
    let checkTbbt = false;
    for (let tbbtName of tbbtNames) {
      if (name.toLowerCase().includes(tbbtName)) {
        checkTbbt = true;
      }
    }

    const phrase = check ? "You miss 100% of the shots you don't take" : null;
    const author = check ? ` ‒Michael Scott` : null;

    this.setQuote({ check, phrase, author, name, checkTbbt });

    this.setState({
      name
    });
  };
  setQuote = ({
    check,
    phrase = null,
    author = null,
    name = "Stranger",
    checkTbbt
  }) => {
    if (
      (name.toLowerCase().includes("want") &&
        name.toLowerCase().includes("easter") &&
        name.toLowerCase().includes("egg")) ||
      name.toLowerCase().includes("easter")
    ) {
      const uber = {
        ...quotes,
        ...quotes,
        ...quotes,
        ...quotesTBBT,
        ...quotes
      };
      const random = Math.floor(
        Math.random() * Object.keys(uber).length
      ).toString();
      const quote = uber[random];

      this.setState({ quote, author, phrase });
    } else if (check) {
      const random = Math.floor(
        Math.random() * Object.keys(quotes).length + 1
      ).toString();
      const quote =
        name.toLowerCase().includes(michael) ||
        name.toLowerCase().includes("michael scott")
          ? null
          : check
          ? random === `${Object.keys(quotes).length}`
            ? null
            : quotes[random]
          : null;

      this.setState({ quote, author, phrase });
    } else if (checkTbbt) {
      const random = Math.floor(
        Math.random() * Object.keys(quotesTBBT).length
      ).toString();
      const quote = checkTbbt
        ? random === `${Object.keys(quotesTBBT).length}`
          ? null
          : quotesTBBT[random]
        : null;

      this.setState({ quote, author, phrase });
    } else {
      const [quote, author, phrase] = [null, null, null];
      this.setState({ quote, author, phrase });
    }
  };
  onEnterName = e => {
    e.preventDefault();
    const value = this.state.name;
    this.createCookie("Name", value, 100);
    this.forceUpdate();
  };
  getDate = () => {
    const currentDate = new Date();
    const c = currentDate;
    const startDate = new Date(
      c.getFullYear(),
      c.getMonth(),
      c.getDate(),
      this.state.startHour,
      this.state.startMinute,
      0,
      0
    );
    this.setState({ currentDate, startDate });
  };
  handleCookies = (
    lengthHour = 8,
    lengthMinute = 0,
    startHour = 9,
    startMinute = 0,
    lunchValue = 1
  ) => {
    const lunch = lunchValue === 1 ? true : false;
    const hoursTotal = lengthHour + lunchValue + lengthMinute / 60;
    const minutesTotal = lengthMinute;
    this.setState({
      startMinute,
      startHour,
      lengthMinute,
      lengthHour,
      lunchValue,
      lunch,
      hoursTotal,
      minutesTotal
    });
  };
  createCookies = () => {
    this.createCookie("startHour", this.state.startHour, 7);
    this.createCookie("startMinute", this.state.startMinute, 7);
    this.createCookie("lengthHour", this.state.lengthHour, 7);
    this.createCookie("lengthMinute", this.state.lengthMinute, 7);
    this.createCookie("lunchValue", this.state.lunchValue, 7);
  };
  calculate = () => {
    const currentDate = new Date();
    const { startDate } = this.state;
    const secondsDone = (currentDate - startDate) / 1000;
    const hoursDone = +(secondsDone / 3600).toFixed(3);
    this.setState({ secondsDone, hoursDone });
  };
  handleButton = () => {
    this.getDate();
    this.calculate();
    const name = this.state.name ? this.state.name : "Stranger";
    if (!this.readCookie("Name")) {
      this.createCookie("Name", name, 7);
    }
    this.props.history.push("/time#intro");
  };

  handleSubmit = ({
    startHour,
    startMinute,
    lengthHour,
    lengthMinute,
    lunch
  }) => {
    startHour = isNaN(startHour) ? 0 : startHour;
    startMinute = isNaN(startMinute) ? 0 : startMinute;
    lengthHour = isNaN(lengthHour) ? 0 : lengthHour;
    lengthMinute = isNaN(lengthMinute) ? 0 : lengthMinute;
    const lunchValue = lunch ? 1 : 0;
    const hoursTotal = lengthHour + lunchValue + lengthMinute / 60;
    const minutesTotal = lengthMinute;
    this.setState(
      {
        startMinute,
        startHour,
        lengthMinute,
        lengthHour,
        lunch,
        lunchValue,
        hoursTotal,
        minutesTotal
      },
      () => {
        this.getDate();
        this.createCookies();
        this.calculate();
        const name = this.state.name ? this.state.name : "Stranger";
        if (!this.readCookie("Name")) {
          this.createCookie("Name", name, 7);
        }
        this.props.history.push("/time#intro");
      }
    );
  };

  easterEgg = e => {
    const code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    const key = parseInt(e.which || e.detail);
    if (key === code[index]) {
      index++;

      if (index === code.length) {
        this.setState(prevState => ({ display: !prevState.display }));
        index = 0;
      }
    } else {
      index = 0;
    }
  };
  componentDidMount() {
    let name;
    try {
      name = this.readCookie("Name");
      name.toLowerCase();
    } catch {
      name = "Incognito";
    }

    let check = false;
    for (let officeName of officeNames) {
      if (name.toLowerCase().includes(officeName)) {
        check = true;
      }
    }
    let checkTbbt = false;
    for (let tbbtName of tbbtNames) {
      if (name.toLowerCase().includes(tbbtName)) {
        checkTbbt = true;
      }
    }

    const phrase = check ? "You miss 100% of the shots you don't take" : null;
    const author = check ? ` ‒Michael Scott` : null;

    this.setQuote({ check, phrase, author, name, checkTbbt });
    axios({
      method: "get",
      url: "https://icanhazdadjoke.com/",
      headers: {
        Accept: "application/json"
      }
    }).then(res => {
      const joke = res.data.joke;
      this.setState({ joke });
    });
  }
  render() {
    const startHour = this.readCookie("startHour");
    const startMinute = this.readCookie("startMinute");
    const lengthHour = this.readCookie("lengthHour");
    const lengthMinute = this.readCookie("lengthMinute");
    const lunchValue = this.readCookie("lunchValue");
    const cookie =
      startHour && startMinute && lengthHour && lengthMinute && lunchValue;
    //this.eraseCookie('Name')
    const myHome = props => {
      return (
        <Home
          joke={this.state.joke}
          handleButton={this.handleButton}
          onClearName={this.onClearName}
          readCookie={this.readCookie}
          nameChangedHandler={this.nameChangedHandler}
          onEnterName={this.onEnterName}
          onEnterHours={this.onEnterHours}
          onEnterLength={this.onEnterLength}
          handleSubmit={this.handleSubmit}
          {...this.state}
          {...props}
        />
      );
    };
    const myTime = props => {
      return (
        <Time
          handleCookies={this.handleCookies}
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
    const myHangman = props => {
      return (
        <Hangman
          readCookie={this.readCookie}
          createCookie={this.createCookie}
          eraseCookie={this.eraseCookie}
        />
      );
    };

    let redirect = () => <Redirect to="/time" />;
    if (!this.readCookie("startHour")) {
      redirect = () => <Redirect to="/home#start" />;
    }
    return (
      <div onKeyDown={e => this.easterEgg(e)} tabIndex="0">
        <Layout cookie={cookie}>
          <Switch>
            <Route path="/home" render={myHome} />
            <Route path="/test" component={Test} />
            <Route path="/hangman" render={myHangman} />
            {cookie && <Route path="/time" render={myTime} />}
            <Route render={redirect} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);

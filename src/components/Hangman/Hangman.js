import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
//import axios from "axios";

import classes from "./Hangman.module.css";
import { en, ru } from "../../assets/alphabets";
import { array as hangmanWords } from "../../assets/hangman";
import Spinner from "../UI/Spinner/Spinner";
import LetterList from "./LetterList/LetterList";
import HangmanPic from "./HangmanPic/HangmanPic";

const spinner = (
  <div className={classes.SpinnerWrap}>
    <Spinner />
  </div>
);

class Hangman extends PureComponent {
  state = {
    playing: false,
    result: null,
    mistakes: null,
    maxmistakes: 12,
    word: null,
    message: null,
    guessed: [],
    tried: [],
    en,
    ru,
    viewStats: false
  };

  componentDidUpdate() {
    this.focusDiv();
  }

  componentWillUpdate() {
    if (this.state.result) {
    }
  }

  componentDidMount() {
    const winCookie = this.props.readCookie("wins");
    const loseCookie = this.props.readCookie("losses");
    const wins = winCookie || winCookie === 0 ? winCookie : 0;
    const losses = loseCookie || loseCookie === 0 ? loseCookie : 0;
    this.createScoreCookies(wins, losses);
  }

  createScoreCookies = (wins, losses) => {
    this.props.createCookie("wins", wins, 100);
    this.props.createCookie("losses", losses, 100);
  };

  focusDiv = () => {
    if (this.state.playing && !this.state.result && this.state.word) {
      ReactDOM.findDOMNode(this.refs.hangman).focus();
    }
    if (this.state.result) {
      ReactDOM.findDOMNode(this.refs.playbutton).focus();
    }
  };

  handleViewStats = () => {
    this.setState(prevState => {
      return {
        viewStats: !prevState.viewStats
      };
    });
  };

  handleClick = () => {
    this.setState({
      playing: true,
      mistakes: 0,
      result: null,
      message: null,
      en,
      guessed: [],
      tried: [],
      word: null
    });
    //this.forceUpdate();
    this.setState({ viewStats: false });
    this.getWord();
  };

  handleKeyDown = e => {
    const numKey = parseInt(e.which || e.detail);
    if (
      (numKey >= 65 && numKey <= 90) ||
      (numKey >= 97 && numKey <= 122) ||
      numKey === 32
    ) {
      const key = String.fromCharCode(e.keyCode || e.charCode).toLowerCase();
      this.handleLetterClick(key);
    } else if (numKey === 189) {
      this.handleLetterClick("-");
    }
  };

  handleLetterClick = e => {
    const letter = e;

    const en = this.state.en.map(el => {
      const temp = { ...el };
      if (letter === el.name || (letter === "" && el.name === " ")) {
        temp.state = true;
      }
      return temp;
    });
    this.setState({ en });
    const guessed = this.state.guessed;
    const indices = [];
    this.state.secret.forEach((el, i) => {
      if (letter === el) {
        indices.push([i, el]);
      }
    });
    if (indices.length > 0) {
      for (let index of indices) {
        guessed[index[0]] = index[1];
      }
    } else {
      if (!this.state.tried.includes(letter)) {
        this.setState(prevState => {
          return { mistakes: prevState.mistakes + 1 };
        });
      }
    }
    if (!this.state.tried.includes(letter)) {
      const tried = this.state.tried;
      tried.push(letter);
      this.setState({ tried });
    }
    this.setState({ guessed });
    const check =
      JSON.stringify(this.state.secret) === JSON.stringify(this.state.guessed);
    if (this.state.mistakes === this.state.maxmistakes || check) {
      let message = "";
      if (check) {
        message = "You win!";
        this.setState({ result: "win" });
      } else {
        message = "You lose!";
        this.setState({ result: "lose" });
      }
      this.setState({ message, playing: false, en }, () => {});
      let [wins, losses] = [
        parseInt(this.props.readCookie("wins")),
        parseInt(this.props.readCookie("losses"))
      ];
      if (check) {
        wins += 1;
      } else {
        losses += 1;
      }
      this.createScoreCookies(wins, losses);
    }
  };

  getWord = () => {
    //axios.post("../../assets/wordnik.py").then(res => console.log(res));
    const name = this.props.readCookie("Name")
      ? this.props.readCookie("Name")
      : "name";
    const nameCheck =
      name.toLowerCase().includes("ros") || name.toLowerCase().includes("рос");
    const word = nameCheck
      ? "ros-pidor"
      : hangmanWords[Math.floor(Math.random() * 500)].toLowerCase();
    setTimeout(() => {
      this.setState({
        word: word,
        secret: word.split(""),
        guessed: word.split("").map(el => "_")
      });
    }, 500);
  };

  render() {
    const winCookie = this.props.readCookie("wins");
    const loseCookie = this.props.readCookie("losses");
    if (this.state.playing && !this.state.result) {
      if (this.state.word) {
        return (
          <React.Fragment>
            <div
              className={classes.Container}
              onKeyDown={e => this.handleKeyDown(e)}
              ref="hangman"
              tabIndex="0"
            >
              <h1>{this.state.guessed.join(" ")}</h1>
              <HangmanPic mistakes={this.state.mistakes} />
              <LetterList
                msg={this.state.message}
                onClick={e => this.handleLetterClick(e.target.innerText)}
                en={this.state.en}
                ru={this.state.ru}
              />
            </div>
          </React.Fragment>
        );
      } else {
        return (
          <div className={classes.Container}>
            <div className={classes.SpinnerContainer}>{spinner}</div>
          </div>
        );
      }
    }
    return (
      <React.Fragment>
        <div className={classes.Container}>
          {this.state.message && (
            <React.Fragment>
              <h1>{this.state.secret.join(" ")}</h1>
              <h2>{this.state.message}</h2>
            </React.Fragment>
          )}
          <div className={classes.ButtonContainer}>
            <button
              className={classes.Button}
              type="submit"
              onClick={this.handleClick}
              ref="playbutton"
            >
              {this.state.result ? "Play again" : "Play"}
            </button>
            <button
              onClick={this.handleViewStats}
              className={classes.Button}
              type="submit"
            >
              View stats
            </button>
          </div>
          {this.state.viewStats && (
            <div className={classes.Stats}>
              This are your game statistics for last 100 days.
              <pre>
                You lost: {loseCookie} times. You won: {winCookie} times.
                {parseInt(winCookie) > parseInt(loseCookie) ? (
                  <p>Good game!</p>
                ) : parseInt(winCookie) === parseInt(loseCookie) ? (
                  <p>You should try better :)</p>
                ) : (
                  <p>You suck!</p>
                )}
              </pre>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Hangman;

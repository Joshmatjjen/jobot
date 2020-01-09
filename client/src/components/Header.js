import React, {Component, useState} from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import Logo from "../assets/logo.png";
import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.navEvent = React.createRef();
    this.toNewPage = this.toNewPage.bind(this);
    this.navBtn = this.navBtn.bind(this);
    this.state = {
      menuHeight: "0px",
      matches: window.matchMedia("(min-width: 48em)").matches,
    };
  }

  componentDidMount() {
    const handler = e => this.setState({matches: e.matches});
    window.matchMedia("(min-width: 48em)").addListener(handler);
  }
  toNewPage() {
    this.setState({menuHeight: "0px"});
  }
  navBtn() {
    if (this.state.menuHeight === "240px") {
      this.setState({
        menuHeight: "0px",
      });
    }
    if (this.state.menuHeight === "0px") {
      this.setState({menuHeight: "240px"});
    }
  }
  render() {
    return (
      <header className="header">
        <Link to={"/"} className="logo" onClick={this.toNewPage}>
          <img width="50px" height="50px" src={Logo} />
          <h1>JoBot</h1>
        </Link>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" onClick={this.navBtn} htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>
        {this.state.matches && (
          <ul className="menu" ref={this.navEvent} style={{maxHeight: "none"}}>
            <li onClick={this.toNewPage}>
              <Link to={"/shop"} className="page">
                Shop
              </Link>
            </li>

            <li onClick={this.toNewPage}>
              <Link to={"/about"} className="page">
                About Me
              </Link>
            </li>
            <li onClick={this.toNewPage}>
              <a
                target="_blank"
                href={"https://github.com/Joshmatjjen"}
                className="version"
              >
                v1.0
              </a>
            </li>
            {/* <li>
          <Link to={'/'} className="page hire-me">
            Hire Me
          </Link>
        </li> */}
          </ul>
        )}
        {!this.state.matches && (
          <ul
            className="menu"
            ref={this.navEvent}
            style={{maxHeight: this.state.menuHeight}}
          >
            <li onClick={this.toNewPage}>
              <Link to={"/shop"} className="page">
                Shop
              </Link>
            </li>

            <li onClick={this.toNewPage}>
              <Link to={"/about"} className="page">
                About Me
              </Link>
            </li>
            <li onClick={this.toNewPage}>
              <a
                target="_blank"
                href={"https://github.com/Joshmatjjen"}
                className="version"
              >
                v1.0
              </a>
            </li>
            {/* <li>
          <Link to={'/'} className="page hire-me">
            Hire Me
          </Link>
        </li> */}
          </ul>
        )}
      </header>
    );
  }
}

export default Header;

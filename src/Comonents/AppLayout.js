import React, { Component } from "react";
import AppBar from "./AppBar";
import Routes from '../routes'

export default class AppLayout extends Component {
  render() {
    return (
      <>
        <AppBar />
        <main>
          <Routes />
        </main>
      </>
    );
  }
}

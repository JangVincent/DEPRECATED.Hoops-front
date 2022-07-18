import "./App.css";
import React from "react";

/* Components */
import Navbar from "./nav/nav";

import Introduction from "./main/Introduction";
import Routains from "./main/Routains";
import Atoms from "./main/Atoms";

import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";

/* Libraries */
import { Routes, Route, Link } from "react-router-dom";

class App extends React.Component {
  state = {};

  removeCharacter = (index) => {
    const { characters } = this.state;
    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index;
      }),
    });
  };

  handleSubmit = (character) => {
    this.setState({ characters: [...this.state.characters, character] });
  };

  async componentDidMount() {
    const url =
      "https://en.wikipedia.org/w/api.php?action=opensearch&search=Seona+Dancing&format=json&origin=*";

    await fetch(url)
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          data: result.map((v, i) => <li key={i}>{v.toString() + "\n"}</li>),
        });
      });
  }

  render() {
    const data = this.state.data;
    return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Introduction />}></Route>
          <Route path="/routains" element={<Routains />}></Route>
          <Route path="/atoms" element={<Atoms />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </div>
    );
  }
}

export default App;

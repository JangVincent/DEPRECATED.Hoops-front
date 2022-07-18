import logo from "./logo.svg";
import "./App.css";
import React from "react";

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
        console.log(result);
        this.setState({
          data: result.map((v, i) => <li key={i}>{v.toString() + "\n"}</li>),
        });
      });
  }

  render() {
    const data = this.state.data;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload. React will be
            automatically compiles.
          </p>

          <ul>{data}</ul>
        </header>
      </div>
    );
  }
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import Table from "./Table";
import React from "react";
import Form from "./Form";

class App extends React.Component {
  state = {
    characters: [
      {
        name: "Charlie",
        job: "Janitor",
      },
      {
        name: "Mac",
        job: "Bouncer",
      },
      {
        name: "Dee",
        job: "Aspring actress",
      },
      {
        name: "Dennis",
        job: "Bartender",
      },
    ],
  };

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
          data: result,
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
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        <Table
          characterData={this.state.characters}
          removeCharacter={this.removeCharacter}
        />

        <Form handleSubmit={this.handleSubmit} />

        <ul>{data}</ul>
      </div>
    );
  }
}

export default App;

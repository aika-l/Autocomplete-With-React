import React from "react";
import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      countries: []
    };
  }

  onInput = (e) => {
    this.setState({ input: e.target.value }, () => {
      this.getCountries();
    });
  };

  getCountries = async (e) => {
    const { input, countries } = this.state;
    const searchCountry = this.state.input;
    // e.preventDefault();
    const apiCall = await fetch(
      `https://restcountries.eu/rest/v2/name/${searchCountry}`
    );
    const data = await apiCall.json();
    // console.log(data)

    if (input) {
      const names = data.reduce((acc, st) => {
        if (
          st.name.substring(0, input.length).toLowerCase() ===
          input.toLowerCase()
        ) {
          acc.push(st.name);
        }
        return acc;
      }, []);
      this.setState({ countries: names });
    } else {
      this.setState({ countries: [] });
    }
  };

  select = (item) => {
    this.setState({ input: item, countries: [] });
  };

  render() {
    const { input, countries } = this.state;
    const country = countries.map((item) => {
      return (
        <li
          className="list"
          onClick={() => {
            this.select(item);
          }}
        >
          {item}
        </li>
      );
    });
    return (
      <div className="container">
        <p>Search:</p>
        <input value={input} onChange={this.onInput} />
        <ul>{country}</ul>
      </div>
    );
  }
}
export default App;

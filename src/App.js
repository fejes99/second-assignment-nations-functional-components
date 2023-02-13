import React, { Component } from 'react';
import './App.css';
import Nations from './Nations/Nations';
import axios from 'axios';

class App extends Component {
  state = {
    nations: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get(
        'https://raw.githubusercontent.com/iamspruce/search-filter-painate-reactjs/main/data/countries.json'
      )
      .then((res) => {
        this.setState({
          nations: res.data,
          loading: false,
        });
      });
  }

  searchHandler = (event) => {
    const searchQuery = event.target.value;

    const filteredNations = Object.values(this.state.nations).filter((nation) =>
      nation.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    this.setState({ filteredNations: filteredNations });
  };

  render() {
    return (
      <div className='App'>
        <header className='header'>
          <input
            type='text'
            placeholder='Search for...'
            onChange={(event) => this.searchHandler(event)}
          />
          <div>Hello World</div>
        </header>
        <Nations
          nations={this.state.filteredNations || this.state.nations}
          loader={this.state.loader}
        />
      </div>
    );
  }
}

export default App;

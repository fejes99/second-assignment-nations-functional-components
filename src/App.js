import React, { Component } from 'react';
import './App.css';
import Nations from './Nations/Nations';
import axios from 'axios';

class App extends Component {
  state = {
    nations: [],
    filteredNations: [],
    loading: true,
    regions: [],
    selectedRegion: 'All regions',
    searchQuery: '',
  };

  componentDidMount() {
    axios
      .get(
        'https://raw.githubusercontent.com/iamspruce/search-filter-painate-reactjs/main/data/countries.json'
      )
      .then((res) => {
        this.setState({
          nations: Object.values(res.data),
          filteredNations: Object.values(res.data),
          loading: false,
          regions: [
            ...new Set(Object.values(res.data).map((nation) => nation.region)),
          ],
        });
      });
  }

  searchHandler = (event) => {
    const searchQuery = event.target.value;

    this.setState({
      filteredNations: [...this.state.nations].filter((nation) =>
        nation.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
      searchQuery: searchQuery,
    });
  };

  regionSelectHandler = (event) => {
    const region = event.target.value;

    if (region === 'All regions') {
      this.setState({
        filteredNations: [...this.state.nations],
        selectedRegion: region,
        searchQuery: '',
      });
    } else {
      this.setState({
        filteredNations: [...this.state.nations].filter(
          (nation) => nation.region === region
        ),
        selectedRegion: region,
        searchQuery: '',
      });
    }
  };

  render() {
    return (
      <div className='App'>
        <header>
          <input
            value={this.state.searchQuery}
            type='text'
            placeholder='Search for...'
            onChange={(event) => this.searchHandler(event)}
          />
          <select
            value={this.state.selectedRegion}
            onChange={this.regionSelectHandler}
          >
            <option value='All regions'>All regions</option>
            {this.state.regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </header>
        {this.state.searchQuery !== '' &&
        this.state.filteredNations.length === 0 ? (
          <div className='info'>Country doesn't exist, try another one</div>
        ) : (
          <Nations
            nations={this.state.filteredNations || this.state.nations}
            loader={this.state.loader}
          />
        )}
      </div>
    );
  }
}

export default App;

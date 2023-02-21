import React, { Component } from 'react';
import './App.css';
import Nations from './Nations/Nations';
import axios from 'axios';
import { searchFilter } from './helper';

class App extends Component {
  state = {
    nations: [],
    loading: true,
    regions: [],
    selectedRegion: '',
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
          loading: false,
          regions: [...new Set(Object.values(res.data).map((nation) => nation.region))],
        });
      });
  }

  searchHandler = (event) => {
    this.setState(
      {
        searchQuery: event.target.value,
      },
      () => searchFilter(this.state.selectedRegion, this.state.nations, this.state.searchQuery)
    );
  };

  optionHandler = (event) => {
    this.setState(
      {
        selectedRegion: event.target.value,
      },
      () => searchFilter(this.state.selectedRegion, this.state.nations, this.state.searchQuery)
    );
  };

  render() {
    const { loading, regions, selectedRegion, searchQuery } = this.state;
    const nations = searchFilter(selectedRegion, this.state.nations, searchQuery);

    return (
      <div className='App'>
        <header>
          <input
            value={searchQuery}
            type='text'
            placeholder='Search for...'
            onChange={(event) => this.searchHandler(event)}
          />
          <select value={selectedRegion} onChange={(event) => this.optionHandler(event)}>
            <option value=''>All regions</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </header>
        {searchQuery !== '' && nations.length === 0 ? (
          <div className='info'>Country doesn't exist, try another one</div>
        ) : (
          <Nations nations={nations} loading={loading} />
        )}
      </div>
    );
  }
}

export default App;

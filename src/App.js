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
          regions: [
            ...new Set(Object.values(res.data).map((nation) => nation.region)),
          ],
        });
      });
  }

  searchHandler = (event) => {
    const searchQuery = event.target.value;
    this.setState({
      searchQuery: searchQuery,
    });

    return searchFilter(this.state);
  };

  optionHandler = (event) => {
    let selectedRegion = '';
    if (event.target.value !== '') {
      selectedRegion = event.target.value;
    }

    this.setState({
      selectedRegion: selectedRegion,
    });

    return searchFilter(this.state);
  };

  render() {
    const { loading, regions, selectedRegion, searchQuery } = this.state;
    const nations = searchFilter(this.state);

    return (
      <div className='App'>
        <header>
          <input
            value={searchQuery}
            type='text'
            placeholder='Search for...'
            onChange={(event) => this.searchHandler(event)}
          />
          <select
            value={selectedRegion}
            onChange={(event) => this.optionHandler(event)}
          >
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

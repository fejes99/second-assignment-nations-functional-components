import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Nations from './Nations/Nations';
import { searchFilter } from './helper';

const App = () => {
  const [nations, setNations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://raw.githubusercontent.com/iamspruce/search-filter-painate-reactjs/main/data/countries.json'
      )
      .then((res) => {
        setNations(Object.values(res.data));
        setLoading(false);
        setRegions([...new Set(Object.values(res.data).map((nation) => nation.region))]);
      });
  }, []);

  const searchHandler = (query) => {
    setQuery(query);
  };

  const optionHandler = (region) => {
    setSelectedRegion(region);
  };

  const filteredNations = () => {
    const filter = searchFilter(selectedRegion, nations, query);
    return query !== '' && filter.length === 0 ? (
      <div className='info'>Country doesn't exist, try another one</div>
    ) : (
      <Nations nations={filter} loading={loading} />
    );
  };

  return (
    <div className='App'>
      <header>
        <input
          value={query}
          type='text'
          placeholder='Search for...'
          onChange={(event) => searchHandler(event.target.value)}
        />
        <select value={selectedRegion} onChange={(event) => optionHandler(event.target.value)}>
          <option value=''>All regions</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </header>
      {filteredNations()}
    </div>
  );
};

export default App;

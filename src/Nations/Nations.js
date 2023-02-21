import React, { Component } from 'react';
import { ScaleLoader } from 'react-spinners';
import './Nations.css';

class Nations extends Component {
  render() {
    const { loading, nations } = this.props;
    const nationsContent = loading ? (
      <ScaleLoader color='#36d7b7' />
    ) : (
      nations.map((nation) => (
        <div key={nation.name} className='card'>
          <img src={nation.flag.large} alt='flag' className='card-img' />
          <div className='card-header'>{nation.name}</div>
          <div className='card-content'>
            Population:{' '}
            <span className='text-grey'>{nation.population.toLocaleString('fi-FI')}</span>
          </div>
          <div className='card-content'>
            Region: <span className='text-grey'>{nation.region}</span>
          </div>
          <div className='card-content'>
            Capital: <span className='text-grey'>{nation.capital}</span>
          </div>
        </div>
      ))
    );

    return <div className='cards'>{nationsContent}</div>;
  }
}

export default Nations;

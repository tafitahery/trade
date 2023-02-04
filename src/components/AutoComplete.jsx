import React, { useEffect, useState } from 'react';
import finnhub from '../api/finnhub';

export default function AutoComplete() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const renderDropdonw = () => {
    const dropdownClass = search ? 'show' : null;
    return (
      <ul
        className={`dropdown-menu ${dropdownClass}`}
        style={{
          height: '500px',
          overflowY: 'scroll',
          overflowX: 'hidden',
          cursor: 'pointer',
        }}
      >
        {results.map((result) => (
          <li key={result.symbol} className="dropdown-item">
            {result.description} ({result.symbol})
          </li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    let isMounted = true;
    const fechData = async () => {
      try {
        const response = await finnhub.get('/search', {
          params: {
            q: search,
          },
        });
        if (isMounted) {
          setResults(response.data.result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (search.length > 0) {
      fechData();
    } else {
      setResults([]);
    }
    return () => (isMounted = false);
  }, [search]);

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          style={{ background: 'rgba(145, 158, 171, 0.04)' }}
          id="search"
          type="text"
          className="form-control"
          placeholder="search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label htmlFor="search">Search</label>
        {renderDropdonw()}
      </div>
    </div>
  );
}

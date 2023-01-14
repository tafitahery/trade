import React, { useEffect, useState } from 'react';
import finnhub from '../api/finnhub';

export default function StockList() {
  const [stock, setStock] = useState([]);
  const [watchList, setWatchList] = useState(['GOOGL', 'MSFT', 'AMZN']);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      let responses = [];
      try {
        const response1 = await finnhub.get('/quote', {
          params: {
            symbol: 'GOOGLE',
          },
        });
        responses.push(response1);
        const response2 = await finnhub.get('/quote', {
          params: {
            symbol: 'MSFT',
          },
        });
        responses.push(response2);
        const response3 = await finnhub.get('/quote', {
          params: {
            symbol: 'AMZN',
          },
        });
        responses.push(response3);
        if (isMounted) {
          console.log(responses);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => (isMounted = false);
  }, [watchList]);

  return <div>StockList</div>;
}

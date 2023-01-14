import React, { useEffect, useState } from 'react';
import finnhub from '../api/finnhub';

export default function StockList() {
  const [stock, setStock] = useState([]);
  const [watchList, setWatchList] = useState(['GOOGL', 'MSFT', 'AMZN']);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          watchList.map((stock) =>
            finnhub.get('/quote', {
              params: {
                symbol: stock,
              },
            })
          )
        );
        const data = responses.map((response) => {
          return { data: response.data, symbol: response.config.params.symbol };
        });
        if (isMounted) {
          setStock(data);
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

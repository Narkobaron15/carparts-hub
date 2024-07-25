'use client'
import { useState, useEffect } from 'react';
import http_common from '@/lib/requests';
import { Detail } from '@/models/detail';
import CatalogCore from '../layout/catalog-core';

const Catalog = () => {
  const [parts, setParts] = useState<Detail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const response = await http_common.get('/detail');
        setParts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch car parts. Please try again later.');
        setLoading(false);
      }
    };

    fetchParts();
  }, []);

  if (loading) return <div className='loading'>Loading...</div>;
  if (error) return <div className='error'>{error}</div>;

  return (
    <div className="container">
      <CatalogCore catalogName={'Car Parts'} parts={parts} />
    </div>
  );
};

export default Catalog;

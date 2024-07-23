'use client'
import { useState, useEffect } from 'react';
import styles from './catalog.module.css';
import http_common from '@/lib/http_common';
import Detail from '@/models/part';

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

  if (!parts.length) return (
    <div className="container">
        <h1 className={styles.title}>No details found</h1>
    </div>
  )

  return (
    <div className='container'>
      <h1 className={styles.title}>Car Parts Catalog</h1>
      <div className={styles['catalog-grid']}>
        {parts.map((part) => (
          <div key={part.id} className={styles.card}>
            <h2 className={styles.partName}>{part.name}</h2>
            <p className={styles.manufacturer}>Manufacturer: {part.manufacturer?.name ?? 'N/A'}</p>
            <p className={styles.seller}>Seller: {part.seller?.name ?? 'N/A'}</p>
            <p className={styles.notes}>{part.notes}</p>
            <p className={styles.date}>Added: {new Date(part.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;

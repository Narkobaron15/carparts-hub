'use client'

import { useState, useEffect } from 'react';
import styles from './cars.module.css';
import http_common from '@/lib/requests';
import Link from 'next/link';
import { Car } from '@/models/car';

const ITEMS_PER_PAGE = 9;

const CarsPage = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await http_common.get('/cars');
                setCars(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch cars. Please try again later.');
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    if (loading) return <div className='loading'>Loading...</div>;
    if (error) return <div className='error'>{error}</div>;

    if (!cars.length) return (
        <div className="container">
            <h1 className={styles.title}>No cars found</h1>
        </div>
    );

    return (
        <div className='container'>
            <h1 className='title'>Cars Catalog</h1>
            <div className={styles['cars-grid']}>
                {cars.map((car) => (
                    <div key={car.id} className={styles.card}>
                        <h2 className={styles.carModel}>
                            <Link href={`/cars/${car.id}`}>{car.model}</Link>
                        </h2>
                        <p className={styles.year}>
                            Year: {car.year}
                        </p>
                        <p className={styles.manufacturer}>
                            Manufacturer: {car.manufacturer?.name ?? 'N/A'}
                        </p>
                        <p className={styles.date}>
                            Added: {new Date(car.created_at).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarsPage;

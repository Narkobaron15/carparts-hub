'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './sellers.module.css';
import Seller from '@/models/seller';
import http_common from '@/lib/http_common';

const ITEMS_PER_PAGE = 9;

const SellersPage = () => {
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);
    const [skip, setSkip] = useState(-ITEMS_PER_PAGE);
    const [hasMore, setHasMore] = useState(true);

    const fetchSellers = async () => {
        try {
            setSkip(skip + ITEMS_PER_PAGE);
            const response = await http_common.get('/sellers', {
                params: {
                    skip: skip + ITEMS_PER_PAGE,
                    take: ITEMS_PER_PAGE,
                },
            });
            setSellers(response.data);
            setHasMore(response.data.length >= ITEMS_PER_PAGE);
            setLoading(false);
        } catch (err) {
            setSkip(skip - ITEMS_PER_PAGE);
            setError('Failed to fetch sellers. Please try again later.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSellers().catch(console.error);
    }, []);


    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Car Part Sellers</h1>

            <div className={styles['seller-grid']}>
                {sellers.map((seller) => (
                    <div key={seller.user_id} className={styles.card}>
                        <h2 className={styles.sellerName}>{seller.name}</h2>
                        <p className={styles.sellerInfo}>{seller.description}</p>
                        <Link href={`/sellers/${seller.user_id}`} className={styles.viewMore}>
                            View Profile
                        </Link>
                    </div>
                ))}
            </div>

            {sellers.length === 0 && (
                <p className={styles.noResults}>No sellers found matching your search.</p>
            )}

            {hasMore && (
                <button
                    className={styles.viewMore}
                    onClick={fetchSellers}
                >
                    Load More
                </button>
            )}
        </div>
    );
};

export default SellersPage;

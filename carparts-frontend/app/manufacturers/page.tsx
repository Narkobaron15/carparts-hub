'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './manufacturers.module.css'
import { Manufacturer } from '@/models/manufacturer'
import http_common from '@/lib/requests'

const ITEMS_PER_PAGE = 9

const ManufacturersPage = () => {
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [skip, setSkip] = useState(-ITEMS_PER_PAGE)
    const [hasMore, setHasMore] = useState(true)

    const fetchManufacturers = async () => {
        try {
            setSkip(skip + ITEMS_PER_PAGE)
            const response = await http_common.get('/manufacturers', {
                params: {
                    skip: skip + ITEMS_PER_PAGE,
                    take: ITEMS_PER_PAGE,
                },
            })
            setManufacturers(response.data)
            setLoading(false)
            setHasMore(response.data.length >= ITEMS_PER_PAGE)
        } catch (err) {
            setSkip(skip - ITEMS_PER_PAGE)
            setError('Failed to fetch manufacturers. Please try again later.')
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchManufacturers().catch(console.error)
    }, [])

    if (loading) return <div className='loading'>Loading...</div>
    if (error) return <div className='error'>{error}</div>

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Car Part Manufacturers</h1>

            {manufacturers.length > 0 && (
                <div className={styles['manufacturers-grid']}>
                    {manufacturers.map((manufacturer) => (
                        <div key={manufacturer.id} className={styles.card}>
                            <h2 className={styles.manufacturerName}>{manufacturer.name}</h2>
                            <p className={styles.manufacturerInfo}>{manufacturer.description}</p>
                            <Link href={`/manufacturers/${manufacturer.id}`} className={styles.viewMore}>
                                View More
                            </Link>
                        </div>
                    ))}
                </div>
            )}

            {hasMore && (
                <button
                    className={styles.viewMore}
                    onClick={fetchManufacturers}
                >
                    Load More
                </button>
            )}

            {manufacturers.length === 0 && (
                <p className={styles.noResults}>No manufacturers found matching your search.</p>
            )}
        </div>
    )
}

export default ManufacturersPage

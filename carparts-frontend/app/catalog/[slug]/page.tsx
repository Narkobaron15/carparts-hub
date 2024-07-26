'use client'
import { useEffect, useState } from 'react'
import styles from './page.module.css'
import http_common from '@/lib/requests'
import { useAuth } from '@/lib/hooks'
import { Detail } from '@/models/detail'
import Link from 'next/link'

const SingleDetailsPage = (
    { params }: { params: { slug: string } }
) => {
    const { token } = useAuth()
    const [detail, setDetail] = useState<Detail | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [isInCart, setIsInCart] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const detailId = Number(params.slug)

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await http_common.get(`/details/${detailId}`, {
                    headers: { 'Authorization': token },
                })
                setDetail(response.data)
            } catch (error) {
                console.error('Error fetching detail:', error)
                setError('Failed to fetch detail. Please try again later.')
            }
        }

        const checkIfInCart = async () => {
            try {
                const response = await http_common.get(`/cart/${detailId}`, {
                    headers: { 'Authorization': token },
                })
                setIsInCart(!!response.data)
            } catch (error) {
                console.error('Error checking cart:', error)
                setError('Failed to check cart. Please try again later.')
            }
        }

        if (token) {
            fetchDetail()
            checkIfInCart()
        }
    }, [detailId, token])

    const handleAddToCart = async () => {
        try {
            await http_common.post('/cart', {
                detail_id: detailId,
                quantity: quantity
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            })
            setIsInCart(true)
        } catch (error) {
            console.error('Error adding to cart:', error)
            setError('Failed to add to cart. Please try again later.')
        }
    }

    const handleRemoveFromCart = async () => {
        try {
            await http_common.delete(`/cart/${detailId}`, {
                headers: { 'Authorization': token },
            })
            setIsInCart(false)
        } catch (error) {
            console.error('Error removing from cart:', error)
            setError('Failed to remove from cart. Please try again later.')
        }
    }

    if (!detail) {
        return <div className={styles.loading}>Loading...</div>
    }

    if (error) {
        return <div className={styles.error}>{error}</div>
    }

    return (
        <div className='container'>
            <h1 className='title'>{detail.name}</h1>
            <div className="max-w-3xl mx-auto">
            <p className={styles.description}>{detail.notes}</p>
            <p className={styles.info}>Specifications:</p>
            <p className={styles.info}>
                Manufacturer:&nbsp;
                <Link href={`/manufacturers/${detail.manufacturer.id}`}>
                    {detail.manufacturer.name}
                </Link>
            </p>
            <p className={styles.info}>
                Car:&nbsp;
                <Link href={`/cars/${detail.car.id}`}>
                    {detail.car.model} {detail.car.year}
                </Link>
            </p>
            <p className={styles.info}>
                Seller:&nbsp;
                <Link href={`/sellers/${detail.seller.id}`}>
                    {detail.seller.name}
                </Link>
            </p>

            <div className={styles.cartActions}>
                {!isInCart ? (
                    <>
                        <input
                            type='number'
                            min={1}
                            max={100} // TODO: Add max quantity
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className={styles.quantity} />
                        <button onClick={handleAddToCart} className='btn-primary'>
                            Add to Cart
                        </button>
                    </>
                ) : (
                    <button onClick={handleRemoveFromCart} className='btn-danger'>
                        Remove from Cart
                    </button>
                )}
            </div>
            </div>
        </div>
    )
}

export default SingleDetailsPage

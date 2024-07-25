'use client'
import http_common from '@/lib/requests'
import styles from './cart.module.css'
import { useRouter } from 'next/navigation'
import { useAuthOnly } from '@/lib/hooks'
import { useEffect, useState } from 'react'
import Cart from '@/models/cart'
import Link from 'next/link'

const CartPage = () => {
    const router = useRouter()
    const { token } = useAuthOnly()
    const [cartItems, setCartItems] = useState<Cart[]>([])
    const [error, setError] = useState<string | null>(null)

    const fetchCartItems = async () => {
        try {
            const response = await http_common.get('/cart', {
                headers: { 'Authorization': token },
            })
            setCartItems(response.data)
        } catch (error) {
            console.error('Error fetching cart items:', error)
            setError('Error fetching cart items')
        }
    }

    useEffect(() => {
        if (token) {
            fetchCartItems().catch(console.error)
        }
    }, [token])

    const updateQuantity = async (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) return

        try {
            await http_common.put(`/cart/${itemId}`, { quantity: newQuantity }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            })
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === itemId ? { ...item, quantity: newQuantity } : item
                )
            )
        } catch (error) {
            console.error('Error updating cart item quantity:', error)
            setError('Error updating cart item quantity')
        }
    }

    const removeItem = async (itemId: number) => {
        try {
            await http_common.delete(`/cart/${itemId}`, {
                headers: { 'Authorization': token },
            })
            setCartItems(prevItems => prevItems.filter(item => item.id !== itemId))
        } catch (error) {
            console.error('Error removing item from cart:', error)
            setError('Error removing item from cart')
        }
    }

    if (error) return <div className='error'>{error}</div>

    return (
        <div className='container'>
            <h1 className='title'>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className={styles.emptyCart}>Your cart is empty.</p>
            ) : (
                <ul className={styles.cartList}>
                    {cartItems.map(item => (
                        <li key={item.id} className={styles.cartItem}>
                            <div className={styles.itemInfo}>
                                <h2 className={styles.itemName}>
                                    <Link href={`/products/${item.detail.id}`}>
                                        {item.detail.name}
                                    </Link>
                                </h2>
                                <p className={styles.itemDescription}>{item.detail.notes}</p>
                            </div>
                            <div className={styles.quantityControls}>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                    className={styles.quantityButton}>
                                    -
                                </button>
                                <span className={styles.quantity}>{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    disabled={item.quantity >= 100}
                                    className={styles.quantityButton}>
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => removeItem(item.id)}
                                className='btn-danger ml-3'>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default CartPage

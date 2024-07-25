'use client'

import { Detail } from '@/models/detail'
import Link from 'next/link'
import styles from './catalog.module.css'
import { useAuth } from '@/lib/hooks'
import http_common from '@/lib/requests'
import { useRouter } from 'next/navigation'

interface CatalogCardProps {
    part: Detail
}

const CatalogCard = ({ part }: CatalogCardProps) => {
    const router = useRouter()
    const { role, token } = useAuth()

    const handleCart = async (id: number) => {
        if (role === 'Guest') {
            router.push('/login')
            return
        }
        const isInCart = await http_common.get(`/cart/${id}`, {
            headers: {
                Authorization: token,
            },
        })
        if (!isInCart.data) {
            await http_common.post('/cart', { detail_id: id }, {
                headers: {
                    Authorization: token,
                },
            })
        }
        router.push('/cart')
    }

    return (
        <div key={part.id} className={styles.card}>
            <h2 className={styles.partName}>
                <Link href={`/catalog/${part.id}`}>
                    {part.name}
                </Link>
            </h2>
            <p className={styles.manufacturer}>Manufacturer: {part.manufacturer?.name ?? 'N/A'}</p>
            <p className={styles.seller}>Seller: {part.seller?.name ?? 'N/A'}</p>
            <p className={styles.notes}>{part.notes}</p>
            <p className={styles.date}>Added: {new Date(part.created_at).toLocaleDateString()}</p>
            <button onClick={() => handleCart(part.id)} className='btn-primary mt-3'>
                Add to Cart
            </button>
        </div>
    )
}

export default CatalogCard

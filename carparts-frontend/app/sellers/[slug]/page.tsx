'use client'

import { useEffect, useState } from 'react'
import CatalogCore from '@/app/layout/catalog-core'
import { Detail } from '@/models/detail'
import { Seller } from '@/models/seller'
import http_common from '@/lib/requests'

const SingleDetailsPage = (
    { params }: { params: { slug: string } }
) => {
    const [seller, setSeller] = useState<Seller>()
    const [details, setDetails] = useState<Detail[]>([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const res = await http_common.get(`/manufacturers/${params.slug}`)
            const resDetails = await http_common.get(`/details/manufacturers/${params.slug}`)
            setSeller(res.data)
            setDetails(resDetails.data)
        } catch (error) {
            console.error('An error occurred while fetching the data', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData().catch(console.error)
    }, [params.slug])

    if (loading) return <div className='loading'>Loading...</div>
    if (!seller) return <div className='error'>Seller not found</div>

    return (
        <div className='container'>
            <h1 className='title'>{seller.name} page</h1>
            <p className='description'>{seller.description}</p>
            <div className='mt-8'>
                <CatalogCore
                    catalogName={seller.name}
                    parts={details} />
            </div>
        </div>
    )
}

export default SingleDetailsPage

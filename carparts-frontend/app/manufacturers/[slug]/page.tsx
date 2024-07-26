'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Manufacturer } from '@/models/manufacturer'
import http_common from '@/lib/requests'
import { Detail } from '@/models/detail'
import CatalogCore from '@/app/layout/catalog-core'

const SingleDetailsPage = (
    { params }: { params: { slug: string } }
) => {
    const [manufacturer, setManufacturer] = useState<Manufacturer>()
    const [details, setDetails] = useState<Detail[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async () => {
        try {
            const res = await http_common.get(`/manufacturers/${params.slug}`)
            const resDetails = await http_common.get(`/details/manufacturer/${params.slug}`)
            setManufacturer(res.data)
            setDetails(resDetails.data)
        } catch (error) {
            console.error('An error occurred while fetching the data', error)
            setError('An error occurred while fetching the data')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData().catch(console.error)
    }, [params.slug])

    if (loading) return <div className='loading'>Loading...</div>
    if (!manufacturer || error) return <div className='error'>{
        error ?? 'Manufacturer not found'
    }</div>

    return (
        <div className='container'>
            <h1 className='title'>{manufacturer.name} page</h1>
            <p className='description'>{manufacturer.description}</p>
            <div className='mt-8'>
                <CatalogCore
                    catalogName={manufacturer.name}
                    parts={details} />
            </div>
        </div>
    )
}

export default SingleDetailsPage

'use client'

import { useAuthOnly } from '@/lib/hooks'
import http_common from '@/lib/requests'
import { Manufacturer } from '@/models/manufacturer'
import Role from '@/models/roles'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const PanelPage = () => {
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const { token } = useAuthOnly(Role.Admin)
    const router = useRouter()

    useEffect(() => {
        const fetchManufacturers = async () => {
            try {
                const response = await http_common.get('/manufacturer', {
                    headers: {
                        Authorization: token,
                    },
                })
                setManufacturers(response.data)
                setLoading(false)
            } catch (err) {
                setError('Failed to fetch manufacturers')
                setLoading(false)
            }
        }

        fetchManufacturers()
    }, [token])

    const handleDelete = async (id: number) => {
        try {
            await http_common.delete(`/manufacturer/${id}`, {
                headers: {
                    Authorization: token,
                },
            })
            setManufacturers(
                manufacturers.filter(manufacturer => manufacturer.id !== id)
            )
        } catch (err) {
            setError('Failed to delete manufacturer')
        }
    }

    const handleEdit = (id: number) => router.push(`/manufacturers/update/${id}`)


    if (loading) return <div className='loading'>Loading...</div>
    if (error) return <div className='error'>{error}</div>

    return (
        <div className='container'>
            <h1 className='title'>Manufacturers Admin Panel</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map((manufacturer) => (
                        <tr key={manufacturer.id}>
                            <td>
                                <Link href={`/manufacturers/${manufacturer.id}`}>
                                    {manufacturer.id}
                                </Link>
                            </td>
                            <td>
                                <Link href={`/manufacturers/${manufacturer.id}`}>
                                    {manufacturer.name}
                                </Link>
                            </td>
                            <td className='wrap'>{manufacturer.description}</td>
                            <td>{new Date(manufacturer.created_at).toLocaleString()}</td>
                            <td>
                                <button
                                    onClick={() => handleEdit(manufacturer.id)}
                                    className='btn-primary mr-2'>
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(manufacturer.id)}
                                    className='btn-danger'>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-center my-7'>
                <Link href='/manufacturers/create' className='btn-success'>Add Manufacturer</Link>
            </div>
        </div>
    )
}

export default PanelPage

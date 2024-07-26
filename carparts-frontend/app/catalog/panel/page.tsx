'use client'

import React, { useState, useEffect } from 'react'
import http_common from '@/lib/requests'
import { useAuthOnly } from '@/lib/hooks'
import Role from '@/models/roles'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Detail } from '@/models/detail'

const PanelPage = () => {
  const [details, setDetails] = useState<Detail[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { token } = useAuthOnly(Role.Admin, Role.Seller)
  const router = useRouter()

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await http_common.get('/details/seller', {
          headers: {
            Authorization: token,
          },
        })
        setDetails(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch details')
        setLoading(false)
      }
    }

    fetchDetails()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await http_common.delete(`/details/${id}`)
      setDetails(details.filter(detail => detail.id !== id))
    } catch (err) {
      setError('Failed to delete detail')
    }
  }

  const handleEdit = (id: number) => router.push(`/catalog/update/${id}`)

  if (loading) return <div className='loading'>Loading...</div>
  if (error) return <div className='error'>{error}</div>

  return (
    <div className='container'>
      <h1 className='title'>Merchant Details Admin Panel</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Car</th>
            <th>Manufacturer</th>
            <th>Notes</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail) => (
            <tr key={detail.id}>
              <td>
                <Link href={`/catalog/${detail.id}`}>{detail.id}</Link>
              </td>
              <td>
                <Link href={`/catalog/${detail.id}`}>{detail.name}</Link>
              </td>
              <td>{detail.car_id}</td>
              <td>{detail.manufacturer.id}</td>
              <td>{detail.notes}</td>
              <td>{new Date(detail.created_at).toLocaleString()}</td>
              <td>
                <button
                  onClick={() => handleEdit(detail.id)}
                  className='btn-primary'>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(detail.id)}
                  className='btn-danger'>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex justify-center my-7'>
        <Link href='/catalog/create' className='btn-success'>Add Detail</Link>
      </div>
    </div>
  )
}

export default PanelPage

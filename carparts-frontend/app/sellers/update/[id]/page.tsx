'use client'

import { useAuthOnly } from '@/lib/hooks'
import http_common from '@/lib/requests'
import Role from '@/models/roles'
import { CreateUpdateSeller } from '@/models/seller'
import User from '@/models/user'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import SellersForm from '../../form'

const UpdatePage = ({ params }: { params: { id: string } }) => {
    const [initialValues, setInitialValues] = useState<CreateUpdateSeller>({
        name: '',
        description: '',
        user_id: 0,
    })

    const router = useRouter()
    const { token } = useAuthOnly(Role.Admin)

    const [users, setUsers] = useState<(User & { id: number })[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersResponse = await http_common.get('/users', {
                    headers: {
                        'Authorization': token,
                    },
                })
                const sellerResponse = await http_common.get(`/sellers/${params.id}`)
                setUsers(usersResponse.data.filter((user: User) =>
                    user.role === Role.Seller || user.role === Role.Admin
                ))
                setInitialValues(sellerResponse.data)

                if (!usersResponse.data || !sellerResponse.data) {
                    console.error('Failed to fetch users or seller')
                    router.push('/sellers/panel')
                    return
                }
            } catch (error) {
                console.error('Error fetching users:', error)
                setError('Error fetching users')
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [token])

    const handleSubmit = async (values: any) => {
        try {
            delete values.user
            await http_common.put(`/sellers/${params.id}`, values, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            })
            router.push('/sellers/panel')
        } catch (error) {
            console.error('Error creating seller:', error)
            setError('Error creating seller')
        }
    }

    if (loading) return <div className='loading'>Loading...</div>

    return (
        <div className='container'>
            <h1 className='title'>Update {initialValues.name}</h1>
            <SellersForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                isEditing={true}
                users={users}
            />
            {error && <div className='error mt-6 text-center'>{error}</div>}
        </div>
    )
}

export default UpdatePage

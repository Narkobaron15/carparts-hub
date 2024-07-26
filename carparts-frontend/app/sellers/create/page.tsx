'use client'

import { CreateUpdateSeller } from '@/models/seller'
import SellersForm from '../form'
import http_common from '@/lib/requests'
import { useRouter } from 'next/navigation'
import { useAuthOnly } from '@/lib/hooks'
import Role from '@/models/roles'
import User from '@/models/user'
import { useState, useEffect } from 'react'


const CreatePage = () => {
    const router = useRouter()
    const { token } = useAuthOnly(Role.Admin)

    const [users, setUsers] = useState<(User & { id: number })[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await http_common.get('/users', {
                    headers: {
                        'Authorization': token,
                    },
                })
                setUsers(response.data.filter((user: User) =>
                    user.role === Role.Seller || user.role === Role.Admin
                ))
            } catch (error) {
                console.error('Error fetching users:', error)
                setError('Error fetching users')
            }
        }

        fetchUsers()
    }, [token])

    const initialValues = {
        name: '',
        description: '',
        user_id: 0,
    }

    const handleSubmit = async (values: CreateUpdateSeller) => {
        try {
            await http_common.post('/sellers', values, {
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

    return (
        <div className='container'>
            <h1 className='title'>Create New Seller</h1>
            <SellersForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                isEditing={false}
                users={users}
            />
            {error && <div className='error mt-6 text-center'>{error}</div>}
        </div>
    )
}

export default CreatePage

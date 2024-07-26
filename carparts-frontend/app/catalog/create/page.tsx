'use client'
import http_common from '@/lib/requests'
import { useRouter } from 'next/navigation'
import styles from '../form.module.css'
import Form from '../form'
import { useAuthOnly } from '@/lib/hooks'
import Role from '@/models/roles'
import { CreateUpdateDetail } from '@/models/detail'
import { useState } from 'react'

const CreatePage = () => {
    const { token } = useAuthOnly(Role.Admin, Role.Seller)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const initialValues = {
        name: '',
        notes: '',
        car_id: '',
        manufacturer_id: '',
    }

    const handleSubmit = async (values: CreateUpdateDetail) => {
        values.car_id = Number(values.car_id)
        values.manufacturer_id = Number(values.manufacturer_id)
        try {
            await http_common.post('/details', values, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            })
            router.push('/catalog')
        } catch (error) {
            console.error('Error creating car part:', error)
            setError('Error creating car part')
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create New Car Part</h1>
            <Form
                initialValues={initialValues}
                handleSubmit={handleSubmit}
                isEditing={false} />
            {error && <div className='error mt-6 text-center'>{error}</div>}
        </div>
    )
}

export default CreatePage

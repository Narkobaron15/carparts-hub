'use client'
import { useRouter } from 'next/navigation'
import styles from '../form.module.css'
import http_common from '@/lib/requests'
import ManufacturerForm from '../form'
import { useAuthOnly } from '@/lib/hooks'
import Role from '@/models/roles'
import { CreateUpdateManufacturer } from '@/models/manufacturer'
import { useState } from 'react'

const CreatePage = () => {
    const router = useRouter()
    const { token } = useAuthOnly(Role.Admin)

    const initialValues = {
        name: '',
        description: '',
    }
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (values: CreateUpdateManufacturer) => {
        try {
            await http_common.post('/manufacturers', values, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            })
            router.push('/manufacturers/panel')
        } catch (error) {
            console.error('Error creating manufacturer:', error)
            setError('Error creating manufacturer')
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create New Manufacturer</h1>
            <ManufacturerForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                isEditing={false}
            />
            {error && <div className='error mt-6 text-center'>{error}</div>}
        </div>
    )
}

export default CreatePage

'use client'
import { useAuthOnly } from '@/lib/hooks'
import http_common from '@/lib/requests'
import Role from '@/models/roles'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import CarForm from '../form'
import styles from '../form.module.css'
import { CreateUpdateCar } from '@/models/car'

const CreatePage = () => {
    const router = useRouter()
    const { token } = useAuthOnly(Role.Admin)
    const [manufacturers, setManufacturers] = useState([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchManufacturers = async () => {
            try {
                const response = await http_common.get('/manufacturer')
                setManufacturers(response.data)
            } catch (error) {
                console.error('Error fetching manufacturers:', error)
                setError('Error fetching manufacturers')
            }
        }

        fetchManufacturers()
    }, [])

    const initialValues: CreateUpdateCar = {
        manufacturer_id: 0,
        model: '',
        year: new Date().getFullYear(),
    }

    const handleSubmit = async (values: CreateUpdateCar) => {
        try {
            await http_common.post('/cars', values, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            })
            router.push('/cars/panel')
        } catch (error) {
            console.error('Error creating car:', error)
            setError('Error creating car')
        }
    }

    if (error) return <div className='error'>{error}</div>

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create New Car</h1>
            <CarForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                isEditing={false}
                manufacturers={manufacturers}
            />
        </div>
    )
}

export default CreatePage

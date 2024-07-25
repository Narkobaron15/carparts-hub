'use client'
import { useAuthOnly } from '@/lib/hooks'
import styles from '../../form.module.css'
import Role from '@/models/roles'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CreateUpdateCar } from '@/models/car'
import http_common from '@/lib/requests'
import CarForm from '../../form'
import { Manufacturer } from '@/models/manufacturer'

const UpdatePage = ({ params }: { params: { id: string } }) => {
    const { token } = useAuthOnly(Role.Admin)
    const router = useRouter()

    const [car, setCar] = useState<CreateUpdateCar>()
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>()
    const [error, setError] = useState<string | null>(null)

    const fetchCar = async () => {
        try {
            const response = await http_common.get(`/cars/${params.id}`, {
                headers: {
                    Authorization: token,
                },
            })
            if (!response.data) {
                router.push('/cars/panel')
                return
            }

            setCar(response.data)

            const manufacturersResponse = await http_common.get('/manufacturer')
            if (!manufacturersResponse.data || !manufacturersResponse.data.length) {
                console.error('Manufacturers not found')
                router.push('/cars')
                return
            }

            setManufacturers(manufacturersResponse.data)
        } catch (err) {
            router.push('/cars')
        }
    }

    useEffect(() => {
        if (params.id) fetchCar().catch(console.error)
    }, [params.id])

    const handleSubmit = async (values: CreateUpdateCar) => {
        try {
            await http_common.put(`/cars/${params.id}`, values, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            })
            router.push('/cars/panel')
        } catch (err) {
            console.error('Error updating car:', err)
            setError('Error updating car')
        }
    }

    if (!car || !manufacturers) return <div className='loading'>Loading...</div>

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Update {car.model}</h1>
            <CarForm
                manufacturers={manufacturers}
                initialValues={car}
                onSubmit={handleSubmit}
                isEditing={true} />
            {error && <div className='error mt-6 text-center'>{error}</div>}
        </div>
    )
}

export default UpdatePage

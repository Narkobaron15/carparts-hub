'use client'
import { useAuthOnly } from '@/lib/hooks'
import http_common from '@/lib/requests'
import Role from '@/models/roles'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import styles from '../../form.module.css'
import Form from '../../form'
import { CreateUpdateDetail } from '@/models/detail'

const UpdatePage = ({ params }: { params: { id: string } }) => {
    const router = useRouter()
    const { token } = useAuthOnly(Role.Admin, Role.Seller)

    const id = Number(params.id)
    const [initialValues, setInitialValues] = useState<CreateUpdateDetail>()
    const [error, setError] = useState<string | null>(null)

    const fetchCarPart = async () => {
        try {
            const response = await http_common.get(`/details/${id}`)
            if (!response.data) {
                console.error('Car part not found')
                router.push('/catalog/panel')
                return
            }

            setInitialValues({
                name: response.data.name,
                notes: response.data.notes,
                car_id: response.data.car_id.toString(),
                manufacturer_id: response.data.manufacturer_id.toString(),
            })
        } catch (error) {
            console.error('Error fetching car part:', error)
            router.push('/catalog/panel')
            return
        }
    }

    useEffect(() => {
        if (id) {
            fetchCarPart()
        }
    }, [id])

    const handleSubmit = async (values: CreateUpdateDetail) => {
        values.car_id = Number(values.car_id)
        values.manufacturer_id = Number(values.manufacturer_id)
        try {
            await http_common.put(`/details/${id}`, values, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            })
            router.push('/catalog/panel')
        } catch (error) {
            console.error('Error updating car part:', error)
            setError('Error updating car part')
        }
    }

    return (
        <div className={styles.container}>{
            !initialValues ? (
                <div className='loading'>Loading...</div>
            ) : (<>
                <h1 className={styles.title}>Update {initialValues.name}</h1>
                <Form
                    initialValues={initialValues}
                    handleSubmit={handleSubmit}
                    isEditing={true} />
                {error && <div className='error mt-6 text-center'>{error}</div>}
            </>)
        }</div>
    )
}

export default UpdatePage

'use client'
import http_common from '@/lib/requests'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import ManufacturerForm from '../../form'
import styles from '../../form.module.css'
import { useAuthOnly } from '@/lib/hooks'
import Role from '@/models/roles'
import { CreateUpdateManufacturer } from '@/models/manufacturer'

const UpdatePage = ({ params }: { params: { id: number } }) => {
    const router = useRouter()
    const { token } = useAuthOnly(Role.Admin)

    const id = params.id
    const [initialValues, setInitialValues] = useState<CreateUpdateManufacturer>()
    const [error, setError] = useState<string | null>(null)

    const fetchManufacturer = async () => {
        try {
            const response = await http_common.get(`/manufacturer/${id}`)
            if (!response.data) {
                console.error('Manufacturer not found')
                router.push('/manufacturers/panel')
                return
            }

            setInitialValues({
                name: response.data.name,
                description: response.data.description,
            })
        } catch (error) {
            console.error('Error fetching manufacturer:', error)
            setError('Error fetching manufacturer')
        }
    }

    useEffect(() => {
        if (id) fetchManufacturer()
    }, [id])

    console.log('initialValues:', initialValues)
    const handleSubmit = async (values: CreateUpdateManufacturer) => {
        try {
            await http_common.put(`/manufacturer/${id}`, values, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            })
            router.push('/manufacturers/panel')
        } catch (error) {
            console.error('Error updating manufacturer:', error)
            setError('Error updating manufacturer')
        }
    }

    return (
        <div className={styles.container}>{
            !initialValues ? (
                <div className='loading'>Loading...</div>
            ) : (<>
                <h1 className={styles.title}>Update {initialValues.name}</h1>
                <ManufacturerForm
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    isEditing={true} />
                {error && <div className='error mt-6 text-center'>{error}</div>}
            </>)
        }</div>
    )
}

export default UpdatePage

'use client'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import styles from './form.module.css'
import http_common from '@/lib/requests';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { CreateUpdateDetail } from '@/models/detail';
import { useRouter } from 'next/navigation';
import { Manufacturer } from '@/models/manufacturer';
import { Car } from '@/models/car';

const CarPartSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    notes: Yup.string().nullable().notRequired(),
    car_id: Yup.string().required('Car is required'),
    manufacturer_id: Yup.string().required('Manufacturer is required'),
});

interface FormProps {
    initialValues: CreateUpdateDetail,
    handleSubmit: (values: CreateUpdateDetail) => void,
    isEditing: boolean,
}

const DetailForm = ({
    initialValues,
    handleSubmit,
    isEditing,
}: FormProps) => {
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
    const [cars, setCars] = useState<Car[]>([]);

    const router = useRouter();
    
    const fetchData = async () => {
        try {
            const [manufacturersResponse, carsResponse] = await Promise.all([
                http_common.get('/manufacturer'),
                http_common.get('/cars')
            ]);
            
            if (!manufacturersResponse.data.length) {
                console.error('No manufacturers found');
                router.push('/manufacturers/create');
                return;
            }

            if (!carsResponse.data.length) {
                console.error('No cars found');
                router.push('/cars/create');
                return;
            }

            setManufacturers(manufacturersResponse.data);
            setCars(carsResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData().catch(console.error);
    }, []);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={CarPartSchema}
            onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
                <Form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>Name</label>
                        <Field type="text" name="name" className={styles.input} />
                        <ErrorMessage name="name" component="div" className={styles.error} />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="notes" className={styles.label}>Notes</label>
                        <Field as="textarea" name="notes" className={styles.textarea} />
                        <ErrorMessage name="notes" component="div" className={styles.error} />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="car_id" className={styles.label}>Car</label>
                        <Field as="select" name="car_id" className={styles.select}>
                            <option value="">Select a car</option>
                            {cars.map((car) => (
                                <option key={car.id} value={car.id}>
                                    {car.model} ({car.year})
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="car_id" component="div" className={styles.error} />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="manufacturer_id" className={styles.label}>Manufacturer</label>
                        <Field as="select" name="manufacturer_id" className={styles.select}>
                            <option value="">Select a manufacturer</option>
                            {manufacturers.map((manufacturer) => (
                                <option key={manufacturer.id} value={manufacturer.id}>
                                    {manufacturer.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="manufacturer_id" component="div" className={styles.error} />
                    </div>

                    <button type="submit" disabled={isSubmitting} className={styles['btn-submit']}>
                        {isEditing ? 'Update' : 'Create'}
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default DetailForm;

'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './form.module.css'
import { CreateUpdateCar } from '@/models/car';

interface CarFormProps {
    initialValues: CreateUpdateCar;
    onSubmit: (values: CreateUpdateCar) => void;
    isEditing?: boolean;
    manufacturers: { id: number; name: string }[];
}

const CarSchema = Yup.object().shape({
    manufacturer_id: Yup.number().required('Manufacturer is required'),
    model: Yup.string().required('Model is required'),
    year: Yup.number().required('Year is required').min(1900, 'Year must be 1900 or later').max(new Date().getFullYear() + 1, 'Year cannot be in the future'),
});

const CarForm = ({
    initialValues,
    onSubmit,
    isEditing = false,
    manufacturers
}: CarFormProps) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={CarSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form className={styles.form}>
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

                    <div className={styles.formGroup}>
                        <label htmlFor="model" className={styles.label}>Model</label>
                        <Field type="text" name="model" className={styles.input} />
                        <ErrorMessage name="model" component="div" className={styles.error} />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="year" className={styles.label}>Year</label>
                        <Field type="number" name="year" className={styles.input} />
                        <ErrorMessage name="year" component="div" className={styles.error} />
                    </div>

                    <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                        {isEditing ? 'Update' : 'Create'} Car
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default CarForm;

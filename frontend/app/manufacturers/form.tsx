'use client'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import styles from './form.module.css'

interface ManufacturerFormProps {
    initialValues: {
        name: string;
        description: string;
    };
    onSubmit: (values: any) => void;
    isEditing?: boolean;
}

const ManufacturerSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
});

const ManufacturerForm = ({
    initialValues,
    onSubmit,
    isEditing = false
}: ManufacturerFormProps) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={ManufacturerSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>Name</label>
                        <Field type="text" name="name" className={styles.input} />
                        <ErrorMessage name="name" component="div" className={styles.error} />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description" className={styles.label}>Description</label>
                        <Field as="textarea" name="description" className={styles.textarea} />
                        <ErrorMessage name="description" component="div" className={styles.error} />
                    </div>

                    <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                        {isEditing ? 'Update' : 'Create'}
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default ManufacturerForm;

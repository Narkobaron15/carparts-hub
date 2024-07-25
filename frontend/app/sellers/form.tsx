'use client'
import { CreateUpdateSeller } from '@/models/seller';
import styles from './form.module.css'
import User from '@/models/user';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface SellerFormProps {
    initialValues: CreateUpdateSeller;
    onSubmit: (values: any) => void;
    isEditing?: boolean;
    users: (User & { id: number })[];
}

const SellerSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().nullable().notRequired(),
    user_id: Yup.number().required('User is required'),
});

const SellersForm = ({
    initialValues,
    onSubmit,
    isEditing = false,
    users,
}: SellerFormProps) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SellerSchema}
            onSubmit={onSubmit}>
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

                    <div className={styles.formGroup}>
                        <label htmlFor="user_id" className={styles.label}>User</label>
                        <Field as="select" name="user_id" className={styles.select}>
                            <option value="">Select a user</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.username}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="user_id" component="div" className={styles.error} />
                    </div>

                    <button type="submit" disabled={isSubmitting} className={styles['btn-submit']}>
                        {isEditing ? 'Update' : 'Create'}
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default SellersForm;

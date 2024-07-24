'use client'
import Register from '@/models/register';
import styles from './register.module.css';
import { FormikHelpers } from 'formik';
import Link from 'next/link';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { loginFailure, loginRequest, loginSuccess } from '@/lib/redux/features/login_slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import http_common from '@/lib/requests';
import { useRouter } from 'next/navigation';
import { checkAuth } from '@/lib/check_auth';

const RegisterSchema = Yup.object().shape({
    username: Yup.string().min(3, 'Invalid user name').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Too Short!').required('Required'),
    password_confirmation: Yup.string().min(8, 'Too Short!').required('Required')
        .equals([Yup.ref('password')], 'Passwords must match'),
});

const RegisterPage = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.login.token);
    const router = useRouter();

    useEffect(() => {
        checkAuth(token).then(role => {
            if (role) {
                router.push('/');
            } else {
                dispatch(loginFailure({ error: 'Invalid token' }));
            }
        })
    }, [token]);

    const handleSubmit = async (
        values: Register,
        { setSubmitting, setStatus }: FormikHelpers<Register>
    ) => {
        try {
            dispatch(loginRequest());

            const response = await http_common.post('/auth/register', values);

            dispatch(loginSuccess({ token: response.data['access_token'] }));
            setStatus({ success: 'Register successful!' });

            await new Promise(resolve => setTimeout(resolve, 1000))
                .then(() => router.push('/'));
        } catch (error: any) {
            console.error(error);
            setStatus({
                error:
                    error.response.status === 401 || error.response.status === 403
                        ? error.response.data.message
                        : 'Register failed. Please try again.'
            });
            dispatch(loginFailure({ error: error.message }));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Register</h1>
            <Formik
                initialValues={{
                    email: '',
                    username: '',
                    password: '',
                    password_confirmation: ''
                }}
                validationSchema={RegisterSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, isSubmitting, status }) => (
                    <Form className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email" className={styles.label}>Email</label>
                            <Field
                                type="email"
                                name="email"
                                id="email"
                                className={`${styles.input} ${errors.email && touched.email ? styles.inputError : ''}`}
                            />
                            {errors.email && touched.email && <div className={styles.errorText}>{errors.email}</div>}
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="username" className={styles.label}>Username</label>
                            <Field
                                type="username"
                                name="username"
                                id="username"
                                className={`${styles.input} ${errors.username && touched.username ? styles.inputError : ''}`}
                            />
                            {errors.username && touched.username && <div className={styles.errorText}>{errors.username}</div>}
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password" className={styles.label}>Password</label>
                            <Field
                                type="password"
                                name="password"
                                id="password"
                                className={`${styles.input} ${errors.password && touched.password ? styles.inputError : ''}`}
                            />
                            {errors.password && touched.password && <div className={styles.errorText}>{errors.password}</div>}
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password_confirmation" className={styles.label}>Confirm password</label>
                            <Field
                                type="password"
                                name="password_confirmation"
                                id="password_confirmation"
                                className={`${styles.input} 
                                ${errors.password_confirmation && touched.password_confirmation ? styles.inputError : ''}
                                `}
                            />
                            {
                                errors.password_confirmation &&
                                touched.password_confirmation &&
                                <div className={styles.errorText}>{errors.password_confirmation}</div>
                            }
                        </div>

                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </button>

                        {status && status.error && (
                            <div className={styles.errorMessage}>{status.error}</div>
                        )}
                        {status && status.success && (
                            <div className={styles.successMessage}>{status.success}</div>
                        )}
                    </Form>
                )}
            </Formik>
            <p className={styles.signupText}>
                Already have an account? <Link href="/login" className={styles.signupLink}>Login</Link>
            </p>
        </div>
    )
}

export default RegisterPage;

'use client'

import React, { useEffect } from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import styles from './login.module.css';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import http_common from '@/lib/requests';
import { loginFailure, loginRequest, loginSuccess } from '@/lib/features/login_slice';
import { AxiosError } from 'axios';
import Auth from '@/models/auth';

const LoginSchema = Yup.object().shape({
    username: Yup.string().min(3, 'Invalid user name').required('Required'),
    password: Yup.string().min(8, 'Too Short!').required('Required'),
});

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.login.token);
    const router = useRouter();

    useEffect(() => {
        http_common.get('/auth/profile', {
            headers: {
                Authorization: token,
            },
        })
            .then(() => router.push('/'))
            .catch((e: AxiosError) => dispatch(loginFailure({ error: e.message })));
    }, []);

    const handleSubmit = async (
        values: Auth,
        { setSubmitting, setStatus }: FormikHelpers<Auth>,
    ) => {
        try {
            dispatch(loginRequest());

            const response = await http_common.post('/auth/login', values);

            dispatch(loginSuccess({ token: response.data['access_token'] }));
            setStatus({ success: 'Login successful!' });

            await new Promise(resolve => setTimeout(resolve, 1000))
                .then(() => router.push('/'));
        } catch (error: any) {
            console.error(error);
            setStatus({ error: 
                error.response.status === 401 || error.response.status === 403
                ? error.response.data.message
                : 'Login failed. Please try again.' });
            dispatch(loginFailure({ error: error.message }));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Login to CarParts Hub</h1>
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}>
                {({ errors, touched, isSubmitting, status }) => (
                    <Form className={styles.form}>
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

                        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                            {isSubmitting ? 'Logging in...' : 'Log In'}
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
                Don&apos;t have an account?&nbsp;
                <Link href="/register" className={styles.signupLink}>Sign up</Link>
            </p>
        </div>
    );
};

export default LoginPage;

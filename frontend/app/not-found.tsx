'use client'
import Link from 'next/link';
import styles from './error.module.css';

const NotFound = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>404</h1>
                <h2 className={styles.subtitle}>Page Not Found</h2>
                <p className={styles.description}>
                    Oops! The page you&apos;re looking for <br/>
                    doesn&apos;t exist or has been moved.
                </p>
                <div className={styles.actions}>
                    <Link href="/" className={styles.button}>
                        Go to Homepage
                    </Link>
                    <Link href="/catalog" className={styles.button}>
                        Browse Catalog
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;

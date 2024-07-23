"use client";
import Link from 'next/link';
import styles from './error.module.css';

const Error = ({ statusCode }: { statusCode: number }) => {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Whoops!</h1>
                <h2 className={styles.subtitle}>Some error happened</h2>
                <p className={styles.description}>
                    {statusCode
                        ? `An error ${statusCode} occurred on server`
                        : 'An error occurred on client'
                    }
                </p>
                <div className={styles.actions}>
                    <Link href="/" className={styles.button}>
                        Go to Homepage
                    </Link>
                    <button onClick={handleReload} className={styles.button}>
                        Reload
                    </button>
                </div>
            </div>
        </div>
    );
}

Error.getInitialProps = ({ res, err }: {
    res: any;
    err: any;
}) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;

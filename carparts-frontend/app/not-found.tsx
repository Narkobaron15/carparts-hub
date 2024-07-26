'use client'
import Link from 'next/link'
import styles from './error.module.css'
import { useRouter } from 'next/navigation'

const NotFound = () => {
    const router = useRouter()
    const handleBack = () => router.back()

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
                    <button onClick={handleBack} className={styles.button}>
                        Go back
                    </button>
                    <Link href='/' className={styles.button}>
                        Home page
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound

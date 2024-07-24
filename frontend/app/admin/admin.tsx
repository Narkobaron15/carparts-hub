import Link from 'next/link';
import styles from './generic.module.css';

const AdminPage = () => {
    return (
        <div className="container">
            <h1 className={styles.title}>Admin Page</h1>
            <div className={styles['custom-grid']}>
                <Link href="/catalog/panel" className={styles.card}>
                    <h2>Car Parts</h2>
                    <p>Open details panel</p>
                </Link>

                <Link href="/manufacturers/panel" className={styles.card}>
                    <h2>Manufacturers</h2>
                    <p>Open manufacturers panel</p>
                </Link>

                <Link href="/sellers/panel" className={styles.card}>
                    <h2>Sellers</h2>
                    <p>Open sellers panel</p>
                </Link>

                <Link href="/cars/panel" className={styles.card}>
                    <h2>Cars</h2>
                    <p>Open cars panel</p>
                </Link>

                {/* TODO */}
                {/* <Link href="/users/panel" className={styles.card}>
                    <h2>Users</h2>
                    <p>Open users panel</p>
                </Link> */}

                <Link href="/" className={styles.card}>
                    <h2>Go home</h2>
                    <p>Return to the home page</p>
                </Link>
            </div>
        </div>
    )
}

export default AdminPage;

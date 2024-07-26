import Link from 'next/link'
import styles from './generic.module.css'

const SellerPage = () => {
    return (
        <div className='container'>
            <h1 className={styles.title}>Seller Page</h1>
            <div className={styles['custom-grid']}>
                <Link href='/catalog/panel' className={styles.card}>
                    <h2>Car Parts</h2>
                    <p>Open details panel</p>
                </Link>

                <Link href='/' className={styles.card}>
                    <h2>Go home</h2>
                    <p>Return to the home page</p>
                </Link>

                {/* TODO */}
                {/* <Link href='/users/panel' className={styles.card}>
                    <h2>Users</h2>
                    <p>Open users panel</p>
                </Link> */}
            </div>
        </div>
    )
}

export default SellerPage

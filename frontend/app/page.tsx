import Link from "next/link";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles['home-page']}>
      <h1 className={styles.title}>Welcome to CarParts Hub</h1>
      <p className={styles.description}>Your one-stop shop for quality car parts</p>

      <div className={styles['home-grid']}>
        <Link href="/catalog" className={styles.card}>
          <h2>Car Parts Catalog</h2>
          <p>Find the right part for your car</p>
        </Link>

        <Link href="/manufacturers" className={styles.card}>
          <h2>Manufacturers</h2>
          <p>Discover the best car part manufacturers</p>
        </Link>

        <Link href="/sellers" className={styles.card}>
          <h2>Sellers</h2>
          <p>Connect with the top car part sellers</p>
        </Link>
      </div>
    </div>
  );
}
'use client'
import Link from "next/link";
import styles from "./home.module.css";
import Role from "@/models/roles";
import { useAuth } from "@/lib/hooks";

const Home = () => {
  const { role } = useAuth();

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

        <Link href="/cars" className={styles.card}>
          <h2>Cars</h2>
          <p>Browse available details for your car</p>
        </Link>

        <Link href="/sellers" className={styles.card}>
          <h2>Sellers</h2>
          <p>Connect with the top car part sellers</p>
        </Link>

        {role !== Role.Guest && (
          <Link href="/cart" className={styles.card}>
          <h2>Cart</h2>
          <p>View your orders</p>
        </Link>
        )}

        {(role === Role.Admin || role === Role.Seller) && (
          <Link href="/admin" className={styles.card}>
            <h2>Admin Panel</h2>
            <p>Manage the site</p>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;

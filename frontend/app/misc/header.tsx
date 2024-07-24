'use client'
import Link from 'next/link';
import { useState } from 'react';
import styles from './header.module.css';
import useAuth from '@/lib/hooks';
import Role from '@/models/roles';

const Header = () => {
  const { role } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useState(role !== Role.Guest);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // TODO: Add login + register/logout button

  return (
    <header className={styles.header}>
      <div className={styles['header-container']}>
        <Link href="/" className={styles.logo}>
          CarParts Hub
        </Link>

        <button className={styles.menuButton} onClick={toggleMenu}>
          <span className={styles.menuIcon}></span>
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/catalog" className={styles.navLink}>Catalog</Link>
          <Link href="/manufacturers" className={styles.navLink}>Manufacturers</Link>
          <Link href="/sellers" className={styles.navLink}>Sellers</Link>
          {isAuthenticated ? (
            <Link href="/logout" className={styles.navLink}>Logout</Link>
          ) : (
            <Link href="/login" className={styles.navLink}>Login</Link>
          )}
          <Link href="/about" className={styles.navLink}>About</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

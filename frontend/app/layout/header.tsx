'use client'
import Link from 'next/link'
import { useState } from 'react'
import styles from './header.module.css'
import { useAuth } from '@/lib/hooks'
import Role from '@/models/roles'

const Header = () => {
  const { role } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isAuthenticated = !!role && role !== Role.Guest

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className={styles.header}>
      <div className={styles['header-container']}>
        <Link href='/' className={styles.logo}>
          CarParts Hub
        </Link>

        <button className={styles.menuButton} onClick={toggleMenu}>
          <span className={styles.menuIcon}></span>
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <Link href='/catalog' className={styles.navLink}>Catalog</Link>
          <Link href='/manufacturers' className={styles.navLink}>Manufacturers</Link>
          <Link href='/sellers' className={styles.navLink}>Sellers</Link>
          <Link href='/cars' className={styles.navLink}>Cars</Link>
          <Link href='/about' className={styles.navLink}>About</Link>
          {isAuthenticated ? (
            <>
              {role === Role.Admin && (
                <Link href='/admin' className={styles.navLink}>Admin</Link>
              )}
              <Link href='/cart' className={styles.navLink}>Cart</Link>
              <Link href='/logout' className={styles.navLink}>Logout</Link>
            </>
          ) : (
            <Link href='/login' className={styles.navLink}>Login</Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header

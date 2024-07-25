'use client'
import styles from './footer.module.css'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <p>&copy 2024 CarParts Hub. All rights reserved.</p>
    </footer>
  )
}

export default Footer

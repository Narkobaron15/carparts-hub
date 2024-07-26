'use client'
import Image from 'next/image'
import styles from './about.module.css'

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About CarParts Hub</h1>

      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <Image
            src='/images/workshop.webp'
            alt='Car workshop'
            width={600}
            height={400}
            className={styles.image}
          />
        </div>

        <div className={styles.text}>
          <p>
            Welcome to CarParts Hub, your trusted source for high-quality automotive parts since 2010. 
            We&apos;re passionate about providing car enthusiasts and professional mechanics with the best 
            components to keep vehicles running smoothly.
          </p>
          <p>
            Our team of experts carefully curates our extensive catalog, ensuring that every part meets
            our rigorous standards for quality and performance. We work directly with leading manufacturers
            and trusted sellers to bring you a wide selection of genuine and aftermarket parts at competitive prices.
          </p>
          <p>
            At CarParts Hub, we believe in:
          </p>
          <ul className={styles.list}>
            <li>Quality assurance for every product</li>
            <li>Exceptional customer service</li>
            <li>Rapid shipping and hassle-free returns</li>
            <li>Empowering our customers with knowledge</li>
          </ul>
          <p>
            Whether you&apos;re a DIY enthusiast or a professional mechanic, we&apos;re here to support your
            automotive projects with the right parts and expert advice.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage

'use client'
import { Detail } from '@/models/detail'
import styles from './catalog.module.css'
import CatalogCard from './catalog-card'

interface CatalogProps {
    catalogName: string
    parts: Detail[]
}

const CatalogCore = ({ catalogName, parts }: CatalogProps) => {
    if (!parts.length) return (
        <h2 className={styles.title}>No details found</h2>
    )

    return (
        <>
            <h2 className='title'>{catalogName} Catalog</h2>
            <div className={styles['catalog-grid']}>
                {parts.map((part) => <CatalogCard key={part.id} part={part} />)}
            </div>
        </>
    )
}

export default CatalogCore

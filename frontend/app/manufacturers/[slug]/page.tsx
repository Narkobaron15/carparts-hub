'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from './page.module.css';

const SingleDetailsPage = (
    { params }: { params: { slug: string } }
) => {
    const router = useRouter();

    const id = Number(params.slug);
    
    useEffect(() => {
        if (isNaN(id)) {
            router.push('/404');
            return;
        }
    }, [id]);

    return (
        <>{id}</>
    );
}

export default SingleDetailsPage;

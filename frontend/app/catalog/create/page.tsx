'use client'
import http_common from '@/lib/requests';
import { useRouter } from 'next/navigation';
import styles from '../form.module.css';
import Form from '../form';
import { useAuthOnly } from '@/lib/hooks';
import Role from '@/models/roles';
import { CreateUpdateDetail } from '@/models/detail';

const CreatePage = () => {
    const { token } = useAuthOnly(Role.Admin, Role.Seller);

    const router = useRouter();
    const initialValues = {
        name: '',
        notes: '',
        car_id: '',
        manufacturer_id: '',
    };

    const handleSubmit = async (values: CreateUpdateDetail) => {
        values.car_id = Number(values.car_id);
        values.manufacturer_id = Number(values.manufacturer_id);
        try {
            await http_common.post('/detail', values, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });
            router.push('/catalog');
        } catch (error) {
            console.error('Error creating car part:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create New Car Part</h1>
            <Form
                initialValues={initialValues}
                handleSubmit={handleSubmit}
                isEditing={false} />
        </div>
    );
}

export default CreatePage;

'use client'
import { useAuthOnly } from '@/lib/hooks';
import http_common from '@/lib/requests';
import { Car } from '@/models/car';
import Role from '@/models/roles';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const PanelPage = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuthOnly(Role.Admin);
    const router = useRouter();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await http_common.get('/cars', {
                    headers: {
                        Authorization: token,
                    },
                });
                setCars(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch cars');
                setLoading(false);
            }
        };

        fetchCars();
    }, [token]);

    const handleDelete = async (id: number) => {
        try {
            await http_common.delete(`/car/${id}`, {
                headers: {
                    Authorization: token,
                },
            });
            setCars(cars.filter(car => car.id !== id));
        } catch (err) {
            setError('Failed to delete car');
        }
    };

    const handleEdit = (id: number) => router.push(`/cars/update/${id}`);

    if (loading) return <div className='loading'>Loading...</div>;
    if (error) return <div className='error'>{error}</div>;

    return (
        <div className='container'>
            <h1 className='title'>Cars Admin Panel</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Model</th>
                        <th>Year</th>
                        <th>Manufacturer</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car) => (
                        <tr key={car.id}>
                            <td>
                                <Link href={`/cars/${car.id}`}>{car.id}</Link>
                            </td>
                            <td>
                                <Link href={`/cars/${car.id}`}>{car.model}</Link>
                            </td>
                            <td>{car.year}</td>
                            <td>{car.manufacturer.name}</td>
                            <td>{new Date(car.created_at).toLocaleString()}</td>
                            <td>
                                <button
                                    onClick={() => handleEdit(car.id)}
                                    className='btn-primary mr-2'>
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(car.id)}
                                    className='btn-danger'>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center my-7">
                <Link href='/cars/create' className='btn-success'>Add Car</Link>
            </div>
        </div>
    );
}

export default PanelPage;

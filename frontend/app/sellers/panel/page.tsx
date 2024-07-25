'use client'
import { useAuthOnly } from '@/lib/hooks';
import http_common from '@/lib/requests';
import Role from '@/models/roles';
import { Seller } from '@/models/seller';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const PanelPage = () => {
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { token } = useAuthOnly(Role.Admin);
    const router = useRouter();

    useEffect(() => {
        const fetchSellers = async () => {
            try {
                const response = await http_common.get('/sellers', {
                    headers: {
                        Authorization: token,
                    },
                });
                setSellers(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch sellers');
                setLoading(false);
            }
        };

        fetchSellers();
    }, [token]);

    const handleDelete = async (id: number) => {
        try {
            await http_common.delete(`/sellers/${id}`, {
                headers: {
                    Authorization: token,
                },
            });
            setSellers(sellers.filter(seller => seller.id !== id));
        } catch (err) {
            setError('Failed to delete seller');
        }
    };

    const handleEdit = (id: number) => router.push(`/sellers/update/${id}`);

    if (loading) return <div className='loading'>Loading...</div>;
    if (error) return <div className='error'>{error}</div>;

    return (
        <div className='container'>
            <h1 className='title'>Sellers Admin Panel</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Description</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sellers.map((seller) => (
                        <tr key={seller.id}>
                            <td>
                                <Link href={`/sellers/${seller.id}`}>
                                    {seller.id}
                                </Link>
                            </td>
                            <td>
                                <Link href={`/sellers/${seller.id}`}>
                                    {seller.name}
                                </Link>
                            </td>
                            <td>{seller.user.username}</td>
                            <td>{seller.user.email}</td>
                            <td className='wrap'>{seller.description}</td>
                            <td>{new Date(seller.created_at).toLocaleString()}</td>
                            <td>
                                <button
                                    className='btn-primary mr-2'
                                    onClick={() => handleEdit(seller.id)}>
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(seller.id)}
                                    className='btn-danger'>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center my-7">
                <Link href='/sellers/create' className='btn-success'>Add Seller</Link>
            </div>
        </div>
    );
}

export default PanelPage;

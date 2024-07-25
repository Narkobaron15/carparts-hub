'use client'

import { useEffect, useState } from "react";
import CatalogCore from "@/app/layout/catalog-core";
import { Car } from "@/models/car";
import { Detail } from "@/models/detail";
import http_common from "@/lib/requests";

const SingleDetailsPage = (
    { params }: { params: { slug: string } }
) => {
    const [car, setCar] = useState<Car>();
    const [details, setDetails] = useState<Detail[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await http_common.get(`/cars/${params.slug}`);
            const resDetails = await http_common.get(`/detail/car/${params.slug}`);
            setCar(res.data);
            setDetails(resDetails.data);
        } catch (error) {
            console.error("An error occurred while fetching the data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData().catch(console.error);
    }, [params.slug]);

    if (loading) return <div className="loading">Loading...</div>;
    if (!car) return <div className="error">Car not found</div>;

    return (
        <div className="container">
            <CatalogCore
                catalogName={car.manufacturer.name + ' ' + car.model}
                parts={details} />
        </div>
    )
}

export default SingleDetailsPage;

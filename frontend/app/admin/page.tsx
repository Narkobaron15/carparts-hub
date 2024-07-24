'use client'

import Role from "@/models/roles";
import SellerPage from "./seller";
import { useAuthOnly } from "@/lib/hooks";
import AdminPage from "./admin";

const CoreAdminPage = () => {
    const { role } = useAuthOnly(Role.Admin, Role.Seller);

    switch (role) {
        case Role.Admin:
            return <AdminPage />;
        case Role.Seller:
            return <SellerPage />;
        default:
            return <div className="loading">Loading...</div>;
    }
}

export default CoreAdminPage;

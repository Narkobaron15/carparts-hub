import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks"
import User from "@/models/user";
import { getAuth, getRole } from "./check_auth";
import Role from "@/models/roles";
import { useRouter } from "next/navigation";
import { loginFailure } from "./redux/features/login_slice";

const initialState: User = {
    username: '',
    email: '',
    role: Role.Guest,
};

const useAuth = () => {
    const token = useAppSelector(state => state.login.token);
    const [user, setUser] = useState<User>(initialState);

    useEffect(() => {
        getAuth(token).then(user => setUser(user ?? initialState));
    }, [token]);

    return user;
}

const useAuthOnly = (...roles: Role[]) => {
    const router = useRouter();
    const token = useAppSelector(state => state.login.token);
    const [role, setRole] = useState<Role | null>(null);

    useEffect(() => {
        getRole(token).then(r => {
            if (!r || (roles.length > 0 && !roles.includes(r))) {
                router.push('/')
            }
            setRole(r)
        });
    }, [token, roles]);

    return { role, token };
}

const useUnauthOnly = (link?: string) => {
    const router = useRouter();
    const token = useAppSelector(state => state.login.token);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (token) {
            router.push(link ?? '/');
        } else {
            dispatch(loginFailure({ error: 'Invalid token' }));
        }
    }, [token, link]);
}

export { useAuth, useAuthOnly, useUnauthOnly };

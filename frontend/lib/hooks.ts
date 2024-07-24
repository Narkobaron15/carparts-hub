import { useEffect, useState } from "react";
import { useAppSelector } from "./redux/hooks"
import User from "@/models/user";
import { getAuth } from "./check_auth";
import Role from "@/models/roles";

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

export default useAuth;

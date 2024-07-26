import Role from '@/models/roles'
import http_common from './requests'
import User from '@/models/user'

const getRole = async (token: string | null): Promise<Role | null> =>
    (await getAuth(token))?.role ?? null

const getAuth = async (token: string | null): Promise<User | null> => {
    if (!token) {
        return null
    }

    if (!token.startsWith('Bearer ')) {
        return null
    }

    try {
        const { data } = await http_common.get('/auth/profile', {
            headers: {
                Authorization: token,
            },
        })
        return data
    } catch (error) {
        return null
    }
}

export { getRole, getAuth }

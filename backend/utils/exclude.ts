export default function exclude<T, Key extends keyof T>(
    user: T,
    keys: Key[]
) {
    if (!user) return user;
    return Object.fromEntries(
        Object.entries(user).filter(([key]) => !keys.includes(key as Key))
    ) as Omit<T, Key>;
}

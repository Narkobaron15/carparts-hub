import Role from '@/models/roles'
import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        error: null,
        loading: false,
        token: null,
        role: null,
    } as {
        error: string | null
        loading: boolean
        token: string | null
        role: Role | null
    },
    reducers: {
        roleRequest: (state, action) => {
            state.role = action.payload
        },
        loginRequest: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            let { token } = action.payload
            if (!token.startsWith('Bearer ')) {
                token = `Bearer ${token}`
            }

            state.token = token
            state.loading = false
        },
        loginFailure: (state, action) => {
            state.token = null
            state.error = action.payload
            state.loading = false
        },
        logout: (state) => {
            state.token = null
            state.error = null
            state.loading = false
            state.role = null
        }
    },
})

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    logout,
    roleRequest
} = loginSlice.actions

export default loginSlice

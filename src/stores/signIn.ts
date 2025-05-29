// @ts-ignore
import { createStore } from 'vuex'
import axios from 'axios'
import type { login } from "@/core/helpers/types";

export const signInUser = createStore({
    state: () => ({
        email: null,
        password: null,
        token: null,
        refreshToken: null
    }),
    mutations: {
        setData(state: any, payload: { email: string, password: string }) {
            state.email = payload.email
            state.password = payload.password
        },
        setAuth(state: any, payload: { token: string, user: any }) {
            state.token = payload.token
            state.refreshToken = payload.user
        }
    },
    actions: {
        // @ts-ignore
        async loginUser({ state, commit }) {
            const res = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
                email: state.email,
                password: state.password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!res.data || Object.keys(res.data).length === 0) return;

            commit('setAuth', {
                token: res.data.access_token,
                refreshToken: res.data.refreshToken
            })

            return res.data;

        }

    },
    getters: {}
})

// @ts-ignore
import { createStore } from 'vuex'
import axios from 'axios'
import type { userData } from "@/core/helpers/types";

export const signUpUser = createStore({
    state: () => ({
        email: null,
        password: null,
        currentPassword: null
    }),
    mutations: {
        setData(state: any, payload: { email: string, password: string, currentPassword: string }) {
            state.email = payload.email;
            state.password = payload.password;
            state.currentPassword = payload.currentPassword;
        }
    },
    actions: {
        // @ts-ignore
        async signUp({ state, commit }) {
            const res = await axios.post('https://reqres.in/api/register', {
                email: state.email,
                password: state.password,
                currentPassword: state.currentPassword
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });


            if (!res.data || Object.keys(res.data).length === 0) return;

            commit('setData', res.data)
        }
    },
    getters: {}
})

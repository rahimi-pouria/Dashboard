// @ts-ignore
import { createStore } from 'vuex'
import axios from 'axios'

export interface State {
    data: any | null
}

export const getCurrentUserStore = createStore({
    state: () => ({
        data: null
    }),
    mutations: {
        setData(state: any, payload: any) {
            state.data = payload
        }
    },
    actions: {
        // @ts-ignore
        async getCurrentUserProfile({ commit }) {
            const res = await axios.get('https://fakestoreapi.com/users/1')
            if (!res.data || Object.keys(res.data).length === 0) return
            commit('setData', res.data)
        }
    },
    getters: {}
})

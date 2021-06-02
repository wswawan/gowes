/* eslint-disable no-console */
export const state = () => ({
  form: {
    email: 'farrell.reid@example.org',
    password: 'password',
  },
  users: [],
})

export const mutations = {
  async login(state) {
    await this.$auth.loginWith('laravelSanctum', {
      data: state.form,
    })
  },

  async logout() {
    try {
      await this.$auth.logout()
    } catch (error) {
      console.log(error)
    }
  },

  SET_USERS(state, users) {
    state.users = users
  },
}

export const actions = {
  async fetchUsers({ commit }) {
    const users = await this.$axios.$get('/api/users')
    commit('SET_USERS', users)
  },
}

export const getters = {
  users(state) {
    return state.users
  },
}

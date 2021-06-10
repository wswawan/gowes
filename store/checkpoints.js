/* eslint-disable no-console */
/* eslint-disable camelcase */
export const state = () => ({
  checkpoints: [],
  name: null,
  description: null,
  user_id: null,
  dialog: false,
})
export const getters = {
  checkpoints(state) {
    return state.checkpoints
  },
}
export const actions = {
  async fetchCheckpoints({ commit }) {
    const checkpoints = await this.$axios.$get('/api/checkpoints')
    commit('SET_CHECKPOINTS', checkpoints)
  },
  async createCheckpoint({ state, commit }) {
    await this.$axios.$get('/sanctum/csrf-cookie')
    await this.$axios
      .$post('/api/checkpoint', {
        name: state.name,
        description: state.description,
        user_id: state.user_id,
      })
      .then((data) => {
        console.log(data)
        commit('SET_SAVE_CHECKPOINT', data)
        commit('SET_DIALOG', state.dialog)
      })
  },
}
export const mutations = {
  SET_NAME(state, name) {
    state.name = name
  },
  SET_DESCRIPTION(state, description) {
    state.description = description
  },
  SET_USER_ID(state, user_id) {
    state.user_id = user_id
  },
  SET_CHECKPOINTS(state, checkpoints) {
    state.checkpoints = checkpoints
  },
  SET_SAVE_CHECKPOINT(state, checkpoint) {
    state.checkpoints.unshift(checkpoint)
  },
  SET_DIALOG(state, dialog) {
    state.dialog = !dialog
  },
}

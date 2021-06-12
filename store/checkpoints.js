/* eslint-disable no-console */
/* eslint-disable camelcase */
export const state = () => ({
  checkpoints: [],
  editedIndex: -1,
  id: null,
  name: null,
  description: null,
  qrcode_url: null,
  user: {
    id: null,
    name: null,
  },
  dialog: false,
  dialogDelete: false,
  loading: false,
  snackbar: false,
  color: 'teal darken-3',
  success: '',
  error: '',
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
        user_id: state.user.id,
      })
      .then((data) => {
        commit('SET_SAVE_CHECKPOINT', data)
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_TEXT_SUCCESS', 'Created Successfully')
        commit('SET_DIALOG', state.dialog)
        commit('SET_LOADING', state.loading)
        commit('SET_RESET')
      })
      .catch((error) => {
        commit('SET_COLOR', 'error')
        commit('SET_TEXT_SUCCESS', null)
        commit('SET_TEXT_ERROR', error.response.data.errors)
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_LOADING', state.loading)
      })
  },
  async updateCheckpoint({ state, commit }) {
    await this.$axios.$get('/sanctum/csrf-cookie')
    await this.$axios
      .$put(`/api/checkpoint/${state.id}`, {
        name: state.name,
        description: state.description,
        user_id: state.user.id,
      })
      .then((data) => {
        commit('SET_SAVE_CHECKPOINT', data)
        commit('SET_INDEX', -1)
        commit('SET_DIALOG', state.dialog)
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_TEXT_SUCCESS', 'Updated Successfully')
        commit('SET_LOADING', state.loading)
        commit('SET_RESET')
      })
  },

  async deleteCheckpoint({ state, commit }) {
    await this.$axios.$get('/sanctum/csrf-cookie')
    await this.$axios.$delete(`/api/checkpoint/${state.id}`).then(() => {
      commit('SET_DELETE_ITEM')
      commit('SET_INDEX', -1)
      commit('SET_DIALOG_DELETE', state.dialogDelete)
      commit('SET_COLOR', 'teal darken-3')
      commit('SET_SNACKBAR', state.snackbar)
      commit('SET_TEXT_SUCCESS', 'Deleted Successfully')
    })
  },
}
export const mutations = {
  SET_ID(state, id) {
    state.id = id
  },
  SET_NAME(state, name) {
    state.name = name
  },
  SET_DESCRIPTION(state, description) {
    state.description = description
  },
  SET_QRCODE_URL(state, qrcode_url) {
    state.qrcode_url = qrcode_url
  },
  SET_USER(state, user) {
    state.user.id = user.id
    state.user.name = user.name
  },

  SET_RESET(state) {
    state.name = null
    state.description = null
    state.user.id = null
    state.user.name = null
  },

  SET_CHECKPOINTS(state, checkpoints) {
    state.checkpoints = checkpoints
  },
  SET_SAVE_CHECKPOINT(state, checkpoint) {
    Object.assign(checkpoint, { 'user.name': state.user.name })
    if (state.editedIndex > -1) {
      Object.assign(state.checkpoints[state.editedIndex], checkpoint)
    } else {
      state.checkpoints.unshift(checkpoint)
    }
  },

  SET_DELETE_ITEM(state) {
    state.checkpoints.splice(state.editedIndex, 1)
  },

  SET_DIALOG(state, dialog) {
    state.dialog = !dialog
  },

  SET_DIALOG_DELETE(state, dialogDelete) {
    state.dialogDelete = !dialogDelete
  },

  SET_LOADING(state, loading) {
    state.loading = !loading
  },

  SET_TEXT_SUCCESS(state, success) {
    state.success = success
  },

  SET_SNACKBAR(state, snackbar) {
    state.snackbar = !snackbar
  },
  SET_INDEX(state, index) {
    state.editedIndex = index
  },
  SET_COLOR(state, color) {
    state.color = color
  },
  SET_TEXT_ERROR(state, error) {
    state.error = error
  },
}

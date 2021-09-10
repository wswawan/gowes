/* eslint-disable no-console */
export const state = () => ({
  uuid: null,
  qrscans: [],
  summary: [],
  snackbar: false,
  color: 'success',
  error: [],
  success: '',
  loading: false,
})
export const getters = {
  qrscan(state) {
    return state.qrscan
  },
  summary(state) {
    return state.summary
  },
}
export const actions = {
  async qrscan({ state, commit }) {
    await this.$axios.$get('/sanctum/csrf-cookie')
    await this.$axios
      .$post('/api/qrscan', {
        uuid: state.uuid,
      })
      .then(() => {
        this.$router.push({ name: 'home' })
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_COLOR', 'teal darken-3')
        commit('SET_UUID')
        commit('SET_LOADING', state.loading)
      })
      .catch((error) => {
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_COLOR', 'error')
        commit('SET_TEXT_ERROR', error.response.data.message)
        commit('SET_LOADING', state.loading)
      })
  },
  fetchQrscans({ commit }) {
    this.$axios.$get('/api/qrscans').then((data) => {
      commit('SET_QRSCANS', data)
    })
  },
  async fetchSummary({ commit }) {
    await this.$axios.$get('api/summary').then((data) => {
      commit('SET_SUMMARY', data)
    })
  },
}
export const mutations = {
  SET_UUID(state, uuid) {
    state.uuid = uuid
  },
  SET_QRSCANS(state, qrscans) {
    state.qrscans = qrscans
  },
  SET_SUMMARY(state, summary) {
    state.summary = summary
  },
  SET_TEXT_ERROR(state, error) {
    state.error = error
  },

  SET_TEXT_SUCCESS(state, success) {
    state.success = success
  },

  SET_COLOR(state, color) {
    state.color = color
  },
  SET_SNACKBAR(state, snackbar) {
    state.snackbar = !snackbar
  },

  SET_LOADING(state, loading) {
    state.loading = !loading
  },
}

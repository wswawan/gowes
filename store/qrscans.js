/* eslint-disable no-console */
export const state = () => ({
  uuid: null,
  qrscans: [],
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
}
export const actions = {
  async qrscan({ state, commit }) {
    await this.$axios.$get('/sanctum/csrf-cookie')
    await this.$axios
      .$post('/api/qrscan', {
        uuid: state.uuid,
      })
      .then(() => {
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_COLOR', 'teal darken-3')
        commit('SET_TEXT_SUCCESS', 'Checkin Successfully')
        commit('SET_UUID')
        commit('SET_LOADING', state.loading)
        this.$router.push('/home')
      })
  },
  async fetchQrscans({ commit }) {
    await this.$axios.$get('/api/qrscans').then((data) => {
      commit('SET_QRSCANS', data)
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

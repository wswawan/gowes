/* eslint-disable camelcase */
/* eslint-disable no-console */
export const state = () => ({
  id: null,
  name: null,
  email: null,
  nik: null,
  date_of_birth: null,
  phone_number: null,
  is_admin: null,
  editedIndex: -1,
  users: [],
  alert: false,
  timeout: 10000,
  color: 'success',
  error: [],
  dialog: false,
  dialogDelete: false,
  snackbar: false,
  success: '',
  loading: false,
})

export const getters = {
  users(state) {
    return state.users
  },
}

export const actions = {
  async fetchUsers({ commit }) {
    const users = await this.$axios.$get('/api/users')
    commit('SET_USERS', users)
  },
  async login({ state }) {
    await this.$auth.loginWith('laravelSanctum', {
      data: {
        email: 'brielle.trantow@example.org',
        password: 'password',
      },
    })
  },

  async logout() {
    try {
      await this.$auth.logout()
    } catch (error) {
      console.log(error)
    }
  },

  async register({ state, commit }) {
    await this.$axios.$get('/sanctum/csrf-cookie')
    await this.$axios
      .$post('/api/register', {
        name: state.name,
        email: state.email,
        nik: state.nik,
        phone_number: state.phone_number,
        date_of_birth: state.date_of_birth,
        is_admin: state.is_admin,
      })
      .then((data) => {
        commit('SET_SAVE_USER', data)
        commit('SET_DIALOG', state.dialog)
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_TEXT_SUCCESS', 'Registration Successfully')
        commit('SET_ALERT', false)
        commit('SET_ADMIN')
        commit('SET_LOADING', state.loading)
      })
      .catch((error) => {
        commit('SET_ALERT', true)
        commit('SET_COLOR', 'error')
        commit('SET_TEXT_SUCCESS', null)
        commit('SET_TEXT_ERROR', error.response.data.errors)
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_LOADING', state.loading)
      })
  },

  updateUser({ state, commit }) {
    this.$axios.$get('/sanctum/csrf-cookie')
    this.$axios
      .$post('api/user/' + state.id, {
        name: state.name,
        email: state.email,
        nik: state.nik,
        phone_number: state.phone_number,
        date_of_birth: state.date_of_birth,
        is_admin: state.is_admin,
      })
      .then((data) => {
        commit('SET_SAVE_USER', data)
        commit('SET_INDEX', -1)
        commit('SET_DIALOG', state.dialog)
        commit('SET_COLOR', 'teal darken-3')
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_TEXT_SUCCESS', 'Updated Successfully')
        commit('SET_LOADING', state.loading)
        commit('SET_ADMIN')
      })
  },
  deleteUser({ state, commit }) {
    this.$axios.$get('/sanctum/csrf-cookie')
    this.$axios.$delete(`api/user/${state.id}`).then(() => {
      commit('SET_DELETE_USER')
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

  SET_EMAIL(state, email) {
    state.email = email
  },
  SET_PHONE_NUMBER(state, phone_number) {
    state.phone_number = phone_number
  },
  SET_BIRTHDAY(state, date_of_birth) {
    state.date_of_birth = date_of_birth
  },
  SET_NIK(state, nik) {
    state.nik = nik
  },
  SET_ADMIN(state, is_admin) {
    state.is_admin = is_admin
  },
  SET_USERS(state, users) {
    state.users = users
  },

  SET_SAVE_USER(state, user) {
    if (state.editedIndex > -1) {
      Object.assign(state.users[state.editedIndex], user)
    } else {
      state.users.unshift(user)
    }
  },

  SET_DELETE_USER(state) {
    state.users.splice(state.editedIndex, 1)
  },

  SET_INDEX(state, index) {
    state.editedIndex = index
  },

  SET_ALERT(state, alert) {
    state.alert = alert
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

  SET_DIALOG(state, dialog) {
    state.dialog = !dialog
  },
  SET_DIALOG_DELETE(state, dialogDelete) {
    state.dialogDelete = !dialogDelete
  },

  SET_SNACKBAR(state, snackbar) {
    state.snackbar = !snackbar
  },

  SET_LOADING(state, loading) {
    state.loading = !loading
  },
}

/* eslint-disable camelcase */
/* eslint-disable no-console */
export const state = () => ({
  id: null,
  name: null,
  email: null,
  password: null,
  new_password: null,
  nik: null,
  date_of_birth: null,
  phone_number: null,
  is_admin: 0,
  profile_image: null,
  editedIndex: -1,
  users: [],
  alert: false,
  timeout: 10000,
  dialog: false,
  dialogDelete: false,
  snackbar: false,
  color: 'success',
  error: [],
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
  async login({ state, commit }) {
    await this.$auth
      .loginWith('laravelSanctum', {
        data: {
          email: state.email,
          password: state.password,
        },
      })
      .then(() => {
        commit('SET_LOADING', state.loading)
        commit('SET_RESET')
      })
      .catch((err) => {
        commit('SET_COLOR', 'error')
        commit('SET_TEXT_SUCCESS', null)
        commit('SET_TEXT_ERROR', err.response.data.message)
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_LOADING', state.loading)
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
        password: state.password,
        nik: state.nik,
        phone_number: state.phone_number,
        date_of_birth: state.date_of_birth,
        is_admin: state.is_admin,
      })
      .then((data) => {
        commit('SET_SAVE_USER', data)
        commit('SET_DIALOG', state.dialog)
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_COLOR', 'teal darken-3')
        commit('SET_TEXT_SUCCESS', 'Registration Successful')
        commit('SET_LOADING', state.loading)
      })
      .catch((error) => {
        commit('SET_COLOR', 'error')
        commit('SET_TEXT_SUCCESS', null)
        commit('SET_TEXT_ERROR', error.response.data.errors)
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_LOADING', state.loading)
      })
  },

  updateProfileImage({ state }) {
    const formData = new FormData()
    formData.append('profile_image', state.profile_image)
    this.$axios.$get('/sanctum/csrf-cookie')
    this.$axios.$post('api/profile_image', formData)
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
        commit('SET_TEXT_SUCCESS', 'Update Successful')
        commit('SET_LOADING', state.loading)
        commit('SET_ADMIN')
      })
  },

  updatePassword({ state, commit }) {
    this.$axios.$get('/sanctum/csrf-cookie')
    this.$axios
      .$post('api/update_password', {
        password: state.password,
        new_password: state.new_password,
      })
      .then(() => {
        commit('SET_COLOR', 'teal darken-3')
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_TEXT_SUCCESS', 'Update Successful')
        commit('SET_PASSWORD')
        commit('SET_NEW_PASSWORD')
        commit('SET_DIALOG', state.dialog)
        commit('SET_LOADING', state.loading)
      })
      .catch((err) => {
        commit('SET_COLOR', 'error')
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_TEXT_SUCCESS', err.response.data.message)
        commit('SET_LOADING', state.loading)
      })
  },
  deleteUser({ state, commit }) {
    this.$axios.$get('/sanctum/csrf-cookie')
    this.$axios
      .$delete(`api/user/${state.id}`)
      .then(() => {
        commit('SET_DELETE_USER')
        commit('SET_INDEX', -1)
        commit('SET_DIALOG_DELETE', state.dialogDelete)
        commit('SET_LOADING', state.loading)
        commit('SET_COLOR', 'teal darken-3')
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_TEXT_SUCCESS', 'Delete Successful')
      })
      .catch((error) => {
        commit('SET_LOADING', state.loading)
        commit('SET_DIALOG_DELETE', state.dialogDelete)
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_COLOR', 'error')
        commit('SET_TEXT_SUCCESS', error.response.data)
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
  SET_PASSWORD(state, password) {
    state.password = password
  },
  SET_NEW_PASSWORD(state, new_password) {
    state.new_password = new_password
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
  SET_PROFILE_IMAGE(state, profile_image) {
    state.profile_image = profile_image
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
  SET_RESET(state) {
    state.id = null
    state.name = null
    state.email = null
    state.password = null
    state.nik = null
    state.date_of_birth = null
    state.phone_number = null
    state.is_admin = null
    // state.editedIndex = -1
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

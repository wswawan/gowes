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
  old_image: null,
  editedIndex: -1,
  users: [],
  alert: false,
  timeout: 10000,
  dialog: false,
  dialogAvatar: false,
  dialogProfile: false,
  dialogDelete: false,
  snackbar: false,
  color: 'success',
  error: [],
  success: '',
  loading: false,
  isProfile: false,
  token: null,
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
    await commit('SET_LOADING', state.loading)
    await this.$auth
      .loginWith('laravelSanctum', {
        data: {
          email: state.email,
          password: state.password,
        },
      })
      .then(() => {
        // location.reload()
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
    await commit('SET_LOADING', state.loading)
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
        this.$router.push('/login')
      })
      .catch((error) => {
        commit('SET_COLOR', 'error')
        commit('SET_TEXT_SUCCESS', null)
        commit('SET_TEXT_ERROR', error.response.data.errors)
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_LOADING', state.loading)
      })
  },

  updateProfileImage({ state, commit }) {
    const formData = new FormData()
    formData.append('profile_image', state.profile_image)
    formData.append('old_image', state.old_image)
    this.$axios.$get('/sanctum/csrf-cookie')
    this.$axios.$post('api/profile_image', formData).then((data) => {
      commit('SET_PROFILE_IMAGE')
      commit('SET_DIALOG_AVATAR', state.dialogAvatar)
      commit('SET_SNACKBAR', state.snackbar)
      commit('SET_TEXT_SUCCESS', 'Update Successful')
      const updateProfile = { ...this.$auth.user }
      updateProfile.profile_image = data
      this.$auth.setUser(updateProfile)
    })
  },

  async updateUser({ state, commit }) {
    await commit('SET_LOADING', state.loading)
    await this.$axios.$get('/sanctum/csrf-cookie')
    await this.$axios
      .$post('api/user/' + state.id, {
        name: state.name,
        email: state.email,
        nik: state.nik,
        phone_number: state.phone_number,
        date_of_birth: state.date_of_birth,
        is_admin: state.is_admin,
      })
      .then((data) => {
        if (state.dialog) {
          commit('SET_SAVE_USER', data)
          commit('SET_DIALOG', state.dialog)
        } else {
          commit('SET_DIALOG_PROFILE', state.dialogProfile)
          const updateProfile = { ...this.$auth.user }
          updateProfile.name = data.name
          updateProfile.email = data.email
          updateProfile.nik = data.nik
          updateProfile.phone_number = data.phone_number
          updateProfile.date_of_birth = data.date_of_birth
          this.$auth.setUser(updateProfile)
        }
        commit('SET_INDEX', -1)
        commit('SET_COLOR', 'teal darken-3')
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_TEXT_SUCCESS', 'Update Successful')
        commit('SET_LOADING', state.loading)
        commit('SET_RESET')
      })
      .catch((err) => {
        commit('SET_COLOR', 'error')
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_TEXT_ERROR', err.response.data.errors)
        commit('SET_LOADING', state.loading)
      })
  },

  async sendResetLink({ state, commit }) {
    await commit('SET_LOADING', state.loading)
    await this.$axios.$get('/sanctum/csrf-cookie')
    await this.$axios
      .$post('api/forgot-password', {
        email: state.email,
      })
      .then((data) => {
        commit('SET_COLOR', 'success')
        commit('SET_LOADING', state.loading)
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_TEXT_SUCCESS', data.status)
      })
      .catch((err) => {
        commit('SET_COLOR', 'error')
        commit('SET_LOADING', state.loading)
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_TEXT_ERROR', err.response.data.errors)
      })
  },

  async resetPassword({ state, commit }) {
    await commit('SET_LOADING', state.loading)
    await this.$axios.$get('/sanctum/csrf-cookie')
    await this.$axios
      .$post('/api/reset-password', {
        token: state.token,
        email: state.email,
        password: state.password,
      })
      .then(() => {
        commit('SET_COLOR', 'success')
        commit('SET_LOADING', state.loading)
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_TEXT_SUCCESS', 'Password reset successfull')
        this.$router.push('/login')
      })
      .catch((err) => {
        commit('SET_COLOR', 'error')
        commit('SET_LOADING', state.loading)
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_TEXT_ERROR', err.response.data.message)
      })
  },

  async updatePassword({ state, commit }) {
    await commit('SET_LOADING', state.loading)
    await this.$axios.$get('/sanctum/csrf-cookie')
    await this.$axios
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
  async deleteUser({ state, commit }) {
    await commit('SET_LOADING', state.loading)
    await this.$axios.$get('/sanctum/csrf-cookie')
    await this.$axios
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
  fillFormCart({ state, commit }) {
    commit('SET_IS_PROFILE', state.isProfile)
    commit('SET_NAME', state.isProfile ? this.$auth.user.name : '')
    commit('SET_EMAIL', state.isProfile ? this.$auth.user.email : '')
    commit(
      'SET_PHONE_NUMBER',
      state.isProfile ? this.$auth.user.phone_number : ''
    )
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
  SET_DATE_OF_BIRTH(state, date_of_birth) {
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
  SET_OLD_IMAGE(state, old_image) {
    state.old_image = old_image
  },
  SET_USERS(state, users) {
    state.users = users
  },

  SET_SAVE_USER(state, user) {
    if (state.editedIndex !== -1) {
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
    state.isProfile = false
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
  SET_DIALOG_AVATAR(state, dialogAvatar) {
    state.dialogAvatar = !dialogAvatar
  },
  SET_DIALOG_PROFILE(state, dialogProfile) {
    state.dialogProfile = !dialogProfile
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
  SET_IS_PROFILE(state, isProfile) {
    state.isProfile = !isProfile
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
}

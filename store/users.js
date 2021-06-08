/* eslint-disable camelcase */
/* eslint-disable no-console */
export const state = () => ({
  id: null,
  name: null,
  email: null,
  nik: null,
  date_of_birth: null,
  phone_number: null,
  editedIndex: -1,
  editedItem: {
    name: null,
    email: null,
    nik: null,
    phone_number: null,
    date_of_birth: null,
  },
  users: [],
  alert: false,
  timeout: 10000,
  color: 'success',
  error: [],
  success: '',
  roles: [
    {
      id: 1,
      name: 'Committee',
    },
    {
      id: 2,
      name: 'Participant',
    },
  ],
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
        email: 'dedrick26@example.org',
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
        // imageId: state.imageId,
      })
      .then(() => {
        commit('SET_ALERT', true)
        commit('SET_COLOR', 'success')
        commit('SET_TEXT_SUCCESS', 'Registration Successfull')
      })
      .catch((error) => {
        // console.error(error.response.data.errors)
        commit('SET_ALERT', true)
        commit('SET_COLOR', 'error')
        commit('SET_TEXT_SUCCESS', null)
        commit('SET_TEXT_ERROR', error.response.data.errors)
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
      })
      .then((data) => {
        commit('SET_UPDATE_USER', data)
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
  SET_IMAGE_ID(state, imageId) {
    state.imageId = imageId
  },

  SET_USERS(state, users) {
    state.users = users
  },

  SET_UPDATE_USER(state, user) {
    Object.assign(state.users[state.editedIndex], user)
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

  SET_ROLE(state, roles) {
    state.roles.name = roles
  },
}

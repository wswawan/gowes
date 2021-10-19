/* eslint-disable no-console */
export const state = () => ({
  events: [],
  id: null,
  title: null,
  description: null,
  price: null,
  imageUrl: null,
  oldImage: null,
  startDate: null,
  dialog: false,
  dialogImage: false,
  dialogDelete: false,
  editedIndex: -1,
  loading: false,
  snackbar: false,
  color: '',
  error: [],
  success: '',
  url: 'https://back.afalclo.id/storage/',
})

export const getters = {
  events(state) {
    return state.events
  },
  url(state) {
    return state.url
  },
}
export const actions = {
  async fetchEvents({ commit }) {
    const events = await this.$axios.$get('api/events')
    commit('SET_EVENTS', events)
  },

  async createEvent({ commit, state }) {
    await commit('SET_LOADING', state.loading)
    const formData = new FormData()
    formData.append('title', state.title)
    formData.append('description', state.description)
    formData.append('price', state.price)
    formData.append('image_url', state.imageUrl)
    formData.append('start_date', state.startDate)
    await this.$axios.$get('/sanctum/csrf-cookie')
    await this.$axios.$post('api/event', formData).then((data) => {
      commit('SET_SAVE_EVENT', data)
      commit('SET_DIALOG', state.dialog)
      commit('SET_LOADING', state.loading)
      commit('SET_SNACKBAR', state.snackbar)
      commit('SET_COLOR', 'teal darken-3')
      commit('SET_TEXT_SUCCESS', 'Create Event Successful')
      commit('SET_RESET_EVENT')
    })
  },
  async updateEvent({ commit, state }) {
    await commit('SET_LOADING', state.loading)
    await this.$axios.$get('/sanctum/csrf-cookie')
    await this.$axios
      .$put(`api/event/${state.id}`, {
        title: state.title,
        description: state.description,
        price: state.price,
        start_date: state.startDate,
      })
      .then((data) => {
        commit('SET_SAVE_EVENT', data)
        commit('SET_DIALOG', state.dialog)
        commit('SET_LOADING', state.loading)
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_COLOR', 'teal darken-3')
        commit('SET_TEXT_SUCCESS', 'Update Event Successfull')
        commit('SET_RESET_EVENT')
        if (localStorage.getItem('carts')) {
          const carts = JSON.parse(localStorage.getItem('carts'))
          const item = carts.find((item) => item.id === data.id)
          item.price = Number(data.price)
          Object.assign(carts.id === item.id, item)
          localStorage.setItem('carts', JSON.stringify(carts))
          console.log(carts)
        }
      })
  },
  async updateImage({ commit, state }) {
    await commit('SET_LOADING', state.loading)
    await this.$axios.$get('/sanctum/csrf-cookie')
    const formData = new FormData()
    formData.append('old_image', state.oldImage)
    formData.append('image_url', state.imageUrl)
    await this.$axios
      .$post(`api/update_image/${state.id}`, formData)
      .then((data) => {
        commit('SET_SAVE_EVENT', data)
        commit('SET_LOADING', state.loading)
        commit('SET_DIALOG_IMAGE', state.dialogImage)
        commit('SET_INDEX', -1)
        commit('SET_ID', null)
        commit('SET_IMAGE_URL', null)
        commit('SET_COLOR', 'teal darken-3')
        commit('SET_SNACKBAR', state.snackbar)
        commit('SET_TEXT_SUCCESS', 'Update Image Successfull')
      })
  },
  async deleteEvent({ commit, state }) {
    await commit('SET_LOADING', state.loading)
    this.$axios.$get('/sanctum/csrf-cookie')
    await this.$axios.$delete(`api/event/${state.id}`).then(() => {
      commit('SET_DELETE_EVENT')
      commit('SET_INDEX', -1)
      commit('SET_DIALOG_DELETE', state.dialogDelete)
      commit('SET_LOADING', state.loading)
      commit('SET_SNACKBAR', state.snackbar)
      commit('SET_COLOR', 'teal darken-3')
      commit('SET_TEXT_SUCCESS', 'Delete Successful')
    })
  },
}
export const mutations = {
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_ID(state, id) {
    state.id = id
  },
  SET_TITLE(state, title) {
    state.title = title
  },
  SET_DESCRIPTION(state, description) {
    state.description = description
  },
  SET_PRICE(state, price) {
    state.price = price
  },
  SET_IMAGE_URL(state, imageUrl) {
    state.imageUrl = imageUrl
  },
  SET_OLD_IMAGE(state, oldImage) {
    state.oldImage = oldImage
  },
  SET_START_DATE(state, startDate) {
    state.startDate = startDate
  },
  SET_SAVE_EVENT(state, event) {
    if (state.editedIndex !== -1) {
      Object.assign(state.events[state.editedIndex], event)
    } else {
      state.events.unshift(event)
    }
  },
  SET_INDEX(state, editedIndex) {
    state.editedIndex = editedIndex
  },

  SET_RESET_EVENT(state) {
    state.id = null
    state.title = null
    state.description = null
    state.price = null
    state.startDate = null
    state.imageUrl = null
    state.editedIndex = -1
  },

  SET_DELETE_EVENT(state) {
    state.events.splice(state.editedIndex, 1)
  },

  SET_DIALOG(state, dialog) {
    state.dialog = !dialog
  },

  SET_DIALOG_IMAGE(state, dialogImage) {
    state.dialogImage = !dialogImage
  },

  SET_DIALOG_DELETE(state, dialogDelete) {
    state.dialogDelete = !dialogDelete
  },
  SET_LOADING(state, loading) {
    state.loading = !loading
  },

  SET_COLOR(state, color) {
    state.color = color
  },
  SET_SNACKBAR(state, snackbar) {
    state.snackbar = !snackbar
  },
  SET_TEXT_ERROR(state, error) {
    state.error = error
  },

  SET_TEXT_SUCCESS(state, success) {
    state.success = success
  },
}

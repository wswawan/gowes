/* eslint-disable no-console */
export const state = () => ({
  carts: [],
  amount: null,
  countCart: null,
  paymentList: [],
  payment: null,
})

export const getters = {
  carts(state) {
    return state.carts
  },
  amount(state) {
    return state.carts
      .map((item) => item.qty * item.price)
      .reduce((a, b) => a + b, 0)
  },
  countCart(state) {
    return state.countCart
  },
}

export const actions = {
  fetchCart({ commit }, item) {
    if (localStorage.getItem('carts')) {
      commit('SET_CART', JSON.parse(localStorage.getItem('carts')))
    } else {
      commit('SET_CART', item)
    }
  },
  addToCart({ state, commit, dispatch }, item) {
    const addedItem = state.carts.find((product) => product.id === item.id)
    if (addedItem) {
      commit('SET_INCREAS_QTY', item)
    } else {
      const itemCart = {
        id: item.id,
        title: item.title,
        price: item.price,
        img: item.image_url,
        qty: 1,
      }
      commit('SET_SAVE_CART', itemCart)
      localStorage.setItem('carts', JSON.stringify(state.carts))
    }
    dispatch('countCarts')
  },
  countCarts({ commit }) {
    if (localStorage.getItem('carts')) {
      commit('SET_COUNT_CART', JSON.parse(localStorage.getItem('carts')).length)
    } else {
      commit('SET_COUNT_CART', null)
    }
  },
  async dataBank({ commit }) {
    await this.$axios.$get('/api/listbank').then((response) => {
      commit('SET_PAYMENT_LIST', response.data)
    })
  },
}

export const mutations = {
  SET_PAYMENT_LIST(state, paymentList) {
    state.paymentList = paymentList
  },
  SET_PAYMENT(state, payment) {
    state.payment = payment
  },
  SET_COUNT_CART(state, item) {
    state.countCart = item
  },
  SET_CART(state, carts) {
    state.carts = carts
  },
  SET_SAVE_CART(state, item) {
    state.carts.unshift(item)
  },
  SET_QTY(state, item) {
    const currentItem = state.carts.find((product) => product.id === item.id)
    currentItem.qty = item.qty
  },
  SET_INCREAS_QTY(state, item) {
    const addedItem = state.carts.find((product) => product.id === item.id)
    addedItem.qty++
    localStorage.setItem('carts', JSON.stringify(state.carts))
  },
  SET_DECREAS_QTY(state, item) {
    const currentItem = state.carts.find((product) => product.id === item.id)
    if (currentItem.qty > 1) {
      currentItem.qty--
    } else {
      state.carts = state.carts.filter((product) => product.id !== item.id)
    }
    localStorage.setItem('carts', JSON.stringify(state.carts))
  },
}

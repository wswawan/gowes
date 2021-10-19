/* eslint-disable no-console */
export const state = () => ({
  carts: [],
  amount: null,
  countCart: null,
  paymentList: [],
  payment: null,
  discount: 0,
  order: [],
  orders: [],
  loading: false,
  instructions: [],
  snackbar: false,
  error: null,
  success: null,
  color: 'success',
})

export const getters = {
  carts(state) {
    return state.carts
  },
  amount(state) {
    return state.carts
      .map((item) => item.quantity * item.price)
      .reduce((a, b) => a + b, 0)
  },
  countCart(state) {
    return state.countCart
  },
  order(state) {
    return state.order
  },
  orders(state) {
    return state.orders
  },
  instructions(state) {
    return state.instructions
  },
}

export const actions = {
  fetchCart({ commit }, item) {
    if (localStorage.getItem('carts')) {
      commit('SET_CART', JSON.parse(localStorage.getItem('carts')))
      commit('SET_AMOUNT', Number(localStorage.getItem('amount')))
    } else {
      commit('SET_CART', item)
    }
  },
  addToCart({ commit, dispatch, getters }, item) {
    commit('SET_SAVE_CART', item)
    commit('SET_AMOUNT', getters.amount)
    commit('SET_PAYMENT_LIST', JSON.parse(localStorage.getItem('paymentlist')))
    dispatch('countCarts')
  },
  countCarts({ commit }) {
    if (localStorage.getItem('carts')) {
      commit('SET_COUNT_CART', JSON.parse(localStorage.getItem('carts')).length)
    } else {
      commit('SET_COUNT_CART', null)
    }
  },
  increaseQty({ commit, getters, dispatch }, item) {
    commit('SET_INCREAS_QTY', item)
    commit('SET_AMOUNT', getters.amount)
    dispatch('countCarts')
  },
  decreaseQty({ commit, getters, dispatch }, item) {
    commit('SET_DECREAS_QTY', item)
    commit('SET_AMOUNT', getters.amount)
    dispatch('countCarts')
  },
  async dataBank({ commit }) {
    await this.$axios.$get('/api/listbank').then((response) => {
      if (localStorage.getItem('paymentlist')) {
        commit(
          'SET_PAYMENT_LIST',
          JSON.parse(localStorage.getItem('paymentlist'))
        )
      } else {
        commit(
          'SET_PAYMENT_LIST',
          localStorage.setItem('paymentlist', JSON.stringify(response.data))
        )
      }
    })
  },
  async submitOrder({ state, rootState, commit }) {
    await commit('SET_LOADING', state.loading)
    await this.$axios.$get('/sanctum/csrf-cookie')
    await this.$axios
      .$post('/api/order', {
        amount: state.amount,
        discount: state.discount,
        payment: state.payment,
        customer: {
          name: rootState.users.name,
          email: rootState.users.email,
          phone_number: rootState.users.phone_number,
        },
        items: state.carts,
      })
      .then((data) => {
        console.log(data)
        commit('SET_SAVE_ORDERS', data)
        commit('SET_COLOR', 'success')
        commit('SET_TEXT_SUCCESS', 'Successful Order')
        commit('SET_SNACKBAR', this.snackbar)
        commit('SET_LOADING', state.loading)
        this.$router.push(`/order/${data.orderRef}`)
      })
      .catch(() => {
        commit('SET_COLOR', 'error')
        commit(
          'SET_TEXT_ERROR',
          'Please check your connection and refresh this page'
        )
        commit('SET_SNACKBAR', this.snackbar)
        commit('SET_LOADING', state.loading)
      })
  },
  async myOrder({ commit }) {
    await this.$axios.$get('/sanctum/csrf-cookie')
    await this.$axios
      .$get('/api/my_order')
      .then((data) => {
        commit('SET_ORDERS', data)
      })
      .catch((err) => console.log(err.response.data.message))
  },
}

export const mutations = {
  SET_AMOUNT(state, amount) {
    state.amount = amount
    localStorage.setItem('amount', state.amount)
  },
  SET_PAYMENT_LIST(state, paymentList) {
    state.paymentList = paymentList
  },
  SET_PAYMENT(state, payment) {
    state.payment = payment
  },
  SET_DISCOUNT(state, discount) {
    state.discount = discount
  },
  SET_COUNT_CART(state, cart) {
    state.countCart = cart
  },
  SET_CART(state, carts) {
    state.carts = carts
  },
  SET_SAVE_CART(state, item) {
    const addedItem = state.carts.find((product) => product.sku === item.id)
    if (addedItem) {
      addedItem.quantity++
    } else {
      const itemCart = {
        sku: item.id,
        name: item.title,
        price: item.price,
        img: item.image_url,
        quantity: 1,
      }
      state.carts.unshift(itemCart)
    }
    localStorage.setItem('carts', JSON.stringify(state.carts))
  },
  SET_QTY(state, item) {
    const currentItem = state.carts.find((product) => product.sku === item.sku)
    currentItem.quantity = item.quantity
  },
  SET_INCREAS_QTY(state, item) {
    const addedItem = state.carts.find((product) => product.sku === item.sku)
    addedItem.quantity++
    localStorage.setItem('carts', JSON.stringify(state.carts))
  },
  SET_DECREAS_QTY(state, item) {
    const currentItem = state.carts.find((product) => product.sku === item.sku)
    if (currentItem.quantity > 1) {
      currentItem.quantity--
    } else {
      state.carts = state.carts.filter((product) => product.sku !== item.sku)
    }
    localStorage.setItem('carts', JSON.stringify(state.carts))
  },
  SET_ORDER(state, order) {
    state.order = order
  },
  SET_ORDERS(state, orders) {
    state.orders = orders
  },
  SET_SAVE_ORDERS(state, item) {
    state.orders.unshift(item)
  },
  SET_INSTRUCTIONS(state, instructions) {
    state.instructions = instructions
  },
  SET_LOADING(state, loading) {
    state.loading = !loading
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

  SET_COLOR(state, color) {
    state.color = color
  },
}

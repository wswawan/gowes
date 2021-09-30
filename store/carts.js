export const state = () => ({
  carts: [],
})

export const getters = {
  carts(state) {
    return state.carts
  },
}

export const actions = {}

export const mutations = {
  SET_SAVE_CART(state, item) {
    state.carts.push(item)
  },
}

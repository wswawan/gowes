/* eslint-disable no-console */
export const state = () => ({
  form: {
    email: 'wawansumardi@outlook.com',
    password: 'password',
  },
})

export const mutations = {
  async login(state) {
    await this.$auth.loginWith('laravelSanctum', {
      data: state.form,
    })
  },

  async logout() {
    try {
      await this.$auth.logout()
    } catch (error) {
      console.log(error)
    }
  },
}

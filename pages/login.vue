<template>
  <v-layout fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" md="4" sm="4">
        <v-btn icon x-large to="home"><v-icon>mdi-home-outline</v-icon></v-btn>
        <v-card-text class="pa-0">
          <v-card-title class="display-1">Welcome!</v-card-title>
          <v-card-subtitle>Sign in to continue</v-card-subtitle>
        </v-card-text>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              :rules="rules.email"
              label="Email"
              :value="email"
              @input="SET_EMAIL"
            ></v-text-field>
            <v-text-field
              label="Password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              :rules="rules.password"
              :value="password"
              @click:append="show = !show"
              @input="SET_PASSWORD"
              @keypress.enter="submitLogin"
            ></v-text-field>
            <v-snackbar :value="snackbar" timeout="4000" :color="color">
              <v-btn text small><v-icon>mdi-information-outline</v-icon></v-btn>
              <span v-if="success">
                {{ success }}
              </span>
              <span v-else>
                {{ error }}
              </span>
            </v-snackbar>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-row dense justify="center">
            <v-col cols="12" class="text-center">
              <v-btn
                color="indigo darken-3"
                width="250"
                :loading="loading"
                @click="submitLogin"
                >login</v-btn
              >
            </v-col>
            <v-col align-self="center" class="text-center">
              <v-btn text class="text-capitalize caption"
                >Forgot Password?</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
        <v-card-text>
          <v-row justify="center" dense>
            <v-col align-self="center" cols="5">
              <v-divider></v-divider>
            </v-col>
            <v-col align-self="center" cols="2" class="text-center">or</v-col>
            <v-col align-self="center" cols="5">
              <v-divider></v-divider>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text class="pa-0">
          <v-card-subtitle class="caption"
            >Don't have an account?
            <v-btn
              text
              class="text-capitalize caption"
              color="primary"
              to="register"
              >signup</v-btn
            ></v-card-subtitle
          >
        </v-card-text>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
/* eslint-disable no-console */
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  middleware: ['guest'],
  data: () => ({
    valid: true,
    show: false,
    rules: {
      email: [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: [
        (v) => !!v || 'Password is required',
        (v) => (v && v.length >= 6) || 'Password must be 6 characters or more',
      ],
    },
  }),
  computed: {
    ...mapState('users', [
      'email',
      'password',
      'loading',
      'snackbar',
      'snackbar',
      'color',
      'success',
      'error',
    ]),
  },
  watch: {
    snackbar(val) {
      val &&
        setTimeout(
          () => this.$store.commit('users/SET_SNACKBAR', this.snackbar),
          4200
        )
    },
  },
  methods: {
    ...mapActions({
      login: 'users/login',
    }),
    ...mapMutations('users', ['SET_EMAIL', 'SET_PASSWORD']),
    submitLogin() {
      if (this.$refs.form.validate()) {
        // this.$store.commit('users/SET_LOADING', this.loading)
        // setTimeout(() => {
        this.login()
          .then(() => {
            this.$refs.form.resetValidation()
          })
          .catch((error) => {
            console.log(error)
          })
        // }, 1000)
      }
    },
  },
}
</script>

<style></style>

<template>
  <v-layout fill-height align-center>
    <v-row justify="center">
      <v-col cols="12" md="6" sm="8">
        <v-row justify="center" class="pa-8">
          <v-img
            src="https://i.graphicmama.com/blog/wp-content/uploads/2020/10/30131032/P-amazing-3D-logo-design-concept-in-20211.jpg"
            alt="John"
            max-height="100"
            max-width="100"
            class="rounded-circle"
          />
        </v-row>
        <v-card>
          <v-toolbar dense color="grey darken-2">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
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
              ></v-text-field>
              <v-card-actions class="pa-0">
                <v-row class="caption align-center">
                  <v-btn
                    to="register"
                    text
                    small
                    color="teal"
                    class="text-capitalize"
                    >Register</v-btn
                  >
                  <!-- <span>Or</span>
                  <v-btn
                    to="register"
                    text
                    small
                    color="teal"
                    class="text-capitalize"
                    >reset password</v-btn
                  > -->
                </v-row>
                <v-spacer></v-spacer>
                <v-btn
                  color="teal darken-3"
                  class="mx-center"
                  :disabled="!valid"
                  :loading="loading"
                  @click.prevent="submitLogin"
                  >Submit</v-btn
                >
              </v-card-actions>
              <v-snackbar :value="snackbar" timeout="4000" :color="color">
                <v-btn text small
                  ><v-icon>mdi-information-outline</v-icon></v-btn
                >
                <span v-if="success">
                  {{ success }}
                </span>
                <span v-else>
                  {{ error }}
                </span>
                <!-- <div v-else>
                  <ul v-for="(item, i) in error" :key="i">
                    <li>{{ item[0] }}</li>
                  </ul>
                </div> -->

                <!-- <template #action="{ attrs }">
          <v-btn
            color="black"
            text
            v-bind="attrs"
            @click="SET_SNACKBAR(snackbar)"
          >
            Close
          </v-btn>
        </template> -->
              </v-snackbar>
            </v-form>
          </v-card-text>
        </v-card>
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
        this.$store.commit('users/SET_LOADING', this.loading)
        setTimeout(() => {
          this.login()
            .then(() => {
              this.$refs.form.resetValidation()
            })
            .catch((error) => {
              console.log(error)
            })
        }, 1000)
      }
    },
  },
}
</script>

<style></style>

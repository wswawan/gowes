<template>
  <v-layout fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" md="4" sm="4">
        <v-btn icon x-large to="home"><v-icon>mdi-home-outline</v-icon></v-btn>
        <v-card-text class="pa-0">
          <v-card-title class="display-1">Hi!</v-card-title>
          <v-card-subtitle>Create a new account</v-card-subtitle>
        </v-card-text>
        <v-card-text>
          <v-alert :value="alert" :color="color" dense border="top">
            <div v-for="(items, index) in error" :key="index">
              <v-list-item-subtitle v-for="(item, id) in items" :key="id">{{
                item
              }}</v-list-item-subtitle>
            </div>
            {{ success }}
          </v-alert>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              :value="name"
              :rules="rules.name"
              label="Name"
              required
              @input="SET_NAME"
            ></v-text-field>
            <v-text-field
              :value="email"
              label="Email"
              :rules="rules.email"
              required
              @input="SET_EMAIL"
            ></v-text-field>
            <v-text-field
              :value="password"
              :rules="rules.password"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              label="Password"
              @click:append="show = !show"
              @input="SET_PASSWORD"
            ></v-text-field>
            <v-text-field
              v-model="passwordConfirm"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              :rules="[
                (v) => !!v || 'Password confirmation is required',
                (v) => v === password || 'Password doesn\'t match',
              ]"
              label="Confirm Password"
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-row dense justify="center">
            <v-col cols="12" class="text-center">
              <v-btn
                :loading="loading"
                color="indigo darken-3"
                width="250"
                @click="submitUser"
                >sign up</v-btn
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
            >Already have an account?
            <v-btn
              text
              class="text-capitalize caption"
              color="primary"
              to="login"
              >sign in</v-btn
            ></v-card-subtitle
          >
        </v-card-text>
      </v-col>
    </v-row>
    <v-snackbar :value="snackbar" timeout="4000" :color="color">
      <v-btn v-if="success" text small
        ><v-icon>mdi-information-outline</v-icon></v-btn
      >
      <span v-if="success">
        {{ success }}
      </span>
      <div v-else>
        <ul v-for="(item, i) in error" :key="i">
          <li>{{ item[0] }}</li>
        </ul>
      </div>
    </v-snackbar>
  </v-layout>
</template>

<script>
/* eslint-disable no-console */

import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  middleware: ['guest'],
  data: () => ({
    valid: true,
    menu: false,
    activePicker: null,
    passwordConfirm: null,
    show: false,
    show1: false,
    rules: {
      name: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length >= 3) || 'Name must be 3 characters or more',
      ],
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
      'name',
      'email',
      'password',
      'alert',
      'color',
      'error',
      'success',
      'loading',
      'snackbar',
    ]),
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
    snackbar(val) {
      val &&
        setTimeout(
          () => this.$store.commit('users/SET_SNACKBAR', this.snackbar),
          4500
        )
    },
  },
  methods: {
    submitUser() {
      if (this.$refs.form.validate()) {
        this.register().then(() => {
          this.$refs.form.resetValidation()
          this.$refs.form.reset()
        })
      }
    },
    ...mapActions({
      register: 'users/register',
    }),
    ...mapMutations('users', [
      'SET_NAME',
      'SET_EMAIL',
      'SET_PASSWORD',
      'SET_ALERT',
    ]),
    save(birthday) {
      this.$refs.menu.save(birthday)
    },
  },
}
</script>
<style></style>

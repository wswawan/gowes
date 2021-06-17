<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="6" sm="8">
      <v-card>
        <v-toolbar dense color="grey darken-2">
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <!-- <v-card-text v-if="alert"> </v-card-text> -->
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
              type="number"
              :value="phone_number"
              label="Phone Number"
              :rules="rules.phoneNumber"
              required
              @input="SET_PHONE_NUMBER"
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
            <v-text-field
              :value="nik"
              :rules="rules.nik"
              label="NIK"
              required
              @input="SET_NIK"
            ></v-text-field>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  :value="date_of_birth"
                  :rules="rules.birthday"
                  readonly
                  label="Birthday date"
                  prepend-inner-icon="mdi-calendar"
                  required
                  v-bind="attrs"
                  v-on="on"
                  @input="SET_BIRTHDAY"
                ></v-text-field>
              </template>
              <v-date-picker
                :value="date_of_birth"
                :active-picker.sync="activePicker"
                max="2014-12-31"
                required
                @input="SET_BIRTHDAY"
                @change="save"
              ></v-date-picker>
            </v-menu>
            <!-- <v-file-input
              :value="imageId"
              label="Input your id card here"
              name="imageId"
              @change="SET_IMAGE_ID"
            ></v-file-input> -->
            <v-card-actions>
              <span class="caption align-center">
                Have an Account ?
                <v-btn text to="/" class="text-capitalize" small>Login</v-btn>
              </span>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!valid"
                :loading="loading"
                color="teal darken-3"
                class="mx-center"
                @click.prevent="submitUser"
                >Submit</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
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
    </v-col>
  </v-row>
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
      phoneNumber: [
        (v) => !!v || 'Phone number is required',
        (v) =>
          Number.isInteger(Number(v)) || 'The value must be an integer number',
      ],
      nik: [
        (v) => !!v || 'NIK is required',
        (v) =>
          Number.isInteger(Number(v)) || 'The value must be an integer number',
      ],
      birthday: [(v) => !!v || 'Birthday date is required'],
    },
  }),
  computed: {
    ...mapState('users', [
      'name',
      'email',
      'password',
      'nik',
      'phone_number',
      'date_of_birth',
      'imageId',
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
        this.$store.commit('users/SET_LOADING', this.loading)
        setTimeout(() => {
          this.register().then(() => {
            this.$refs.form.resetValidation()
            this.$refs.form.reset()
          })
        }, 1000)
      }
    },
    ...mapActions({
      register: 'users/register',
    }),
    ...mapMutations('users', [
      'SET_NAME',
      'SET_EMAIL',
      'SET_PASSWORD',
      'SET_PHONE_NUMBER',
      'SET_NIK',
      'SET_BIRTHDAY',
      'SET_IMAGE_ID',
      'SET_ALERT',
    ]),
    save(birthday) {
      this.$refs.menu.save(birthday)
    },
  },
}
</script>

<style></style>

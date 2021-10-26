<template>
  <v-row justify="center">
    <v-col cols="12" sm="8">
      <GuestHeader title="Reset Password!" />
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-text>
          <v-text-field
            label="Fill Email Address"
            :rules="rules.email"
            @change="SET_EMAIL"
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
        </v-card-text>

        <v-card-actions>
          <v-btn
            block
            color="indigo darken-3"
            :loading="loading"
            @click="submitReset"
            >submit</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-col>
    <v-snackbar :value="snackbar" timeout="4000" :color="color">
      <v-btn v-if="success" text small
        ><v-icon>mdi-information-outline</v-icon></v-btn
      >
      <span v-if="success">
        {{ success }}
      </span>
      <div v-else>
        <span>{{ error }}</span>
      </div>
    </v-snackbar>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  middleware: 'guest',
  data: () => ({
    valid: true,
    passwordConfirm: null,
    show: false,
    show1: false,
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
      'snackbar',
      'loading',
      'error',
      'success',
      'color',
    ]),
  },
  watch: {
    snackbar(val) {
      val &&
        setTimeout(
          () => this.$store.commit('users/SET_SNACKBAR', this.snackbar),
          4500
        )
    },
  },
  created() {
    this.setToken()
  },
  methods: {
    setToken() {
      return this.$store.commit('users/SET_TOKEN', this.$route.query.token)
    },
    ...mapMutations('users', ['SET_EMAIL', 'SET_PASSWORD']),
    submitReset() {
      if (this.$refs.form.validate()) {
        this.resetPassword()
      }
    },
    ...mapActions({
      resetPassword: 'users/resetPassword',
    }),
  },
}
</script>

<style></style>

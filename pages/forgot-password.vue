<template>
  <v-row justify="center">
    <v-col cols="12" md="6">
      <v-btn icon x-large to="home"><v-icon>mdi-home-outline</v-icon></v-btn>
      <v-card-text class="pa-0">
        <v-card-title class="display-1">Hi!</v-card-title>
        <v-card-subtitle>Forgot Password?</v-card-subtitle>
      </v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-text>
          <v-text-field
            label="Fill Email Address"
            :rules="rules.email"
            @change="SET_EMAIL"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn
            block
            color="indigo darken-3"
            :loading="loading"
            @click="submitForgot"
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
        <ul v-for="(item, i) in error" :key="i">
          <li>{{ item[0] }}</li>
        </ul>
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
    rules: {
      email: [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    },
  }),
  computed: {
    ...mapState('users', [
      'email',
      'snackbar',
      'loading',
      'error',
      'success',
      'color',
      'token',
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
  methods: {
    ...mapMutations('users', ['SET_EMAIL']),
    submitForgot() {
      if (this.$refs.form.validate()) {
        this.sendResetLink()
      }
    },
    ...mapActions({
      sendResetLink: 'users/sendResetLink',
    }),
  },
}
</script>

<style></style>

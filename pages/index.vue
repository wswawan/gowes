<template>
  <v-layout fill-height align-center>
    <v-row justify="center">
      <v-col cols="12" md="6" sm="8">
        <v-card>
          <v-toolbar dense color="grey darken-2">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field label="Email"></v-text-field>
              <v-text-field label="Password"></v-text-field>
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
                  <span>Or</span>
                  <v-btn
                    to="register"
                    text
                    small
                    color="teal"
                    class="text-capitalize"
                    >reset password</v-btn
                  >
                </v-row>
                <v-spacer></v-spacer>
                <v-btn color="teal darken-3" class="mx-center" @click="login()"
                  >Submit</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  middleware: ['guest'],
  data() {
    return {
      form: {
        email: 'farrell.reid@example.org',
        password: 'password',
      },
    }
  },
  methods: {
    ...mapActions({
      login: 'users/login',
    }),
  },
}
</script>

<style></style>

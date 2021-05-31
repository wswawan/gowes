<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="6" sm="8">
      <v-card>
        <v-toolbar dense color="grey darken-2">
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field label="Email"></v-text-field>
            <v-text-field label="Password"></v-text-field>
            <v-card-actions>
              <span class="caption align-center">
                Have an Account ?
                <v-btn text to="login" class="text-capitalize" small
                  >Login</v-btn
                >
              </span>
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
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  middleware: ['guest'],
  data() {
    return {
      form: {
        email: 'wawansumardi@outlook.com',
        password: 'password',
      },
    }
  },
  methods: {
    ...mapMutations({
      login: 'users/login',
    }),
  },
}
</script>

<style></style>

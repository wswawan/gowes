<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-dialog :value="dialog" persistent>
            <template #activator="{ on, attrs }">
              <v-btn
                color="teal darken-3"
                small
                v-bind="attrs"
                v-on="on"
                @click="SET_DIALOG(dialog)"
                >edit</v-btn
              >
            </template>
            <v-card>
              <v-toolbar dense color="grey darken-3">
                <v-toolbar-title>Update Profile</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn small @click="close">back</v-btn>
              </v-toolbar>
              <v-card-text class="pa-2">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    :value="password"
                    :rules="[
                      (v) => !!v || 'Current password is required',
                      (v) =>
                        (v && v.length >= 6) ||
                        'Current password must be 6 characters or more',
                    ]"
                    :type="show ? 'text' : 'password'"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    label="Current Password"
                    required
                    @click:append="show = !show"
                    @input="SET_PASSWORD"
                  ></v-text-field>
                  <v-text-field
                    :value="new_password"
                    :rules="[
                      (v) => !!v || 'Password is required',
                      (v) =>
                        (v && v.length >= 6) ||
                        'Password must be 6 characters or more',
                    ]"
                    :type="show1 ? 'text' : 'password'"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    label="New Password"
                    required
                    @click:append="show1 = !show1"
                    @input="SET_NEW_PASSWORD"
                  ></v-text-field>
                  <v-text-field
                    v-model="confirm_password"
                    :rules="[
                      (v) => !!v || 'Password confirmation is required',
                      (v) =>
                        (v && v === new_password) ||
                        'Password confirmation doesn\'t match',
                    ]"
                    :type="show2 ? 'text' : 'password'"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    label="Confirm Password"
                    @click:append="show2 = !show2"
                  ></v-text-field>
                </v-form>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    :disabled="!valid"
                    :loading="loading"
                    color="teal darken-3"
                    small
                    class="mx-auto"
                    @click="submitPassword"
                    >submit</v-btn
                  >
                </v-card-actions>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-card-actions>
        <v-divider class="pb-2"></v-divider>
        <!-- <v-img
          class="rounded-lg mx-auto"
          width="250"
          height="250"
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        ></v-img> -->
        <v-card-text>
          <h1 class="display-1 text-center text-uppercase teal pa-2">
            {{ $auth.user.uuid }}
          </h1>
        </v-card-text>

        <v-card-title class="justify-center">
          {{ $auth.user.name }}
          <v-icon color="green lighten-1">mdi-check-all</v-icon>
        </v-card-title>
        <v-card-subtitle class="text-center">
          <v-chip color="teal lighten-2" small>{{
            $auth.user.date_of_birth
          }}</v-chip>
        </v-card-subtitle>
        <v-card-text class="text-center">
          <div>{{ $auth.user.email }}</div>
          <div>{{ $auth.user.phone_number }}</div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-snackbar :value="snackbar" timeout="4000" :color="color">
      <v-btn text small><v-icon>mdi-information-outline</v-icon></v-btn>
      <span v-if="success">
        {{ success }}
      </span>
      <span v-else>
        {{ error }}
      </span>
    </v-snackbar>
  </v-row>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  middleware: 'auth',
  data: () => ({
    form: null,
    valid: true,
    confirm_password: null,
    show: false,
    show1: false,
    show2: false,
  }),
  computed: {
    ...mapState('users', [
      'password',
      'new_password',
      'loading',
      'dialog',
      'snackbar',
      'color',
      'error',
      'success',
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
    ...mapActions({
      updatePassword: 'users/updatePassword',
    }),
    ...mapMutations('users', [
      'SET_PASSWORD',
      'SET_NEW_PASSWORD',
      'SET_DIALOG',
    ]),
    submitPassword() {
      this.$store.commit('users/SET_LOADING', this.loading)
      setTimeout(() => {
        this.updatePassword()
      }, 1000)
    },
    close() {
      this.$store.commit('users/SET_DIALOG', this.dialog)
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },
  },
}
</script>

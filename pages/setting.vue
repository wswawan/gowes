<template>
  <v-layout>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" class="pa-0">
        <v-card light rounded="0">
          <v-card-title>Setting</v-card-title>
          <v-list-item>
            <v-list-item-avatar size="60">
              <v-dialog v-model="avatar">
                <template #activator="{ on, attrs }">
                  <v-img
                    v-bind="attrs"
                    src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                    alt="user"
                    v-on="on"
                  />
                </template>
                <v-card>
                  <v-toolbar dense>
                    <v-toolbar-title>Change Image</v-toolbar-title>
                  </v-toolbar>
                  <v-card-actions>
                    <v-file-input
                      label="Select Image"
                      show-size
                      :value="profile_image"
                      @change="SET_PROFILE_IMAGE"
                    ></v-file-input>
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn block color="indigo" @click="updateProfileImage"
                      >submit</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle>Hello</v-list-item-subtitle>
              <v-list-item-title>{{ $auth.user.name }}</v-list-item-title>
            </v-list-item-content>
            <v-card-actions>
              <v-btn x-small fab outlined><v-icon>mdi-pencil</v-icon></v-btn>
            </v-card-actions>
          </v-list-item>
        </v-card>
        <v-card rounded="0" color="transparent">
          <v-list>
            <v-list-item-group>
              <v-list-item>
                <v-list-item-subtitle>My Order</v-list-item-subtitle>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-dialog :value="dialog" width="500" persistent>
                  <template #activator="{ on, attrs }">
                    <v-list-item-subtitle
                      v-bind="attrs"
                      v-on="on"
                      @click="SET_DIALOG(dialog)"
                      >Change Password</v-list-item-subtitle
                    >
                  </template>
                  <v-card>
                    <v-toolbar dense color="grey darken-3">
                      <v-toolbar-title>Change Password</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn small @click="close">back</v-btn>
                    </v-toolbar>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-card-text class="px-4">
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
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          :disabled="!valid"
                          :loading="loading"
                          color="indigo"
                          block
                          class="mx-auto"
                          @click="submitPassword"
                          >submit</v-btn
                        >
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item
                href="https://wa.me/6285789913771?text=Halo,%20Would%20You%20Like%20to%20join%20us%3F"
                target="__blank"
              >
                <v-list-item-subtitle>
                  <v-icon small color="success">mdi-whatsapp</v-icon>
                  Support</v-list-item-subtitle
                >
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
        <v-card class="mt-1">
          <v-list dense>
            <v-list-item
              ><v-btn text x-small color="red darken-2" class="pl-0"
                >sign out</v-btn
              ></v-list-item
            >
          </v-list>
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
  </v-layout>
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
    avatar: false,
  }),
  computed: {
    ...mapState('users', [
      'password',
      'new_password',
      'profile_image',
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
      updateProfileImage: 'users/updateProfileImage',
    }),
    ...mapMutations('users', [
      'SET_PASSWORD',
      'SET_NEW_PASSWORD',
      'SET_PROFILE_IMAGE',
      'SET_DIALOG',
    ]),
    submitPassword() {
      if (this.$refs.form.validate()) {
        this.$store.commit('users/SET_LOADING', this.loading)
        setTimeout(() => {
          this.updatePassword()
        }, 1000)
      }
    },
    close() {
      this.$store.commit('users/SET_DIALOG', this.dialog)
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },
  },
}
</script>

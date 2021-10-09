<template>
  <v-layout>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" class="pa-0">
        <v-card light rounded="0">
          <v-card-title>Setting</v-card-title>
          <v-list-item>
            <v-dialog :value="dialogAvatar" persistent width="500">
              <template #activator="{ on, attrs }">
                <v-list-item-avatar
                  size="60"
                  v-bind="attrs"
                  v-on="on"
                  @click="editedAvatar"
                >
                  <v-img
                    :src="
                      $auth.user.profile_image
                        ? `http://biker.test/storage/${$auth.user.profile_image.slice(
                            7
                          )}`
                        : ''
                    "
                    alt="user"
                  />
                </v-list-item-avatar>
              </template>
              <v-card>
                <v-toolbar dense color="grey darken-3">
                  <v-toolbar-title>Change Image</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn small @click="close">back</v-btn>
                </v-toolbar>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-card-actions>
                    <v-file-input
                      label="Select Image"
                      show-size
                      accept="image/*"
                      :rules="[(v) => !!v || 'File is required']"
                      :value="profile_image"
                      @change="SET_PROFILE_IMAGE"
                    ></v-file-input>
                  </v-card-actions>
                </v-form>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn
                    :loading="loading"
                    block
                    color="indigo"
                    @click.prevent="updateProfileImg"
                    >submit</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-list-item-content>
              <v-list-item-subtitle>Hello</v-list-item-subtitle>
              <v-list-item-title>{{ $auth.user.name }}</v-list-item-title>
            </v-list-item-content>
            <v-card-actions>
              <v-dialog :value="dialogProfile" persistent width="500">
                <template #activator="{ on, attrs }">
                  <v-btn
                    x-small
                    fab
                    outlined
                    v-bind="attrs"
                    v-on="on"
                    @click="editedItem"
                    ><v-icon>mdi-pencil</v-icon></v-btn
                  >
                </template>
                <v-card>
                  <v-toolbar color="grey darken-3">
                    <v-toolbar-title>Update Profile</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn small @click="close">back</v-btn>
                  </v-toolbar>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card-text>
                      <v-text-field
                        :value="name"
                        label="Name"
                        :rules="[
                          (v) => !!v || 'Name is required',
                          (v) =>
                            (v && v.length >= 3) ||
                            'Name must be 3 characters or more',
                        ]"
                        @change="SET_NAME"
                      ></v-text-field>
                      <v-text-field
                        :value="nik"
                        :rules="[
                          (v) => !!v || 'NIK is required',
                          (v) =>
                            Number.isInteger(Number(v)) ||
                            'The value must be number',
                        ]"
                        label="NIK"
                        @change="SET_NIK"
                      ></v-text-field>
                      <v-text-field
                        :value="phone_number"
                        counter="13"
                        label="Phone Number"
                        :rules="[
                          (v) => !!v || 'Phone number is required',
                          (v) =>
                            (v && v.length >= 8 && v.length <= 13) ||
                            'Phone must be 8 characters or more and less than 13 characters ',
                          (v) =>
                            Number.isInteger(Number(v)) ||
                            'The value must be number',
                        ]"
                        @input="SET_PHONE_NUMBER"
                      ></v-text-field>
                      <v-text-field
                        :value="email"
                        label="E-Mail"
                        :rules="[
                          (v) => !!v || 'Email is required',
                          (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                        ]"
                        @change="SET_EMAIL"
                      ></v-text-field>
                      <v-dialog
                        ref="dialogDob"
                        v-model="modal"
                        :return-value.sync="date"
                        persistent
                        width="290px"
                      >
                        <template #activator="{ on, attrs }">
                          <v-text-field
                            label="Date of birth"
                            :value="date_of_birth"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            @change="SET_DATE_OF_BIRTH"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date"
                          scrollable
                          @change="SET_DATE_OF_BIRTH"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialogDob.save(date_of_birth)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-btn
                        :loading="loading"
                        color="indigo"
                        block
                        @click="updateProfile"
                        >update</v-btn
                      >
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
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
              ><v-btn
                text
                x-small
                color="red darken-2"
                class="pl-0"
                @click="$auth.logout()"
                >sign out</v-btn
              ></v-list-item
            >
          </v-list>
        </v-card>
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
  </v-layout>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  middleware: 'auth',
  data: () => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    modal: false,
    menu: false,
    form: null,
    valid: true,
    confirm_password: null,
    show: false,
    show1: false,
    show2: false,
  }),
  computed: {
    ...mapState('users', [
      'name',
      'email',
      'phone_number',
      'nik',
      'password',
      'new_password',
      'profile_image',
      'old_image',
      'date_of_birth',
      'loading',
      'dialog',
      'dialogAvatar',
      'dialogProfile',
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
    // loading(val) {
    //   val &&
    //     setTimeout(
    //       () => this.$store.commit('users/SET_LOADING', this.loading),
    //       4500
    //     )
    // },
  },
  methods: {
    ...mapActions({
      updatePassword: 'users/updatePassword',
      updateProfileImage: 'users/updateProfileImage',
      updateProfile: 'users/updateUser',
    }),
    ...mapMutations('users', [
      'SET_NAME',
      'SET_NIK',
      'SET_PHONE_NUMBER',
      'SET_DATE_OF_BIRTH',
      'SET_PASSWORD',
      'SET_NEW_PASSWORD',
      'SET_EMAIL',
      'SET_PROFILE_IMAGE',
      'SET_OLD_IMAGE',
      'SET_DIALOG',
      'SET_DIALOG_AVATAR',
      'SET_DIALOG_PROFILE',
    ]),
    editedItem() {
      this.$store.commit('users/SET_DIALOG_PROFILE')
      this.$store.commit('users/SET_ID', this.$store.state.auth.user.id)
      this.$store.commit('users/SET_NAME', this.$store.state.auth.user.name)
      this.$store.commit('users/SET_NIK', this.$store.state.auth.user.nik)
      this.$store.commit('users/SET_EMAIL', this.$store.state.auth.user.email)
      this.$store.commit(
        'users/SET_ADMIN',
        this.$store.state.auth.user.is_admin
      )
      this.$store.commit(
        'users/SET_PHONE_NUMBER',
        this.$store.state.auth.user.phone_number
      )
      this.$store.commit(
        'users/SET_DATE_OF_BIRTH',
        this.$store.state.auth.user.date_of_birth
      )
    },
    editedAvatar() {
      this.$store.commit('users/SET_DIALOG_AVATAR')
      this.$store.commit(
        'users/SET_OLD_IMAGE',
        this.$store.state.auth.user.profile_image
      )
    },
    updateProfileImg() {
      if (this.$refs.form.validate()) {
        this.updateProfileImage()
      }
    },
    submitPassword() {
      if (this.$refs.form.validate()) {
        this.updatePassword()
      }
    },
    close() {
      if (this.dialog) {
        this.$store.commit('users/SET_DIALOG', this.dialog)
      } else if (this.dialogAvatar) {
        this.$store.commit('users/SET_DIALOG_AVATAR', this.dialogAvatar)
      } else if (this.dialogProfile) {
        this.$store.commit('users/SET_DIALOG_PROFILE', this.dialogProfile)
        this.$store.commit('users/SET_RESET')
      }
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },
  },
}
</script>

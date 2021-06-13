<template>
  <v-layout justify-center>
    <v-container>
      <v-data-table
        :headers="usersHeaders"
        :items="users"
        :search="search"
        :loading="!users.length"
        item-key="id"
        fixed-header
      >
        <template #top>
          <v-toolbar color="grey darken-3" dense>
            <v-text-field
              v-model="search"
              label="Search User"
              append-icon="mdi-magnify"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog :value="dialog" max-width="500px" persistent>
              <template #activator="{ on, attrs }">
                <v-btn
                  small
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                  @click="SET_DIALOG(dialog)"
                  >create</v-btn
                >
              </template>
              <v-card>
                <v-toolbar dense color="grey darken-2">
                  <v-toolbar-title>{{
                    editedIndex === -1 ? 'Register Form' : 'Update Form'
                  }}</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn small class="mx-center" @click="close">Back</v-btn>
                </v-toolbar>
                <!-- <v-card-text v-if="alert"> </v-card-text> -->
                <v-card-text>
                  <!-- <v-alert :value="alert" :color="color" dense border="top">
                    <div v-for="(items, index) in error" :key="index">
                      <v-list-item-subtitle
                        v-for="(item, id) in items"
                        :key="id"
                        >{{ item }}</v-list-item-subtitle
                      >
                    </div>
                  </v-alert> -->
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
                      :value="phone_number"
                      label="Phone Number"
                      :rules="rules.phoneNumber"
                      required
                      @input="SET_PHONE_NUMBER"
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

                    <v-switch
                      v-model="selected"
                      :value="is_admin"
                      label="Admin"
                      @change="SET_ADMIN(!is_admin)"
                    ></v-switch>
                    <v-divider></v-divider>
                    <v-card-actions class="px-0">
                      <v-btn
                        small
                        block
                        :loading="loading"
                        :disabled="!valid"
                        color="teal darken-3"
                        class="mx-center"
                        @click.prevent="saveUser"
                        >Submit</v-btn
                      >
                    </v-card-actions>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-dialog>
            <v-dialog :value="dialogDelete" max-width="500px" persistent>
              <v-card color="grey darken-3">
                <v-card-title class="text-subtitle-1 justify-center">
                  Are you sure delete this item?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="destroyUser"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-icon class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
      <v-snackbar :value="snackbar" timeout="5000" :color="color">
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
    </v-container>
  </v-layout>
</template>

<script>
/* eslint-disable no-console */

import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
export default {
  middleware: 'auth',
  data: () => ({
    selected: null,
    valid: true,
    menu: false,
    activePicker: null,
    search: '',
    form: null,
    rules: {
      name: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length >= 3) || 'Name must be 3 characters or more',
      ],
      email: [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
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
    usersHeaders: [
      {
        text: 'Full Name',
        align: 'start',
        value: 'name',
      },
      {
        text: 'Email',
        value: 'email',
      },
      {
        text: 'Phone Number',
        value: 'phone_number',
      },
      {
        text: 'Actions',
        sortable: false,
        align: 'center',
        value: 'actions',
      },
    ],
  }),

  computed: {
    ...mapGetters({
      users: 'users/users',
    }),
    ...mapState('users', [
      'name',
      'email',
      'nik',
      'phone_number',
      'date_of_birth',
      'is_admin',
      'editedIndex',
      'alert',
      'color',
      'error',
      'success',
      'dialog',
      'dialogDelete',
      'snackbar',
      'loading',
    ]),
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
    ...mapActions({
      fetchUser: 'users/fetchUsers',
      register: 'users/register',
      updateUser: 'users/updateUser',
      deleteUser: 'users/deleteUser',
    }),
    ...mapMutations('users', [
      'SET_NAME',
      'SET_EMAIL',
      'SET_PHONE_NUMBER',
      'SET_NIK',
      'SET_BIRTHDAY',
      'SET_ADMIN',
      'SET_ALERT',
      'SET_INDEX',
      'SET_DIALOG',
      'SET_SNACKBAR',
    ]),
    save(birthday) {
      this.$refs.menu.save(birthday)
    },
    // async submitUser() {
    //   if (this.$refs.form.validate()) {
    //     await this.register()
    //     await this.$refs.form.resetValidation()
    //   }
    // },
    editItem(item) {
      // console.log(item)
      this.$store.commit('users/SET_DIALOG', this.dialog)
      this.$store.commit('users/SET_INDEX', this.users.indexOf(item))
      this.$store.commit('users/SET_ID', item.id)
      this.$store.commit('users/SET_NAME', item.name)
      this.$store.commit('users/SET_EMAIL', item.email)
      this.$store.commit('users/SET_PHONE_NUMBER', item.phone_number)
      this.$store.commit('users/SET_NIK', item.nik)
      this.$store.commit('users/SET_BIRTHDAY', item.date_of_birth)
      this.$store.commit('users/SET_ADMIN', item.is_admin)
      this.selected = this.$store.state.users.is_admin
    },
    deleteItem(item) {
      // console.log(item)
      this.$store.commit('users/SET_DIALOG_DELETE', this.dialogDelete)
      this.$store.commit('users/SET_INDEX', this.users.indexOf(item))
      this.$store.commit('users/SET_ID', item.id)
    },
    saveUser() {
      if (this.$store.state.users.editedIndex > -1) {
        if (this.$refs.form.validate()) {
          this.$store.commit('users/SET_LOADING', this.loading)
          setTimeout(() => {
            this.updateUser()
          }, 1000)
          setTimeout(() => {
            this.$store.commit('users/SET_SNACKBAR', this.snackbar)
            this.$refs.form.resetValidation()
            this.$refs.form.reset()
          }, 4100)
        }
      } else if (this.$store.state.users.editedIndex === -1) {
        if (this.$refs.form.validate()) {
          this.$store.commit('users/SET_LOADING', this.loading)
          setTimeout(() => {
            this.register()
          })
          setTimeout(() => {
            this.$store.commit('users/SET_SNACKBAR', this.snackbar)
            this.$refs.form.resetValidation()
          }, 5100)
        }
      }
    },
    async destroyUser() {
      await this.deleteUser()
      setTimeout(() => {
        this.$store.commit('users/SET_SNACKBAR', this.snackbar)
      }, 4100)
    },
    close() {
      this.$store.commit('users/SET_DIALOG', this.dialog)
      this.$refs.form.reset()
      if (this.editedIndex > -1) {
        this.$store.commit('users/SET_INDEX', -1)
      }
    },
    closeDelete() {
      this.$store.commit('users/SET_DIALOG_DELETE', this.dialogDelete)
      this.$store.commit('users/SET_ID', null)
      this.$store.commit('users/SET_INDEX', -1)
    },
  },
}
</script>

<style></style>

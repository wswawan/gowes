<template>
  <v-layout justify-center>
    <v-container>
      <v-data-table
        :headers="usersHeaders"
        :items="users"
        :search="search"
        item-key="email"
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
            <v-dialog v-model="dialog" max-width="500px" persistent>
              <template #activator="{ on, attrs }">
                <v-btn small color="primary" v-bind="attrs" v-on="on"
                  >create</v-btn
                >
              </template>
              <v-card>
                <v-toolbar dense color="grey darken-2">
                  <v-toolbar-title>Register</v-toolbar-title>
                </v-toolbar>
                <!-- <v-card-text v-if="alert"> </v-card-text> -->
                <v-card-text>
                  <v-alert :value="alert" :color="color" dense border="top">
                    <div v-for="(items, index) in error" :key="index">
                      <v-list-item-subtitle
                        v-for="(item, id) in items"
                        :key="id"
                        >{{ item }}</v-list-item-subtitle
                      >
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
                      :value="phone_number"
                      label="Phone Number"
                      :rules="rules.phoneNumber"
                      required
                      @input="SET_PHONE_NUMBER"
                    ></v-text-field>
                    <!-- <v-text-field
              :value="password"
              label="Password"
              type="password"
            ></v-text-field>
            <v-text-field
              :value="confirm"
              label="Confirm Password"
              type="password"
            ></v-text-field> -->
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
                    <v-select
                      :items="roles"
                      item-text="name"
                      item-value="id"
                    ></v-select>
                    <!-- <v-file-input
              :value="imageId"
              label="Input your id card here"
              name="imageId"
              @change="SET_IMAGE_ID"
            ></v-file-input> -->
                    <v-card-actions>
                      <v-btn
                        color="teal darken-3"
                        class="mx-center"
                        @click.prevent="close"
                        >Back</v-btn
                      >
                      <v-spacer></v-spacer>

                      <v-btn
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
          </v-toolbar>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-icon class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-container>
  </v-layout>
</template>

<script>
/* eslint-disable no-console */

import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
export default {
  middleware: 'auth',
  data: () => ({
    valid: true,
    menu: false,
    activePicker: null,
    search: '',
    dialog: null,
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
        text: 'Role',
        value: 'roles[0].name',
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
      'imageId',
      'editedIndex',
      'alert',
      'color',
      'error',
      'success',
      'roles',
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
    }),
    ...mapMutations('users', [
      'SET_NAME',
      'SET_EMAIL',
      'SET_PHONE_NUMBER',
      'SET_NIK',
      'SET_BIRTHDAY',
      'SET_IMAGE_ID',
      'SET_ALERT',
      'SET_ROLE',
      'SET_INDEX',
    ]),
    save(birthday) {
      this.$refs.menu.save(birthday)
    },
    async submitUser() {
      if (this.$refs.form.validate()) {
        await this.register()
        await this.$refs.form.resetValidation()
        this.dialog = false
      }
    },
    editItem(item) {
      console.log(item)
      // this.editedItem = Object.assign({}, item)
      this.$store.commit('users/SET_INDEX', this.users.indexOf(item))
      this.$store.commit('users/SET_ID', item.id)
      this.$store.commit('users/SET_NAME', item.name)
      this.$store.commit('users/SET_EMAIL', item.email)
      this.$store.commit('users/SET_PHONE_NUMBER', item.phone_number)
      this.$store.commit('users/SET_NIK', item.nik)
      this.$store.commit('users/SET_BIRTHDAY', item.birthDay)
      this.dialog = true
    },
    saveUser() {
      if (this.$store.state.users.editedIndex > -1) {
        this.updateUser()
        this.dialog = false
        this.$refs.form.reset()
        this.$refs.form.resetValidation()
      } else {
        this.$store.state.users.users.push(this.editedItem)
      }
    },
    close() {
      this.dialog = false
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },
  },
}
</script>

<style></style>

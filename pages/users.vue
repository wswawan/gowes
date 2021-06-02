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
            <v-dialog v-model="dialog" max-width="500px">
              <template #activator="{ on, attrs }">
                <v-btn small color="primary" v-bind="attrs" v-on="on"
                  >create</v-btn
                >
              </template>
              <v-toolbar dense>
                <v-toolbar-title>formTitle</v-toolbar-title>
              </v-toolbar>
              <v-card>
                <v-card-text class="pa-2">
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="form"
                          label="Full Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="form"
                          label="email"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-select label="Role" dense></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-icon class="mr-2" @click="item">mdi-pencil</v-icon>
          <v-icon @click="item">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-container>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'auth',
  data() {
    return {
      search: '',
      dialog: null,
      form: null,
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
          value: 'role',
        },
        {
          text: 'Actions',
          sortable: false,
          align: 'center',
          value: 'actions',
        },
      ],
    }
  },
  computed: mapGetters({
    users: 'users/users',
  }),
}
</script>

<style></style>

<template>
  <v-layout justify-center>
    <v-container>
      <v-data-table
        :headers="usersHeaders"
        :items="items"
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
          value: 'fullname',
        },
        {
          text: 'Email',
          value: 'email',
        },
        {
          text: 'Phone Number',
          value: 'phoneNumber',
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
      items: [
        {
          fullname: 'John Doe',
          email: 'johndoe@email.com',
          role: 'participants',
          phoneNumber: '03282421492',
        },
        {
          fullname: 'Jane Doe',
          email: 'janedoe@email.com',
          phoneNumber: '9824329489',
          role: 'committee',
        },
        {
          fullname: 'Good People',
          email: 'good@people.human',
          phoneNumber: '29384209484',
          role: 'participants',
        },
      ],
    }
  },
}
</script>

<style></style>

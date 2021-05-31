<template>
  <v-layout justify-center>
    <v-container>
      <v-data-table
        :headers="CheckPointHeaders"
        :items="items"
        :search="search"
        item-key="name"
        fixed-header
      >
        <template #top>
          <v-toolbar dense>
            <v-text-field
              v-model="search"
              label="Search Checkpoint"
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
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="form"
                          label="Checkpoint Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="form"
                          label="Description"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-select label="PIC" dense></v-select>
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
        <template #expanded-item="{ headers, item }">
          <td :colspan="headers.length">{{ item.description }}</td>
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
      CheckPointHeaders: [
        {
          text: 'Name',
          align: 'start',
          value: 'name',
        },
        {
          text: 'Description',
          sortable: false,
          value: 'description',
        },
        {
          text: 'PIC',
          value: 'pic',
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
          name: 'checkpoint 1',
          description: 'description checkpoin 1',
          pic: 'users 1',
        },
        {
          name: 'checkpoint 2',
          description: 'description checkpoin 2',
          pic: 'users 2',
        },
        {
          name: 'checkpoint 3',
          description: 'description checkpoin 3',
          pic: 'users 3',
        },
      ],
    }
  },
}
</script>

<style></style>

<template>
  <v-layout justify-center>
    <v-container>
      <v-data-table
        :headers="participantsHeaders"
        :items="items"
        :search="search"
        item-key="participants"
        fixed-header
      >
        <template #top>
          <v-toolbar dense>
            <v-text-field
              v-model="search"
              label="Search"
              append-icon="mdi-magnify"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-divider inset vertical class="mx-2"></v-divider>
            <v-toolbar-title class="subtitle-1">Report</v-toolbar-title>
          </v-toolbar>
        </template>
        <template #[`item.achievement`]="{ item }">
          <v-dialog width="500">
            <template #activator="{ attrs, on }">
              <v-btn small v-bind="attrs" color="teal" v-on="on"
                >{{ item.achievement }}
                <v-icon>mdi-flag-checkered</v-icon>
              </v-btn>
            </template>
            <v-toolbar dense>
              <v-toolbar-title>Achievement</v-toolbar-title>
            </v-toolbar>
            <v-card>
              <v-card-text class="py-4">
                <v-row
                  v-for="checkpoint in item.checkpoints"
                  :key="checkpoint.name"
                >
                  <v-col cols="6">{{ checkpoint.name }}</v-col>
                  <v-col cols="6">{{ checkpoint.time }}</v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-dialog>
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
      participantsHeaders: [
        {
          text: 'Participants',
          align: 'start',
          value: 'participants',
        },
        {
          text: 'Phone Numer',
          value: 'phoneNumber',
        },
        {
          text: 'Achievement',
          value: 'achievement',
          align: 'center',
        },
        {
          text: 'Actions',
          sortable: false,
          value: 'actions',
        },
      ],
      items: [
        {
          participants: 'John Doe',
          phoneNumber: '298347190293',
          achievement: 9,
          checkpoints: [
            {
              name: 'checkpoint 1',
              time: '10.20',
            },
            {
              name: 'checkpoint 2',
              time: '11.20',
            },
          ],
        },
        {
          participants: 'Jane Doe',
          phoneNumber: '03284021943804',
          achievement: 11,
          role: 'committee',
          checkpoints: [
            {
              name: 'checkpoint 10',
              time: '10.20',
            },
            {
              name: 'checkpoint 20',
              time: '11.20',
            },
          ],
        },
        {
          participants: 'Good People',
          phoneNumber: '09214819412',
          achievement: 15,
          role: 'participants',
          checkpoints: [
            {
              name: 'checkpoint 11',
              time: '10.20',
            },
            {
              name: 'checkpoint 12',
              time: '11.20',
            },
          ],
        },
      ],
    }
  },
}
</script>

<style></style>

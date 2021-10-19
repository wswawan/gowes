<template>
  <v-layout justify-center>
    <v-container class="pa-0">
      <v-data-table
        :headers="participantsHeaders"
        :items="checkIn"
        :search="search"
        item-key="id"
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
        <template #[`item.qrscans`]="{ item }">
          <v-dialog width="500">
            <template #activator="{ attrs, on }">
              <v-btn small v-bind="attrs" color="teal" v-on="on"
                >{{ item.qrscans.length }}
                <v-icon>mdi-flag-checkered</v-icon>
              </v-btn>
            </template>
            <v-toolbar dense>
              <v-toolbar-title>Achievement</v-toolbar-title>
            </v-toolbar>
            <v-card>
              <v-card-text class="py-4">
                <v-row
                  v-for="checkpoint in item.qrscans"
                  :key="checkpoint.name"
                  justify="center"
                  align="center"
                >
                  <v-col cols="6">{{ checkpoint.checkpoint.name }}</v-col>
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
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  middleware: 'auth',
  data: () => ({
    search: '',
    participantsHeaders: [
      {
        text: 'Participants',
        align: 'start',
        value: 'name',
      },
      {
        text: 'Phone Numer',
        value: 'phone',
      },
      {
        text: 'Achievement',
        value: 'qrscans',
        align: 'center',
      },
      // {
      //   text: 'Actions',
      //   sortable: false,
      //   value: 'actions',
      // },
    ],
  }),
  computed: {
    ...mapGetters({
      summary: 'qrscans/summary',
    }),
    ...mapState('qrscans', ['summary']),
    checkIn() {
      return this.$store.state.qrscans.summary.filter(
        (item) => item.qrscans.length
      )
    },
  },
  mounted() {
    this.fetchSummary()
  },
  methods: {
    ...mapActions({
      fetchSummary: 'qrscans/fetchSummary',
    }),
    ...mapMutations('qrscans', ['SET_SUMMARY']),
  },
}
</script>

<style></style>

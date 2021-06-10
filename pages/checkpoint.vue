<template>
  <v-layout justify-center>
    <v-container>
      <!-- {{ userAdmin }} -->
      <v-data-table
        :headers="CheckPointHeaders"
        :items="checkpoints"
        :loading="!checkpoints.length"
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
            <v-dialog :value="dialog" max-width="500px" persistent>
              <template #activator="{ on, attrs }">
                <v-btn small color="primary" v-bind="attrs" v-on="on"
                  >create</v-btn
                >
              </template>
              <v-card>
                <v-toolbar dense color="grey darken-2">
                  <v-toolbar-title>formTitle</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn small class="mx-center" @click="close">Back</v-btn>
                </v-toolbar>
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      :value="name"
                      :rules="rules.name"
                      required
                      label="Checkpoint Name"
                      @input="SET_NAME"
                    ></v-text-field>
                    <v-text-field
                      :value="description"
                      :rules="rules.description"
                      required
                      label="Checkpoint Description"
                      @input="SET_DESCRIPTION"
                    ></v-text-field>
                    <v-autocomplete
                      dense
                      :value="user_id"
                      :rules="rules.pic"
                      required
                      label="Select PIC"
                      :items="userAdmin"
                      item-text="name"
                      item-value="id"
                      @change="SET_USER_ID"
                    ></v-autocomplete>
                    <v-divider></v-divider>
                    <v-card-actions class="px-0">
                      <v-btn
                        class="mx-center"
                        color="teal darken-3"
                        small
                        block
                        @click.prevent="saveCheckpoint"
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
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'

export default {
  middleware: 'auth',
  data: () => ({
    valid: false,
    search: '',
    dialog: null,
    form: null,
    rules: {
      name: [
        (v) => !!v || 'Checkpoint name is required',
        (v) =>
          (v && v.length >= 3) ||
          'Checkpoint name must be 3 characters or more',
      ],
      description: [
        (v) => !!v || 'Checkpoint description is required',
        (v) =>
          (v && v.length >= 3) ||
          'Checkpoint description must be 3 characters or more',
      ],
      pic: [(v) => !!v || 'PIC is required'],
    },
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
        value: 'user.name',
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
    ...mapState('checkpoints', ['name', 'description', 'user_id']),
    ...mapGetters({
      checkpoints: 'checkpoints/checkpoints',
      users: 'users/users',
    }),
    userAdmin() {
      return this.$store.state.users.users.filter((user) => user.is_admin)
    },
  },
  mounted() {
    this.fetchCheckpoints()
    this.fetchUsers()
  },
  methods: {
    ...mapActions({
      fetchCheckpoints: 'checkpoints/fetchCheckpoints',
      fetchUsers: 'users/fetchUsers',
      createCheckpoint: 'checkpoints/createCheckpoint',
    }),
    ...mapMutations('checkpoints', [
      'SET_NAME',
      'SET_DESCRIPTION',
      'SET_USER_ID',
    ]),
    close() {
      this.dialog = false
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },
    async saveCheckpoint() {
      await this.createCheckpoint()
      await this.$refs.form.reset()
    },
  },
}
</script>

<style></style>

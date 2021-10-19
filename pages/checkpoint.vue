<template>
  <v-layout justify-center>
    <v-container class="pa-0">
      <!-- {{ userAdmin }} -->
      <v-data-table
        :headers="CheckPointHeaders"
        :items="checkpoints"
        :search="search"
        item-key="id"
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
            <v-dialog :value="dialog" max-width="500px" persistent>
              <template #activator="{ on, attrs }">
                <v-btn
                  small
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                  @click.prevent="SET_DIALOG(dialog)"
                  >create</v-btn
                >
              </template>
              <v-card>
                <v-toolbar dense color="grey darken-2">
                  <v-toolbar-title>{{
                    editedIndex ? 'Create Checkpoint' : 'Update Checkpoint'
                  }}</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn small class="mx-center" @click="close">Back</v-btn>
                </v-toolbar>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-card-text>
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
                      v-model="select"
                      :rules="rules.pic"
                      required
                      label="Select PIC"
                      :items="userAdmin"
                      item-text="name"
                      item-value="id"
                      return-object
                      @change="SET_PIC"
                    >
                    </v-autocomplete>
                    <v-divider></v-divider>
                    <v-card-actions class="px-0">
                      <v-btn
                        :loading="loading"
                        class="mx-center"
                        color="indigo darken-3"
                        block
                        @click.prevent="saveCheckpoint"
                        >Submit</v-btn
                      >
                    </v-card-actions>
                  </v-card-text>
                </v-form>
              </v-card>
            </v-dialog>
            <v-dialog :value="dialogDelete" max-width="500px" persistent>
              <v-card color="grey darken-3">
                <v-card-title class="text-subtitle-1 justify-center">
                  Are you sure delete this item?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="closeDelete">Cancel</v-btn>
                  <v-btn
                    color="indigo darken-1"
                    :loading="loading"
                    @click="destroyCheckpoint"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template #[`item.qrcode_url`]="{ item }">
          <v-btn
            small
            class="mx-center"
            color="blue"
            text
            :href="`${url}${item.qrcode_url.slice(7)}`"
            :download="item.name"
            >download
          </v-btn>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-icon class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>

      <v-snackbar :value="snackbar" :timeout="timeout" :color="color">
        <v-btn text small><v-icon>mdi-information-outline</v-icon></v-btn>
        <span v-if="success">
          {{ success }}
        </span>
        <span v-if="error">
          {{ error }}
        </span>
        <!-- <div v-else>
          <ul v-for="(item, i) in error" :key="i">
            <li>{{ item[0] }}</li>
          </ul>
        </div> -->

        <!-- <template #action="{ attrs }">
          <v-btn
            color="black"
            text
            v-bind="attrs"
            @click="SET_SNACKBAR(snackbar)"
          >
            Close
          </v-btn>
        </template> -->
      </v-snackbar>
    </v-container>
  </v-layout>
</template>

<script>
/* eslint-disable no-console */

import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'

export default {
  middleware: 'auth',
  data: () => ({
    timeout: 4000,
    valid: false,
    search: '',
    form: null,
    select: {},
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
          (v && v.length >= 3) || 'Description must be 3 characters or more',
        (v) =>
          (v && v.length <= 30) ||
          'Description must be less than or 30 characters',
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
        value: 'pic.name',
      },
      {
        text: 'QRCode',
        value: 'qrcode_url',
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
    ...mapState('checkpoints', [
      'name',
      'description',
      'qrcode_url',
      'pic',
      'dialog',
      'loading',
      'snackbar',
      'error',
      'success',
      'color',
      'editedIndex',
      'dialogDelete',
    ]),
    ...mapGetters({
      url: 'events/url',
      checkpoints: 'checkpoints/checkpoints',
      users: 'users/users',
    }),
    userAdmin() {
      return this.$store.state.users.users.filter((user) => user.is_admin)
    },
  },
  watch: {
    snackbar(val) {
      val &&
        setTimeout(
          () => this.$store.commit('checkpoints/SET_SNACKBAR', this.snackbar),
          4500
        )
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
      updateCheckpoint: 'checkpoints/updateCheckpoint',
      destroyCheckpoint: 'checkpoints/deleteCheckpoint',
    }),
    ...mapMutations('checkpoints', [
      'SET_NAME',
      'SET_DESCRIPTION',
      'SET_PIC',
      'SET_QRCODE_URL',
      'SET_COLOR',
      'SET_DIALOG',
      'SET_LOADING',
      'SET_SNACKBAR',
      'SET_TEXT_SUCCESS',
      'SET_INDEX',
    ]),
    close() {
      this.$store.commit('checkpoints/SET_DIALOG', this.dialog)
      this.$refs.form.resetValidation()
      this.$refs.form.reset()
      if (this.editedIndex > -1) {
        this.$store.commit('checkpoints/SET_INDEX', -1)
      }
    },
    saveCheckpoint() {
      if (this.$store.state.checkpoints.editedIndex > -1) {
        if (this.$refs.form.validate()) {
          this.updateCheckpoint().then(() => {
            this.$refs.form.resetValidation()
            this.$refs.form.reset()
          })
        }
      }
      if (this.$store.state.checkpoints.editedIndex === -1) {
        if (this.$refs.form.validate()) {
          this.createCheckpoint()
        }
      }
    },
    editItem(item) {
      this.$store.commit(
        'checkpoints/SET_INDEX',
        this.checkpoints.indexOf(item)
      )
      this.$store.commit('checkpoints/SET_DIALOG', this.dialog)
      this.$store.commit('checkpoints/SET_ID', item.id)
      this.$store.commit('checkpoints/SET_NAME', item.name)
      this.$store.commit('checkpoints/SET_DESCRIPTION', item.description)
      this.$store.commit('checkpoints/SET_PIC', item.pic)
      this.select = this.$store.state.checkpoints.pic
    },
    deleteItem(item) {
      this.$store.commit('checkpoints/SET_DIALOG_DELETE', this.dialogDelete)
      this.$store.commit(
        'checkpoints/SET_INDEX',
        this.checkpoints.indexOf(item)
      )
      this.$store.commit('checkpoints/SET_ID', item.id)
      this.$store.commit('checkpoints/SET_QRCODE_URL', item.qrcode_url)
    },
    closeDelete() {
      this.$store.commit('checkpoints/SET_DIALOG_DELETE', this.dialogDelete)
      this.$store.commit('checkpoints/SET_ID', null)
      this.$store.commit('checkpoints/SET_INDEX', -1)
    },
  },
}
</script>

<style></style>

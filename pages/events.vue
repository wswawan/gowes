<template>
  <v-layout>
    <v-container class="pa-0">
      <v-row justify="center" dense>
        <v-col v-for="event in events" :key="event.id" cols="12" lg="4">
          <v-card>
            <v-img
              class="align-end"
              height="200px"
              :src="`http://biker.test/storage/${event.image_url.slice(7)}`"
            >
              <v-card-actions class="pa-0">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-overline">{{
                      event.title
                    }}</v-list-item-title>
                    <v-list-item-subtitle>
                      {{
                        new Date(event.start_date).toLocaleDateString('id-ID')
                      }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-spacer></v-spacer>
                  <v-icon
                    v-if="$auth.user.is_admin"
                    color="success"
                    @click="editImage(event)"
                    >mdi-image-edit</v-icon
                  >
                </v-list-item>
              </v-card-actions>
              <!-- <v-card-title>{{ event.title }}</v-card-title>
              <v-card-subtitle>
                {{ new Date(event.start_date).toLocaleDateString('id-ID') }}
              </v-card-subtitle> -->
            </v-img>
            <v-card-actions>
              <v-btn color="orange" text @click="addToCart(event)">
                Enroll
              </v-btn>
              <!-- <v-btn color="orange" text> Explore </v-btn> -->
              <v-spacer></v-spacer>
              <v-btn v-if="$auth.user.is_admin" small icon
                ><v-icon @click="editItem(event)">mdi-pencil</v-icon></v-btn
              >
              <v-btn
                v-if="$auth.user.is_admin"
                small
                icon
                @click="deleteItem(event)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
            <v-card-text class="pt-0">
              <v-card-subtitle class="px-0 title"
                >{{
                  Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                  }).format(event.price)
                }}
              </v-card-subtitle>
              {{ event.description }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-dialog :value="dialogImage" persistent width="500">
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
                  :rules="[
                    (v) => !!v || 'File is required',
                    (v) =>
                      !v ||
                      v.size < 250000 ||
                      'Imaga size should be less than 250kb',
                  ]"
                  @change="SET_IMAGE_URL"
                ></v-file-input>
              </v-card-actions>
            </v-form>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                :loading="loading"
                block
                color="indigo"
                @click="updateImageEvent"
                >submit</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog :value="dialogDelete" max-width="500px">
          <v-card max-width="500px" color="grey darken-3">
            <v-card-title class="text-subtitle-1 justify-center"
              >Are you sure delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text>cancel</v-btn>
              <v-btn color="indigo" :loading="loading" @click="deleteEvent"
                >ok</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog width="500" :value="dialog" persistent>
          <template #activator="{ on, attrs }">
            <v-btn
              v-if="$auth.user.is_admin"
              center
              top
              right
              fab
              class="mt-14"
              fixed
              color="success"
              v-bind="attrs"
              v-on="on"
              @click="SET_DIALOG(dialog)"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-toolbar color="grey darken-3" dense>
              <v-toolbar-title>Create Event</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn small @click="close">back</v-btn>
            </v-toolbar>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-card-text>
                <v-text-field
                  label="Title"
                  :value="title"
                  :rules="[(v) => !!v || 'Title is required']"
                  @change="SET_TITLE"
                ></v-text-field>
                <v-text-field
                  label="Description"
                  :value="description"
                  :rules="[(v) => !!v || 'Description is required']"
                  @change="SET_DESCRIPTION"
                ></v-text-field>
                <v-text-field
                  label="Price"
                  prefix="Rp"
                  type="number"
                  :value="price"
                  :rules="[
                    (v) => !!v || 'Price is required',
                    (v) =>
                      Number.isInteger(Number(v)) || 'The value must be number',
                  ]"
                  @change="SET_PRICE"
                ></v-text-field>
                <v-file-input
                  v-if="editedIndex === -1"
                  label="Select Image"
                  prepend-icon=""
                  prepend-inner-icon="mdi-camera"
                  :value="imageUrl"
                  :rules="[(v) => !!v || 'Image is required']"
                  @change="SET_IMAGE_URL"
                ></v-file-input>
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  min-width="auto"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      label="Start Date"
                      :value="startDate"
                      :rules="[(v) => !!v || 'Start Date is required']"
                      v-bind="attrs"
                      readonly
                      v-on="on"
                      @change="SET_START_DATE"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    :min="nowDate"
                    @input="menu = false"
                    @change="SET_START_DATE"
                  ></v-date-picker>
                </v-menu>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn
                  block
                  color="indigo"
                  :loading="loading"
                  @click="submitEvent"
                  >submit</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <v-btn small center bottom right fab class="mb-15" fixed to="carts">
          <v-badge
            :content="countCart"
            :value="countCart"
            color="deep-orange"
            overlap
          >
            <v-icon>mdi-shopping</v-icon>
          </v-badge>
        </v-btn>
      </v-row>

      <v-snackbar :value="snackbar" timeout="4000" :color="color">
        <v-btn text small><v-icon>mdi-information-outline</v-icon></v-btn>
        <span>
          {{ success }}
        </span>
        <!-- <div v-else>
          <ul v-for="(item, i) in error" :key="i">
            <li>{{ item[0] }}</li>
          </ul>
        </div> -->
      </v-snackbar>
    </v-container>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'
export default {
  middleware: 'auth',
  data: () => ({
    count: 0,
    valid: false,
    menu: false,
    nowDate: new Date().toISOString().slice(0, 10),
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    fab: true,
  }),

  computed: {
    countCart() {
      return this.carts.length
    },
    ...mapGetters({
      events: 'events/events',
      carts: 'carts/carts',
      countCart: 'carts/countCart',
    }),
    ...mapState('events', [
      'title',
      'description',
      'price',
      'imageUrl',
      'startDate',
      'editedIndex',
      'dialog',
      'dialogImage',
      'dialogDelete',
      'loading',
      'snackbar',
      'success',
      'color',
    ]),
  },
  watch: {
    snackbar(val) {
      val &&
        setTimeout(
          () => this.$store.commit('events/SET_SNACKBAR', this.snackbar),
          4500
        )
    },
    carts() {
      if (this.carts.length === 0) {
        localStorage.removeItem('carts')
      } else {
        localStorage.setItem('carts', JSON.stringify(this.carts))
      }
    },
  },
  mounted() {
    this.fetchEvents()
    this.fetchCart(this.carts)
    this.countCarts()
  },
  methods: {
    ...mapActions({
      fetchEvents: 'events/fetchEvents',
      createEvent: 'events/createEvent',
      updateEvent: 'events/updateEvent',
      updateImage: 'events/updateImage',
      deleteEvent: 'events/deleteEvent',
      addToCart: 'carts/addToCart',
      fetchCart: 'carts/fetchCart',
      countCarts: 'carts/countCarts',
    }),
    ...mapMutations('events', [
      'SET_TITLE',
      'SET_DESCRIPTION',
      'SET_PRICE',
      'SET_IMAGE_URL',
      'SET_START_DATE',
      'SET_DIALOG',
      'SET_DIALOG_IMAGE',
    ]),
    submitEvent() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex === -1) {
          this.createEvent().then(() => {
            this.$refs.form.resetValidation()
          })
        } else {
          this.updateEvent().then(() => {
            this.$refs.form.resetValidation()
          })
        }
      }
    },
    updateImageEvent() {
      this.updateImage().then(() => {
        this.$refs.form.reset()
        this.$refs.form.resetValidation()
      })
    },
    editImage(item) {
      this.$store.commit('events/SET_DIALOG_IMAGE', this.dialogImage)
      this.$store.commit('events/SET_INDEX', this.events.indexOf(item))
      this.$store.commit('events/SET_ID', item.id)
      this.$store.commit('events/SET_OLD_IMAGE', item.image_url)
    },
    editItem(item) {
      this.$store.commit('events/SET_DIALOG', this.dialog)
      this.$store.commit('events/SET_INDEX', this.events.indexOf(item))
      this.$store.commit('events/SET_ID', item.id)
      this.$store.commit('events/SET_TITLE', item.title)
      this.$store.commit('events/SET_DESCRIPTION', item.description)
      this.$store.commit('events/SET_PRICE', item.price)
      // this.$store.commit('events/SET_IMAGE_URL', item.image_url)
      this.$store.commit('events/SET_START_DATE', item.start_date)
    },
    deleteItem(item) {
      this.$store.commit('events/SET_DIALOG_DELETE', this.dialogDelete)
      this.$store.commit('events/SET_INDEX', this.events.indexOf(item))
      this.$store.commit('events/SET_ID', item.id)
    },
    close() {
      if (this.dialog) {
        this.$store.commit('events/SET_DIALOG', this.dialog)
        // this.$refs.form.reset()
        this.$refs.form.resetValidation()
      } else {
        this.$store.commit('events/SET_DIALOG_IMAGE', this.dialogImage)
      }
      this.$store.commit('events/SET_RESET_EVENT')
    },
  },
}
</script>

<style></style>

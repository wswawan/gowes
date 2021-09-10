<template>
  <v-layout>
    <v-container class="pa-0">
      <v-row justify="center" align="center">
        <v-carousel height="300">
          <v-carousel-item
            v-for="(item, i) in carousels"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
        <v-col cols="12" sm="8" md="6" class="px-0">
          <v-card>
            <v-card-title>Hi {{ $auth.user.name }}</v-card-title>
            <v-card-subtitle class="subtitle-1">
              Welcome to the Timeline
            </v-card-subtitle>
          </v-card>
          <v-divider class="grey darken-3"></v-divider>
          <v-card class="mx-auto">
            <v-card-text v-if="!qrAuth.length"
              >Currently you have no timeline</v-card-text
            >
            <v-card-text v-else class="py-0 pl-0">
              <v-timeline v-for="item in qrAuth" :key="item.id" align-top dense>
                <v-timeline-item small color="teal">
                  <v-row>
                    <v-col cols="4">
                      <v-btn small class="teal darken-3">
                        {{ item.time }}
                      </v-btn></v-col
                    >
                    <v-col align-self="center">{{
                      item.checkpoint.name
                    }}</v-col>
                  </v-row>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  components: {},
  middleware: 'auth',
  data: () => ({
    carousels: [
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
      },
    ],
  }),
  computed: {
    ...mapState('qrscans', ['qrscans']),
    qrAuth() {
      return this.$store.state.qrscans.qrscans.filter(
        (item) => item.user.id === this.$auth.user.id
      )
    },
    checkIn() {
      return this.$store.state.qrscans.summary.filter(
        (item) => item.qrscans.length > 1
      )
    },
  },
  mounted() {
    this.fetchQrscans()
  },
  methods: {
    ...mapActions({
      fetchQrscans: 'qrscans/fetchQrscans',
    }),
  },
}
</script>

<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title>Hi {{ $auth.user.name }}</v-card-title>
        <v-card-subtitle class="subtitle-1">
          Welcome to the Timeline
        </v-card-subtitle>
      </v-card>
      <v-divider class="grey darken-3"></v-divider>
      <v-card class="mx-auto">
        <v-card-text class="py-0 pl-0">
          <v-timeline v-for="item in qrAuth" :key="item.id" align-top dense>
            <v-timeline-item small color="teal">
              <v-row>
                <v-col cols="4">
                  <v-btn small class="teal darken-3">
                    {{ item.time }}
                  </v-btn></v-col
                >
                <v-col align-self="center">{{ item.checkpoint.name }}</v-col>
              </v-row>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  components: {},
  middleware: 'auth',
  computed: {
    ...mapState('qrscans', ['qrscans']),
    qrAuth() {
      return this.$store.state.qrscans.qrscans.filter(
        (item) => item.user.id === this.$auth.user.id
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

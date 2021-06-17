<template>
  <v-row justify="center">
    <v-col md="4">
      <div class="text-center">
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
        ></v-progress-circular>
        <qrcode-stream v-else @decode="onDecode" @init="onInit"></qrcode-stream>
      </div>
    </v-col>
    <v-list-item-title v-if="!loading" class="text-center"
      >Scan QRCode to Checkin</v-list-item-title
    >
    <v-snackbar :value="snackbar" timeout="3000" :color="color">
      <v-btn v-if="success" text small
        ><v-icon>mdi-information-outline</v-icon></v-btn
      >
      <span v-if="success">
        {{ success }}
      </span>
      <span v-else>
        {{ error }}
      </span>
      <!-- <div v-else>
        <ul v-for="(item, i) in error" :key="i">
          <li>{{ item[0] }}</li>
        </ul>
      </div> -->
    </v-snackbar>
  </v-row>
</template>

<script>
/* eslint-disable no-console */
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  middleware: 'auth',
  data: () => ({}),
  computed: {
    ...mapState('qrscans', [
      'uuid',
      'snackbar',
      'loading',
      'success',
      'error',
      'color',
    ]),
  },
  watch: {
    snackbar(val) {
      val &&
        setTimeout(
          () => this.$store.commit('qrscans/SET_SNACKBAR', this.snackbar),
          3100
        )
    },
  },
  mounted() {
    // this.init()
  },
  methods: {
    ...mapActions({
      qrscan: 'qrscans/qrscan',
    }),
    ...mapMutations('qrscans', ['SET_UUID']),

    onDecode(decodesString) {
      this.$store.commit('qrscans/SET_UUID', decodesString)
      this.$store.commit('qrscans/SET_LOADING', this.loading)
      setTimeout(() => {
        this.qrscan()
      }, 2000)
    },
    async onInit(promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permisson'
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser'
        }
      }
    },
  },
}
</script>

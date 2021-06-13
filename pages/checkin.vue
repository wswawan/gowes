<template>
  <v-row justify="center">
    <v-col md="4">
      <qrcode-stream @decode="onDecode"></qrcode-stream>
    </v-col>
    <v-list-item-title class="text-center"
      >Scan QRCode to Checkpoint</v-list-item-title
    >
    <v-snackbar :value="snackbar" timeout="5000" :color="color">
      <v-btn v-if="success" text small
        ><v-icon>mdi-information-outline</v-icon></v-btn
      >
      <span v-if="success">
        {{ success }}
      </span>
      <div v-else>
        <ul v-for="(item, i) in error" :key="i">
          <li>{{ item[0] }}</li>
        </ul>
      </div>
    </v-snackbar>
  </v-row>
</template>

<script>
/* eslint-disable no-console */
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  middleware: 'auth',
  data() {
    return {
      mediaStream: null,
    }
  },
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
      setTimeout(() => {
        this.$$store.commit('qrscans/SET_SNACKBAR', this.snackbar)
      }, 5100)
    },
    // init() {
    //   if (
    //     navigator.getUserMedia ||
    //     navigator.webkitGetUserMedia ||
    //     navigator.mozGetUserMedia ||
    //     navigator.msGetUserMedia ||
    //     navigator.oGetUserMedia
    //   ) {
    //     navigator.mediaDevices
    //       .getUserMedia({ video: { facingMode: 'environment' } })
    //       .then((stream) => {
    //         this.mediaStream = stream
    //         this.$refs.video.srcObject = stream
    //         this.$refs.video.play()
    //       })
    //   } else {
    //     alert('Cannot get media devices')
    //   }
    // },
  },
}
</script>

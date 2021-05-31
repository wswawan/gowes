<template>
  <v-row justify="center">
    <v-col md="4">
      <video ref="video" width="100%"></video>
    </v-col>
    <v-list-item-title class="text-center"
      >Scan QRCode to Checkpoint</v-list-item-title
    >
  </v-row>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      mediaStream: null,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia ||
        navigator.oGetUserMedia
      ) {
        navigator.mediaDevices
          .getUserMedia({ video: { facingMode: 'environment' } })
          .then((stream) => {
            this.mediaStream = stream
            this.$refs.video.srcObject = stream
            this.$refs.video.play()
          })
      } else {
        alert('Cannot get media devices')
      }
    },
  },
}
</script>

<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="6" sm="8">
      <video
        ref="video"
        autoplay="true"
        width="100%"
        :class="camera === 'user' ? 'flipX' : ''"
      ></video>
      <v-card-actions class="justify-center">
        <v-btn icon><v-icon>mdi-camera-flip-outline</v-icon></v-btn>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon>mdi-camera-outline</v-icon></v-btn>
      </v-card-actions>
      <v-form>
        <v-file-input
          v-model="image"
          label="Upload Image Here"
          name="image"
          @change="setImage"
        ></v-file-input>
        <v-btn @click.prevent="fileUpload">Submit</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
/* eslint-disable no-console */

export default {
  data() {
    return {
      image: null,
      mediaStream: null,
      camera: 'user',
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    setImage(image) {
      this.image = image
    },

    async fileUpload() {
      // eslint-disable-next-line prefer-const
      let formData = new FormData()
      formData.append('image', this.image)
      await this.$axios.$get('/sanctum/csrf-cookie')
      await this.$axios
        .$post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((data) => console.log(data))
    },
    init() {
      if (
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia ||
        navigator.oGetUserMedia
      ) {
        navigator.mediaDevices
          .getUserMedia({ video: { facingMode: this.camera } })
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

<style>
.flipX {
  transform: scaleX(-1);
}
</style>

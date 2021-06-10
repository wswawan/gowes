<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="6" sm="8">
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
    }
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
  },
}
</script>

<style></style>

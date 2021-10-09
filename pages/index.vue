<template>
  <v-layout fill-height align-center>
    <v-row justify="center" align="center">
      {{ lists[15] }}
      <v-col cols="12" sm="4">
        <v-select :items="listVA" item-text="name" item-value="code">
        </v-select>
        <v-card-text class="text-center">
          <v-card-title class="display-1 justify-center">Hello !</v-card-title>
          <v-card-subtitle
            >Stay safe and healthy, keep distancing and don't forget to wear a
            mask.</v-card-subtitle
          >
          <v-card-actions>
            <v-btn block color="indigo darken-3" to="login">login</v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn block outlined color="indigo" to="register"
              ><span class="white--text">signup</span></v-btn
            >
          </v-card-actions>
        </v-card-text>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
export default {
  middleware: 'guest',
  data: () => ({
    lists: [],
  }),
  computed: {
    listVA() {
      return this.lists.filter((item) => item.group === 'Virtual Account')
    },
  },
  mounted() {
    this.asyncData()
  },
  methods: {
    async asyncData() {
      await this.$axios.$get('/api/listbank').then((response) => {
        this.lists = response.data
        // eslint-disable-next-line no-console
        console.log(response.data)
      })
    },
  },
}
</script>

<style></style>

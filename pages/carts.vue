<template>
  <v-row justify="center" dense class="pa-0">
    <v-card>
      <v-card-text v-for="(cart, index) in carts" :key="index">
        <div class="d-flex flex-no-wrap justify-space-between">
          <v-avatar size="125" tile>
            <v-img
              :src="`http://biker.test/storage/${cart.image_url.slice(7)}`"
            ></v-img>
          </v-avatar>
          <div>
            <v-card-subtitle>{{ cart.title }}</v-card-subtitle>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      carts: 'carts/carts',
    }),
    ...mapState('carts', ['carts']),
  },
}
</script>

<style></style>

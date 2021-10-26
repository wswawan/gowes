<template>
  <div>
    <v-btn icon x-large to="home"><v-icon>mdi-home-outline</v-icon></v-btn>
    <v-card-text class="pa-0">
      <v-card-title class="display-1">{{ welcome }}</v-card-title>
      <v-card-subtitle>{{ title }}</v-card-subtitle>
    </v-card-text>
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
export default {
  name: 'GuestHeader',
  props: {
    welcome: {
      type: String,
      default: 'Hi?',
    },
    title: String,
  },
}
</script>

<style></style>

<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="teal darken-3">edit</v-btn>
        </v-card-actions>
        <v-divider class="pb-2"></v-divider>
        <v-img
          class="rounded-lg mx-auto"
          width="250"
          height="250"
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        ></v-img>

        <v-card-title class="justify-center">
          {{ $auth.user.name }}
          <v-icon color="green lighten-1">mdi-check-all</v-icon>
        </v-card-title>
        <v-card-subtitle class="text-center">
          <v-chip color="teal lighten-2" small>29 Years Old</v-chip>
        </v-card-subtitle>
        <v-card-text class="text-center">
          <div>{{ $auth.user.email }}</div>
          <div>{{ $auth.user.phone_number }}</div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  middleware: 'auth',
}
</script>

<template>
  <v-layout>
    <v-container class="pa-0">
      <v-row justify="center">
        <v-col cols="12" md="4">
          <v-card
            v-for="order in orders"
            :key="order.id"
            rounded="0"
            class="mb-2"
          >
            <v-toolbar>
              <v-toolbar-title>
                <v-list-item class="pa-0">
                  <v-list-item-content>
                    <v-list-item-title class="text-uppercase"
                      >ref : {{ order.orderRef }}</v-list-item-title
                    >
                    <v-list-item-subtitle>{{
                      new Date(order.created_at).toLocaleDateString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                small
                rounded
                color="indigo darken-3"
                :to="`/order/${order.orderRef}`"
                >view</v-btn
              >
            </v-toolbar>
            <v-card-text class="pa-0">
              <v-list-item>
                <v-list-item-avatar size="60" tile>
                  <v-img :src="`${url}${order.items[0].img.slice(7)}`"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="text-capitalize">{{
                    order.items[0].name
                  }}</v-list-item-title>
                  <v-list-item-subtitle
                    >{{ order.items[0].quantity }}x</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="order.items.length > 1">
                <v-list-item-subtitle
                  >+{{ order.items.length - 1 }} Event
                  Lain</v-list-item-subtitle
                >
              </v-list-item>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="pa-0">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Total Order</v-list-item-title>
                  <v-list-item-subtitle>{{
                    Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                    }).format(order.amount)
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-spacer></v-spacer>
              <v-list-item class="text-right">
                <v-list-item-subtitle
                  class="text-capitalize font-weight-bold"
                  :class="
                    order.status === 'UNPAID' ? 'red--text' : 'green--text'
                  "
                  >{{
                    order.status === 'UNPAID' ? 'menunggu pembayaran' : 'lunas'
                  }}</v-list-item-subtitle
                >
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'auth',
  computed: {
    ...mapGetters({
      url: 'events/url',
      orders: 'orders/orders',
    }),
  },
}
</script>

<style></style>

<template>
  <v-layout>
    <v-container class="pa-0">
      <v-row justify="center" dense>
        <v-col cols="12" class="pa-0">
          <v-card rounded="0">
            <v-toolbar dense>
              <v-toolbar-title class="text-h6">Order Saya</v-toolbar-title>
            </v-toolbar>
            <v-card-text class="pa-0">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    class="text-body-1 font-weight-light text-uppercase"
                    >ID Order : {{ order.orderRef }}</v-list-item-title
                  >
                  <v-list-item-subtitle class="font-weight-light">{{
                    new Date(order.created_at).toLocaleDateString()
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    class="text-capitalize font-weight-bold"
                    :class="
                      order.status === 'UNPAID' || order.status === 'CANCELED'
                        ? 'red--text'
                        : 'green--text'
                    "
                    >status:
                    {{
                      order.status === 'UNPAID'
                        ? 'Menunggu Pembayaran'
                        : order.status === 'CANCELED'
                        ? 'Dibatalkan'
                        : 'Lunas'
                    }}</v-list-item-title
                  >
                  <v-list-item-title class="font-weight-light">{{
                    order.payment.code === 'QRISC'
                      ? 'E-Wallet / QRIS'
                      : order.payment.name
                  }}</v-list-item-title>
                  <v-list-item-title v-if="!order.payment.qrUrl" class="text-h5"
                    >{{ order.payment.payCode }}
                    <input
                      id="payCode"
                      type="hidden"
                      :value="order.payment.payCode"
                    />
                    <v-chip v-if="copiedVA" class="text-capitalize">
                      copied
                    </v-chip>
                    <v-icon
                      v-else
                      @click="
                        {
                          copyText('#payCode'), (copiedVA = !copiedVA)
                        }
                      "
                      >mdi-content-duplicate</v-icon
                    >
                  </v-list-item-title>
                  <v-img
                    v-else
                    :src="order.payment.qrUrl"
                    max-width="333"
                  ></v-img>
                  <v-list-item-title class="font-weight-light"
                    >Amount</v-list-item-title
                  >
                  <v-list-item-title class="text-h5"
                    >{{
                      Intl.NumberFormat('id-iD', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      }).format(order.amount)
                    }}
                    <input id="amount" type="hidden" :value="order.amount" />
                    <v-chip v-if="copiedAmount" class="text-capitalize">
                      copied
                    </v-chip>
                    <v-icon
                      v-else
                      @click="
                        {
                          copyText('#amount'), (copiedAmount = !copiedAmount)
                        }
                      "
                      >mdi-content-duplicate</v-icon
                    >
                  </v-list-item-title>
                  <v-list-item-title
                    v-if="order.status === 'UNPAID'"
                    class="text-capitalize font-weight-bold red--text"
                    >batas pembayaran : {{ expired }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item class="indigo darken-3">
                <v-list-item-content class="indigo darken-3">
                  <v-list-item-title class="text-h6"
                    >Instruksi Pembayaran</v-list-item-title
                  >
                  <v-tabs
                    v-model="tab"
                    color="white darken-2"
                    class="indigo darken-2"
                    next-icon="mdi-chevron-right"
                    prev-icon="mdi-chevron-left"
                    show-arrows
                    fixed-tabs
                  >
                    <v-tab
                      v-for="instruction in instructions.data"
                      :key="instruction.title"
                      class="text-capitalize indigo darken-2"
                      >{{ instruction.title }}</v-tab
                    >
                  </v-tabs>
                  <v-tabs-items v-model="tab" class="indigo darken-3">
                    <v-tab-item
                      v-for="instruction in instructions.data"
                      :key="instruction.title"
                    >
                      <v-list-item
                        v-for="(item, key) in instruction.steps"
                        :key="key"
                        class="pa-0"
                      >
                        <v-list-item-action class="pa-0 mx-auto"
                          >{{ key + 1 }}.</v-list-item-action
                        >
                        <v-list-item-content class="pa-0">
                          <v-list-item-title dense class="text-wrap">{{
                            item
                          }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-tab-item>
                  </v-tabs-items>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item dense>
                <v-col cols="6" class="pa-0">
                  <v-list-item-content class="pa-0">
                    <v-list-item-title>Diskon</v-list-item-title>
                  </v-list-item-content>
                </v-col>
                <v-col cols="6" class="pa-0">
                  <v-list-item-content class="pa-0">
                    <v-list-item-title class="text-right">{{
                      order.discount
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-col>
              </v-list-item>
              <v-list-item dense>
                <v-col cols="6" class="pa-0">
                  <v-list-item-content class="pa-0">
                    <v-list-item-title>Total Order</v-list-item-title>
                  </v-list-item-content>
                </v-col>
                <v-col cols="6" class="pa-0">
                  <v-list-item-content class="pa-0">
                    <v-list-item-title class="text-right font-weight-bold">{{
                      Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      }).format(order.amount)
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-col>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item v-for="(item, index) in order.items" :key="index">
                <v-list-item-avatar tile size="60">
                  <v-img :src="`${url}${item.img.slice(7)}`"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-black text-capitalize"
                    >{{ item.name }}</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >{{ item.quantity }} Pcs</v-list-item-subtitle
                  >
                  <v-list-item-subtitle>{{ item.price }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    tab: null,
    copiedVA: false,
    copiedAmount: false,
    paymentInstruction: [],
  }),
  async fetch({ store, $axios, params }) {
    await $axios.$get('/sanctum/csrf-cookie')
    await $axios.$get(`/api/order/${params.slug}`).then((data) => {
      store.commit('orders/SET_ORDER', data)
    })
    await $axios
      .$get(
        `/api/instructions/${store.state.orders.order.payment.code}&${store.state.orders.order.payment.payCode}&${store.state.orders.order.amount}`
      )
      // eslint-disable-next-line no-console
      .then((data) => {
        store.commit('orders/SET_INSTRUCTIONS', data)
      })
  },
  computed: {
    ...mapGetters({
      url: 'events/url',
      order: 'orders/order',
      instructions: 'orders/instructions',
    }),
    expired() {
      const date = new Date(this.order.created_at)
      date.setDate(date.getDate() + 1)
      return date.toLocaleDateString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      })
    },
  },
  watch: {
    copiedVA(val) {
      val && setTimeout(() => (this.copiedVA = false), 2000)
    },
    copiedAmount(val) {
      val && setTimeout(() => (this.copiedAmount = false), 2000)
    },
  },
  mounted() {
    this.setCarts()
  },
  methods: {
    setCarts() {
      localStorage.removeItem('carts')
      localStorage.removeItem('amount')
      this.$store.commit('orders/SET_CART', [])
    },
    copyText(val) {
      // eslint-disable-next-line no-console
      const textToCopy = document.querySelector(val)
      textToCopy.setAttribute('type', 'text')
      textToCopy.select()
      document.execCommand('copy')
      textToCopy.setAttribute('type', 'hidden')
    },
  },
}
</script>

<style>
.theme--dark.v-tabs > .v-tabs-bar {
  background-color: #303f9f !important;
}
</style>

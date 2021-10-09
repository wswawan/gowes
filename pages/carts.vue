<template>
  <v-container class="pa-0">
    <v-layout>
      <v-row v-if="carts.length" dense justify="center">
        <v-col cols="12" md="4">
          <v-card>
            <v-toolbar dense>
              <v-toolbar-title class="flex text-center">
                Details Order
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text class="pt-0">
              <v-checkbox
                :value="isProfile"
                label="Same as profile"
                @click="fillFormCart"
              ></v-checkbox>
              <v-form>
                <v-text-field
                  label="Fullname"
                  prepend-inner-icon="mdi-card-account-details-outline"
                  :value="name"
                  @change="SET_NAME"
                ></v-text-field>
                <v-text-field
                  label="E-Mail"
                  prepend-inner-icon="mdi-at"
                  :value="email"
                  @change="SET_EMAIL"
                ></v-text-field>
                <v-text-field
                  type="number"
                  label="Phone Number"
                  prepend-inner-icon="mdi-phone-outline"
                  :value="phone_number"
                  @change="SET_PHONE_NUMBER"
                ></v-text-field>
                <v-select
                  prepend-inner-icon="mdi-bank-outline"
                  label="Select Payment"
                  :items="listsVA"
                  item-text="name"
                  item-value="code"
                  @change="SET_PAYMENT"
                ></v-select>
                <v-list-item class="px-0 text-center" two-line>
                  <v-list-item-content>
                    <v-list-item-subtitle>Amount</v-list-item-subtitle>
                    <v-list-item-title class="font-weight-black">{{
                      Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      }).format(amount)
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                  <v-btn color="indigo" block>submit</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-toolbar dense>
            <v-toolbar-title class="flex text-center">Cart</v-toolbar-title>
          </v-toolbar>
          <v-card
            v-for="(cart, index) in carts"
            :key="index"
            class="mx-auto pa-0 rounded-0"
          >
            <v-card-text class="py-0">
              <v-list-item class="pa-0">
                <v-list-item-avatar size="100" tile>
                  <v-img
                    :src="`http://biker.test/storage/${cart.img.slice(7)}`"
                  ></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <div class="text-overline">{{ cart.title }}</div>
                  <v-text-field
                    type="number"
                    readonly
                    :value="cart.qty"
                    outlined
                    class="centered-text"
                    dense
                    hide-details=""
                    @change="SET_QTY(cart)"
                  >
                    <v-icon
                      slot="prepend-inner"
                      color="red"
                      @click="SET_DECREAS_QTY(cart)"
                      >mdi-minus</v-icon
                    >
                    <v-icon
                      slot="append"
                      color="green"
                      @click="SET_INCREAS_QTY(cart)"
                      >mdi-plus</v-icon
                    >
                  </v-text-field>
                  <v-list-item-title class="py-2"
                    >Rp. {{ cart.price * cart.qty }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else justify="center">
        <v-alert type="error" width="344" class="text-center"
          >Your Cart is Empty</v-alert
        >
        <v-card-text class="text-center">
          <v-btn to="/events" class="justify-center">back to event</v-btn>
        </v-card-text>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable no-console */

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  middleware: 'auth',
  computed: {
    ...mapGetters({
      carts: 'carts/carts',
      amount: 'carts/amount',
    }),
    ...mapState('carts', ['paymentList', 'payment']),
    ...mapState('users', ['name', 'email', 'phone_number', 'isProfile']),
    listsVA() {
      return this.paymentList.filter((item) => item.group === 'Virtual Account')
    },
  },
  watch: {
    carts() {
      if (this.carts.length === 0) {
        localStorage.removeItem('carts')
      }
    },
  },
  mounted() {
    this.dataBank()
    this.fetchCart(this.carts)
  },
  beforeDestroy() {
    this.$store.commit('users/SET_RESET')
  },
  methods: {
    ...mapMutations('carts', [
      'SET_SAVE_CARTS',
      'SET_QTY',
      'SET_INCREAS_QTY',
      'SET_DECREAS_QTY',
      'SET_PAYMENT',
    ]),
    ...mapMutations('users', ['SET_NAME', 'SET_EMAIL', 'SET_PHONE_NUMBER']),
    ...mapActions({
      fetchCart: 'carts/fetchCart',
      cartAmount: 'carts/cartAmount',
      dataBank: 'carts/dataBank',
      fillFormCart: 'users/fillFormCart',
    }),
  },
}
</script>

<style>
.centered-text input {
  text-align: center;
}
</style>

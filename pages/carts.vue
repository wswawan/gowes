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
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  label="Fullname"
                  prepend-inner-icon="mdi-card-account-details-outline"
                  :value="name"
                  :rules="[(v) => !!v || 'Fullname is required']"
                  @change="SET_NAME"
                ></v-text-field>
                <v-text-field
                  label="E-Mail"
                  prepend-inner-icon="mdi-at"
                  :value="email"
                  :rules="[
                    (v) => !!v || 'Email is required',
                    (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                  ]"
                  @change="SET_EMAIL"
                ></v-text-field>
                <v-text-field
                  label="Phone Number"
                  prepend-inner-icon="mdi-phone-outline"
                  :value="phone_number"
                  :rules="[
                    (v) => !!v || 'Phone Number is required',
                    (v) =>
                      Number.isInteger(Number(v)) || 'The value must be number',
                  ]"
                  @change="SET_PHONE_NUMBER"
                ></v-text-field>
                <v-form ref="paymentChoose" v-model="valid" lazy-validation>
                  <v-radio-group
                    :rules="[(v) => !!v || 'Please Select Payment']"
                    required
                  >
                    <v-radio
                      label="Virtual Account"
                      value="Virtual Account"
                      @change="changeToVA"
                    ></v-radio>
                    <v-select
                      v-if="showVA"
                      prepend-inner-icon="mdi-bank-outline"
                      label="Select Payment"
                      :rules="[(v) => !!v || 'Please Select Payment']"
                      :items="listsVA"
                      item-text="name"
                      item-value="code"
                      @change="SET_PAYMENT"
                    >
                    </v-select>

                    <v-radio
                      label="Minimarket"
                      value="Minimarket"
                      @change="changeToMinimarket"
                    ></v-radio>
                    <v-select
                      v-if="showMiniMarket"
                      prepend-inner-icon="mdi-storefront-outline"
                      label="Select Store"
                      :rules="[(v) => !!v || 'Please Select Store to Payment']"
                      :items="listsMiniMarket"
                      item-text="name"
                      item-value="code"
                      @change="SET_PAYMENT"
                    >
                    </v-select>
                    <v-radio
                      label="E-Wallet / QRIS"
                      value="QRIS"
                      @click=";(showVA = false), (showMiniMarket = false)"
                      @change="SET_PAYMENT('QRISC')"
                    ></v-radio>
                  </v-radio-group>
                </v-form>

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
                  <v-btn
                    color="indigo"
                    block
                    :loading="loading"
                    @click="createOrder"
                    >submit</v-btn
                  >
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-toolbar dense>
            <v-toolbar-title class="flex text-center"
              >Cart Item{{ countCart === 1 ? '' : 's' }}</v-toolbar-title
            >
          </v-toolbar>
          <v-card
            v-for="(cart, index) in carts"
            :key="index"
            class="mx-auto pa-0 rounded-0"
          >
            <v-card-text class="py-0">
              <v-list-item class="pa-0">
                <v-list-item-avatar size="100" tile>
                  <v-img :src="`${url}${cart.img.slice(7)}`"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <div class="text-overline">{{ cart.title }}</div>
                  <v-text-field
                    type="number"
                    readonly
                    :value="cart.quantity"
                    outlined
                    class="centered-text"
                    dense
                    hide-details=""
                    @change="SET_QTY(cart)"
                  >
                    <v-icon
                      slot="prepend-inner"
                      color="red"
                      @click="decreaseQty(cart)"
                      >mdi-minus</v-icon
                    >
                    <v-icon
                      slot="append"
                      color="green"
                      @click="increaseQty(cart)"
                      >mdi-plus</v-icon
                    >
                  </v-text-field>
                  <v-list-item-title class="py-2"
                    >Rp. {{ cart.price * cart.quantity }}</v-list-item-title
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
      <v-snackbar :value="snackbar" timeout="4000" :color="color">
        <v-btn v-if="success" text small
          ><v-icon>mdi-information-outline</v-icon></v-btn
        >
        <span v-if="success">
          {{ success }}
        </span>
        <div v-else>
          <!-- <ul v-for="(item, i) in error" :key="i">
            <li>{{ item[0] }}</li>
          </ul> -->
          {{ error }}
        </div>
      </v-snackbar>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable no-console */

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  middleware: 'auth',
  data: () => ({
    valid: false,
    show: false,
    showVA: false,
    showMiniMarket: false,
  }),
  computed: {
    ...mapGetters({
      url: 'events/url',
      carts: 'orders/carts',
      amount: 'orders/amount',
    }),
    ...mapState('orders', [
      'paymentList',
      'payment',
      'countCart',
      'loading',
      'snackbar',
      'error',
      'success',
      'color',
    ]),
    ...mapState('users', ['name', 'email', 'phone_number', 'isProfile']),
    listsVA() {
      return this.paymentList.filter((item) => item.group === 'Virtual Account')
    },
    listsMiniMarket() {
      return this.paymentList.filter(
        (item) => item.group === 'Convenience Store'
      )
    },
  },
  watch: {
    carts() {
      if (this.carts.length === 0) {
        localStorage.removeItem('carts')
        localStorage.removeItem('amount')
      }
    },
    amount() {
      if (this.amount === 0) {
        localStorage.removeItem('amount')
      }
    },
    snackbar(val) {
      val &&
        setTimeout(
          () => this.$store.commit('orders/SET_SNACKBAR', this.snackbar),
          4500
        )
    },
  },
  mounted() {
    this.fetchCart(this.carts)
    this.countCarts()
  },
  beforeDestroy() {
    this.$store.commit('users/SET_RESET')
  },
  methods: {
    createOrder() {
      if (this.$refs.paymentChoose.validate() && this.$refs.form.validate()) {
        this.submitOrder()
          .then(() => {
            this.$refs.form.resetValidation()
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    ...mapMutations('orders', [
      'SET_SAVE_CARTS',
      'SET_QTY',
      'SET_INCREAS_QTY',
      'SET_DECREAS_QTY',
      'SET_PAYMENT',
    ]),
    ...mapMutations('users', ['SET_NAME', 'SET_EMAIL', 'SET_PHONE_NUMBER']),
    ...mapActions({
      fetchCart: 'orders/fetchCart',
      cartAmount: 'orders/cartAmount',
      countCarts: 'orders/countCarts',
      fillFormCart: 'users/fillFormCart',
      submitOrder: 'orders/submitOrder',
      increaseQty: 'orders/increaseQty',
      decreaseQty: 'orders/decreaseQty',
    }),
    changeToVA() {
      this.$refs.paymentChoose.reset()
      this.showVA = true
      this.showMiniMarket = false
      this.$store.commit('orders/SET_PAYMENT', null)
    },
    changeToMinimarket() {
      this.$refs.paymentChoose.reset()
      this.showVA = false
      this.showMiniMarket = true
      this.$store.commit('orders/SET_PAYMENT', null)
    },
  },
}
</script>

<style>
.centered-text input {
  text-align: center;
}
</style>

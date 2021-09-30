<template>
  <v-app dark>
    <v-navigation-drawer
      v-if="$auth.loggedIn"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar v-if="$auth.loggedIn" :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon
        v-if="$auth.user.is_admin"
        @click.stop="drawer = !drawer"
      />
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fill-height>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
    <v-bottom-navigation
      v-if="$auth.loggedIn"
      background-color="indigo"
      grow
      fixed
      app
    >
      <v-btn to="/home"
        ><span>Home</span><v-icon>mdi-home-outline</v-icon></v-btn
      >
      <v-btn to="/checkin">
        <span>CheckIn</span>
        <v-icon>mdi-fingerprint</v-icon>
      </v-btn>
      <v-btn to="/events">
        <span>Event</span>
        <v-icon>mdi-calendar-outline</v-icon>
      </v-btn>
      <v-btn to="/setting">
        <span>Setting</span>
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Default',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-file-document-multiple-outline',
          title: 'Report',
          to: '/report',
        },
        {
          icon: 'mdi-map-marker-path',
          title: 'Checkpoint',
          to: '/checkpoint',
        },
        {
          icon: 'mdi-account-group-outline',
          title: 'Users',
          to: '/users',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Etape Pasundan',
    }
  },
  methods: {
    ...mapActions({
      logout: 'users/logout',
    }),
  },
}
</script>

<template>
  <v-app id="inspire">
    <v-app-bar app>
      <router-link to="/">
        <U2wareAvatar></U2wareAvatar>
      </router-link>

      <v-toolbar-title>
        {{ $t("contents.bar.title") }} {{ subtitle }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn text v-bind="props" variant="elevated" color="primary">
            <v-icon>mdi-account</v-icon> {{ username }}
          </v-btn>
        </template>
        <v-list nav>
          <v-list-item
            prepend-icon="mdi-logout"
            :title="$t('accounts.logout.title')"
            @click="logout"
          >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <U2wareFooter></U2wareFooter>

    <v-navigation-drawer permanent v-model="drawer">
      <v-list nav>
        <v-list-item to="/contents/foos"> Foos</v-list-item>
        <v-list-item to="/contents/bars"> Bars </v-list-item>
        <v-list-item to="/contents/items"> Items </v-list-item>
        <v-list-item v-if="isAdmin" to="/contents/users"> Users </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
const x = "[/contents]";
import $accountsApi from "@/assets/apis/accounts";

import $contentsApi from "@/assets/apis/contents.js";
import $contentsState from "@/assets/stores/contents.js";

export default {
  data: () => ({
    drawer: true,
    isAdmin: false,
    username : null,
  }),

  computed: {
    subtitle: $contentsState.computed.subtitle,
  },

  methods: {
    logout() {
      let before = this.$t("accounts.logout.title");
      let after = this.$t("accounts.logoff.title");

      this.$dialog
        .confirm(before)
        .then((r) => {
          console.log(x, "logout()", 1, r);
          return $accountsApi.oauth2.logout();
        })
        .then((r) => {
          console.log(x, "logout()", 2, r);
          return this.$dialog.alert(after);
        })
        .then((r) => {
          this.$router.push("/");
        });
    },
  },

  mounted() {
    $contentsApi.auditors
      .hasPermission(["ROLE_ADMIN"])
      .then((r) => {
        console.log(x, "mounted()", 1, r);
        this.username = r.userId;
        this.isAdmin = true;
      })
      .catch((r) => {
        console.log(x, "mounted()", 222, r);
        this.username = r.userId;
        this.isAdmin = false;
      });
  },
};
</script>

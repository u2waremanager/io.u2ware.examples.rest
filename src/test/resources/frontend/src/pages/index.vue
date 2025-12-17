<template>
  <v-app id="inspire">
    <v-app-bar app>
      <router-link to="/">
        <U2wareAvatar></U2wareAvatar>
      </router-link>

      <v-toolbar-title> {{ $t("index.bar.title") }} </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn text variant="elevated" color="error" @click="start">
        <v-icon>mdi-account</v-icon> 시작하기
      </v-btn>
    </v-app-bar>

    <U2wareFooter></U2wareFooter>

    <v-main>



    </v-main>
  </v-app>


</template>

<script>
const x = "[/]";
import $accounts from "@/assets/apis/accounts";


import $common from "@/assets/apis/common";

export default {
  data: () => ({}),

  computed: {

  },

  methods: {
    start() {
      Promise.resolve()
        .then((r) => {
          console.log(x, "start()", 1);
          return $accounts.oauth2.userinfo();
        })
        .then((r) => {
          console.log(x, "start()", 2, r);
          this.$router.push(`/contents`);
        })
        .catch((r) => {
          console.log(x, "start()", 3, r);
          this.$router.push(`/accounts`);
        });
    },
  },

  watch: {},

  mounted() {

      // alert("111111");

    $common.api.env("VITE_API_BACKEND", "VITE_API_TOKEN")
    .then((r)=>{
      // alert(r);
      console.log(r);

    })



  },
};
</script>
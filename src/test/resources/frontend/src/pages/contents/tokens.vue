<template>
  <v-container class="pa-4" fluid>
    <v-card>
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
        {{ $t("contents.tokens.title") }}&nbsp;
      </v-card-title>

      <v-card-text>
        <v-form validate-on="eager" @update:model-value="formValidate">
          <v-text-field
            class="ma-2"
            v-model="provider"
            :rules="[$rules.requried]"
            label="provider"
            placeholder="provider"
            hint="provider"
            variant="outlined"
          ></v-text-field>
        </v-form>

        <v-textarea
          class="ma-2"
          v-if="token"
          label="token"
          variant="outlined"
          v-model="token"
          counter
          rows="12"
        ></v-textarea>
      </v-card-text>

      <v-card-actions>
        <v-btn
          v-if="!token"
          class="ms-5"
          variant="elevated"
          color="primary"
          text="Create"
          :disabled="!validate"
          @click="createAction(e)"
        ></v-btn>

        <v-btn
          v-if="token"
          class="ms-5"
          variant="elevated"
          color="primary"
          text="Copy"
          :disabled="!validate"
          @click="copyAction(e)"
        ></v-btn>

        <v-spacer></v-spacer>
        <v-btn
          v-if="token"
          class="ms-5"
          variant="elevated"
          text="Clear"
          @click="cancelAction()"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
const x = "[/contents/foos]";
// import $accountsApi from "@/assets/apis/accounts.js";
import $contentsApi from "@/assets/apis/contents.js";

export default {
  data: () => ({
    validate: false,
    provider: undefined,
    token: undefined,
  }),

  methods: {
    confirmBefore(code) {
      let msg = this.$t(`$dialog.before.${code}`);
      return this.$dialog.confirm(msg);
    },
    confirmAfter(code) {
      let msg = this.$t(`$dialog.after.${code}`);
      return this.$dialog.alert(msg);
    },
    confirmError(code) {
      let msg = this.$t(`$dialog.error.${code}`);
      return this.$dialog.alert(msg, code);
    },

    formValidate(v) {
      this.validate = v;
    },

    createAction() {
      $contentsApi.tokens
        .create(this.provider)
        .then((r) => {
          this.token = r;
        })
        .catch((e) => {
          return this.confirmError(e);
        });
    },

    cancelAction() {
      this.provider = undefined;
      this.token = undefined;
    },

    copyAction() {
      this.$clipboard
        .copy(this.token)
        .then((r) => {
          return this.confirmAfter("copy");
        })
        .catch((e) => {
          return this.confirmError(e);
        });
    },
  },
};
</script>

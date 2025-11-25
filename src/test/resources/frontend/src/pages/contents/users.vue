<template>
  <v-container class="pa-4" fluid>
    <v-card>
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
        {{ $t("contents.users.title") }}&nbsp;

        <v-text-field
          class="ms-10"
          v-model="searchEntity.keyword"
          density="compact"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          single-line
        ></v-text-field>
      </v-card-title>

      <v-divider></v-divider>

      <v-data-table-server
        fixed-header
        density="compact"
        :loading="loading"
        :search="config.search"
        :page="1"
        :items-per-page="20"
        :sort-by="config.sortBy"
        :items-per-page-options="config.itemsPerPageOptions"
        :headers="config.headers"
        :item-value="config.itemValue"
        :items-length="config.entitiesTotal"
        :items="config.entities"
        @update:options="searchAction"
      >
        <template v-slot:item.userId="{ item }">

          <v-btn
            :disabled="currentUser.userId == item.userId"
            variant="plain"
            color="primary"
            :text="item.userId"
            style="text-transform: none"
            @click="readAction(item)"
          ></v-btn>
        </template>

        <template v-slot:item.updated.timestamp="{ item }">
          {{ $moment.format(item.updated.timestamp) }}
        </template>

        <template v-slot:footer.prepend>
          <v-btn class="ms-1" text variant="elevated" @click="refreshAction">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>

          <v-spacer></v-spacer>
        </template>
      </v-data-table-server>

      <v-dialog v-model="dialog" persistent width="800">
        <v-card
          prepend-icon="mdi-update"
          :title="$t('contents.users.title')"
          :subtitle="editEntity.name"
        >
          <v-card-text>
            <v-form validate-on="eager" @update:model-value="api.validate">
              <v-text-field
                v-if="!isNew"
                v-model="editEntity.userId"
                :rules="[$rules.requried]"
                label="userId"
                placeholder="userId"
                disabled
                hint="......."
                variant="outlined"
              ></v-text-field>

              <v-select
                v-model="editEntity.roles"
                :rules="[$rules.requried]"
                chips
                label="Roles"
                :items="['ROLE_USER', 'ROLE_ADMIN']"
                multiple
                variant="outlined"
              ></v-select>


            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn
              class="ms-5"
              variant="elevated"
              color="primary"
              text="Save"
              :disabled="!validate"
              @click="isNew ? createAction(e) : updateAction(e)"
            ></v-btn>
            <v-btn text="Cancel" @click="cancelAction"></v-btn>

            <v-spacer></v-spacer>
            <v-btn
              v-if="!isNew"
              color="error"
              text="Delete"
              variant="text"
              @click="deleteAction"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
const x = "[/contents/users]";
import $contentsApi from "@/assets/apis/contents.js";
import $contentsStore from "@/assets/stores/contents.js";

export default {
  data() {
    const self = this;

    return {
      loading: false,
      dialog: false,
      isNew: false,
      validate: false,

      editEntity: {},
      searchEntity: {},

      config: {
        search: "",
        itemsPerPageOptions: [
          { value: 10, title: "10" },
          { value: 20, title: "20" },
          { value: 50, title: "50" },
          { value: 100, title: "100" },
        ],

        headers: [
          { title: "userId", key: "userId", align: "start" },
          { title: "roles", key: "roles", align: "end" },
          // { title: "updatedAddress", key: "updated.address", align: "end" },
          // { title: "updatedUsername", key: "updated.username", align: "end" },
          { title: "updatedTimestamp", key: "updated.timestamp", align: "end" },
        ],
        sortBy: [{ key: "updated.timestamp", order: "desc" }],
        itemValue: "userId",

        entities: [],
        entitiesTotal: 0,
        entity: {},
        initEntity: {},
      },

      api: {
        validate: (r) => {
          self.validate = r;
        },
        search: (r) => {
          return $contentsApi.users.search(self.searchEntity, r);
        },
        create: () => {
          return $contentsApi.users.create(self.editEntity);
        },
        read: (r) => {
          return $contentsApi.users.read(r);
        },
        update: () => {
          return $contentsApi.users.update(self.editEntity);
        },
        delete: () => {
          return $contentsApi.users.delete(self.editEntity);
        },
        entities: (r) => {
          self.config.entitiesTotal = r.page.totalElements;
          self.config.entities = r._embedded.users;
          return r;
        },
        entity: (r) => {
          self.editEntity = r ? r : Object.assign({}, self.config.initEntity);
          self.config.entity = r ? r : {};
          return r;
        },
      },
    };
  },

  computed: {
    subtitle: $contentsStore.computed.subtitle,
    currentUser: $contentsStore.computed.currentUser,

  },

  watch: {
    searchEntity: {
      handler(e) {
        this.refreshAction();
      },
      deep: true,
    },
  },

  methods: {
    ////////////////////////////////////////
    //
    ////////////////////////////////////////
    dialogOpen(isNew) {
      this.dialog = true;
      this.isNew = isNew;
      return "opened";
    },
    dialogClose() {
      this.dialog = false;
      this.isNew = false;
      return "closed";
    },

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

    actionStart(loading) {
      this.loading = true == loading ? true : false;
      return Promise.resolve();
    },
    actionEnd(refresh) {
      this.loading = false;
      if (true == refresh) {
        this.dialog = false;
        this.isNew = false;
        this.refreshAction();
      }
    },

    ////////////////////////////////////////
    //
    ////////////////////////////////////////
    refreshAction() {
      this.config.search = String(Date.now());
    },

    searchAction(data) {
      this.actionStart(true)
        .then((r) => {
          return this.api.search(data);
        })
        .then((r) => {
          return this.api.entities(r);
        })
        .then((r) => {
          return this.actionEnd(false);
        })
        .catch((e) => {
          return this.confirmError(e);
        })
        .catch((e) => {
          this.$router.push("/");
        });
    },

    newAction() {
      this.actionStart(true)
        .then((r) => {
          return this.api.entity();
        })
        .then((r) => {
          return this.dialogOpen(true);
        })
        .then((r) => {
          return this.actionEnd(false);
        });
    },

    cancelAction() {
      this.actionStart(true)
        .then((r) => {
          return this.dialogClose();
        })
        .then((r) => {
          return this.api.entity();
        })
        .then((r) => {
          return this.actionEnd(false);
        });
    },

    createAction(e) {
      this.confirmBefore("create")
        .then((r) => {
          return this.actionStart(true);
        })
        .then((r) => {
          return this.api.create();
        })
        .then((r) => {
          return this.confirmAfter("create");
        })
        .then((r) => {
          return this.api.entity();
        })
        .then((r) => {
          return this.actionEnd(true);
        })
        .catch((r) => {
          return this.confirmError(r);
        })
        .catch((r) => {
          return this.actionEnd(true);
        });
    },

    readAction(data) {
      this.actionStart(true)
        .then((r) => {
          return this.api.read(data);
        })
        .then((r) => {
          return this.api.entity(r);
        })
        .then((e) => {
          return this.dialogOpen(false);
        })
        .then((e) => {
          return this.actionEnd(false);
        })
        .catch((e) => {
          console.log(e);
          return this.confirmError(e);
        })
        .catch((e) => {
          return this.actionEnd(true);
        });
    },

    updateAction() {
      this.confirmBefore("update")
        .then((r) => {
          return this.actionStart(true);
        })
        .then((r) => {
          return this.api.update();
        })
        .then((r) => {
          return this.confirmAfter("update");
        })
        .then((r) => {
          return this.api.entity();
        })
        .then((r) => {
          return this.actionEnd(true);
        })
        .catch((r) => {
          return this.confirmError(r);
        })
        .catch((r) => {
          return this.actionEnd(true);
        });
    },

    deleteAction() {
      this.confirmBefore("delete")
        .then((r) => {
          return this.actionStart(true);
        })
        .then((r) => {
          return this.api.delete();
        })
        .then((r) => {
          return this.confirmAfter("delete");
        })
        .then((r) => {
          return this.api.entity();
        })
        .then((r) => {
          return this.actionEnd(true);
        })
        .catch((r) => {
          return this.confirmError(r);
        })
        .catch((r) => {
          return this.actionEnd(true);
        });
    },
  },

  mounted() {
    this.subtitle = x;


  },
};
</script>

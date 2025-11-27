import $common from "@/assets/apis/common.js";

import $accountsState from "@/assets/stores/accounts.js";
import $contentsState from "@/assets/stores/contents.js";
import { th } from "vuetify/locale";

const name = "[/assets/apis/contents.js]";

const $contentsApi = {
  api: {
    host() {
      return $common.api.host("VITE_API_BACKEND");
    },

    execute(optionsBuilder) {
      return $contentsApi.api
        .host()
        .then(optionsBuilder)
        .then((e) => {
          return $common.axios.execute(e);
        })
        .then((e) => {
          return $common.axios.then(e);
        })
        .catch((e) => {
          throw $common.axios.catch(e);
        });
    },

    headers(headers, token) {
      let oauth2 =
        token == undefined ? $accountsState.computed.oauth2.get() : token;
      return $common.api.auth(oauth2, headers, "headers");
    },
    params(params, token) {
      let oauth2 =
        token == undefined ? $accountsState.computed.oauth2.get() : token;
      return $common.api.auth(oauth2, params, "params");
    },
    query(params, token) {
      let oauth2 =
        token == undefined ? $accountsState.computed.oauth2.get() : token;
      return $common.api.auth(oauth2, params, "query");
    },

    pageable(data) {
      return $common.api.pageable(data);
    },

    link(base, data) {
      return $common.api.link(base, data);
    },
  },

  auditors: {
    currentUser() {
      let currentUser = $contentsState.computed.currentUser.get();
      if (currentUser) {
        return Promise.resolve(currentUser);
      } else {
        let oauth2 = $accountsState.computed.oauth2.get();
        if (!oauth2) return Promise.reject(false);

        return $contentsApi.users.read(oauth2.username).then((r) => {
          $contentsState.computed.currentUser.set(r);
          return r;
        });
      }
    },

    hasPermission(roles) {
      return $contentsApi.auditors.currentUser().then((user) => {
        let hasRole = false;
        for (let role of roles) {
          if (user.roles.includes(role)) {
            hasRole = true;
            break;
          }
        }
        if (hasRole) {
          return user;
        }
        throw user;
      });
    },

    hasNotPermission(roles) {
      return $contentsApi.auditors.currentUser().then((user) => {
        let hasRole = false;
        for (let role of roles) {
          if (user.roles.includes(role)) {
            hasRole = true;
            break;
          }
        }
        if (!hasRole) {
          return user;
        }
        throw user;
      });
    },
  },

  foos: {
    search(data, params) {
      return $contentsApi.api
        .execute((uri) => ({
          url: `${uri}/api/foos`,
          headers: $contentsApi.api.headers(),
          method: "GET",
          data: data,
          params: $common.api.pageable(params),
        }))
        .then((r) => {
          r.entitiesTotal = r.page.totalElements;
          r.entities = r._embedded.foos;
          return r;
        });
    },
    create(data) {
      return $contentsApi.api.execute((uri) => ({
        url: `${uri}/api/foos`,
        headers: $contentsApi.api.headers(),
        method: "POST",
        data: data,
      }));
    },
    read(data) {
      return $contentsApi.api.execute((uri) => ({
        url:
          typeof data === "string"
            ? `${uri}/api/users/${data}`
            : `${data._links.self.href}`,
        headers: $contentsApi.api.headers(),
        method: "GET",
      }));
    },
    update(data) {
      return $contentsApi.api.execute((uri) => ({
        url:
          typeof data === "string"
            ? `${uri}/api/users/${data}`
            : `${data._links.self.href}`,
        headers: $contentsApi.api.headers(),
        method: "PUT",
        data: data,
      }));
    },
    delete(data) {
      return $contentsApi.api.execute((uri) => ({
        url:
          typeof data === "string"
            ? `${uri}/api/users/${data}`
            : `${data._links.self.href}`,
        headers: $contentsApi.api.headers(),
        method: "DELETE",
      }));
    },
  },

  bars: {
    search(data, params) {
      return $contentsApi.api
        .execute((uri) => ({
          url: `${uri}/api/bars/search`,
          headers: $contentsApi.api.headers(),
          method: "POST",
          data: data,
          params: $common.api.pageable(params),
        }))
        .then((r) => {
          r.entitiesTotal = r.page.totalElements;
          r.entities = r._embedded.bars;
          return r;
        });
    },
    create(data) {
      return $contentsApi.api.execute((uri) => ({
        url: `${uri}/api/bars`,
        headers: $contentsApi.api.headers(),
        method: "POST",
        data: data,
      }));
    },
    read(data) {
      return $contentsApi.api.execute((uri) => ({
        url:
          typeof data === "string"
            ? `${uri}/api/users/${data}`
            : `${data._links.self.href}`,
        headers: $contentsApi.api.headers(),
        method: "POST",
      }));
    },
    update(data) {
      return $contentsApi.api.execute((uri) => ({
        url:
          typeof data === "string"
            ? `${uri}/api/users/${data}`
            : `${data._links.self.href}`,
        headers: $contentsApi.api.headers(),
        method: "PUT",
        data: data,
      }));
    },
    delete(data) {
      return $contentsApi.api.execute((uri) => ({
        url:
          typeof data === "string"
            ? `${uri}/api/users/${data}`
            : `${data._links.self.href}`,
        headers: $contentsApi.api.headers(),
        method: "DELETE",
      }));
    },
  },

  users: {
    search(data, params) {
      return $contentsApi.api
        .execute((uri) => ({
          url: `${uri}/api/users/search`,
          headers: $contentsApi.api.headers(),
          method: "POST",
          data: data,
          params: $common.api.pageable(params),
        }))
        .then((r) => {
          r.entitiesTotal = r.page.totalElements;
          r.entities = r._embedded.users;
          return r;
        });
    },
    create(data) {
      return $contentsApi.api.execute((uri) => ({
        url: `${uri}/api/users`,
        headers: $contentsApi.api.headers(),
        method: "POST",
        data: data,
      }));
    },
    read(data) {
      return $contentsApi.api.execute((uri) => ({
        url:
          typeof data === "string"
            ? `${uri}/api/users/${data}`
            : `${data._links.self.href}`,
        headers: $contentsApi.api.headers(),
        method: "POST",
      }));
    },
    update(data) {
      return $contentsApi.api.execute((uri) => ({
        url:
          typeof data === "string"
            ? `${uri}/api/users/${data}`
            : `${data._links.self.href}`,
        headers: $contentsApi.api.headers(),
        method: "PUT",
        data: data,
      }));
    },
    delete(data) {
      return $contentsApi.api.execute((uri) => ({
        url:
          typeof data === "string"
            ? `${uri}/api/users/${data}`
            : `${data._links.self.href}`,
        headers: $contentsApi.api.headers(),
        method: "DELETE",
      }));
    },
  },

  items: {
    search(data, params) {
      return $contentsApi.api
        .execute((uri) => ({
          url: `${uri}/api/items/search`,
          headers: $contentsApi.api.headers(),
          method: "POST",
          data: data,
          params: $common.api.pageable(params),
        }))
        .then((r) => {
          r.entitiesTotal = r.page.totalElements;
          r.entities = r._embedded.items;
          return r;
        });
    },
    create(data) {
      return $contentsApi.api.execute((uri) => ({
        url: `${uri}/api/items`,
        headers: $contentsApi.api.headers(),
        method: "POST",
        data: data,
      }));
    },
    read(data) {
      return $contentsApi.api.execute((uri) => ({
        url:
          typeof data === "string"
            ? `${uri}/api/items/${data}`
            : `${data._links.self.href}`,
        headers: $contentsApi.api.headers(),
        method: "POST",
      }));
    },
    update(data) {
      return $contentsApi.api.execute((uri) => ({
        url:
          typeof data === "string"
            ? `${uri}/api/items/${data}`
            : `${data._links.self.href}`,
        headers: $contentsApi.api.headers(),
        method: "PUT",
        data: data,
      }));
    },
    delete(data) {
      return $contentsApi.api.execute((uri) => ({
        url:
          typeof data === "string"
            ? `${uri}/api/items/${data}`
            : `${data._links.self.href}`,
        headers: $contentsApi.api.headers(),
        method: "DELETE",
      }));
    },
  },

  tokens: {
    create(provider) {
      return $contentsApi.api.execute((uri) => ({
        url: `${uri}/oauth2/login`,
        headers: $contentsApi.api.headers(),
        method: "POST",
        params: { provider: provider },
      }));
    },
  },
};
export default $contentsApi;

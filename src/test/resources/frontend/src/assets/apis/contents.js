import $common from "@/assets/apis/common.js";

import $contentsStore from "@/assets/stores/contents.js";

const name = "[/assets/apis/contents.js]";

const $contentsApi = {
  api: {
    execute(optionsBuilder) {
      return $common.api
        .env("VITE_API_BACKEND", "VITE_API_TOKEN")
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

    url(env, data) {
      if (typeof data == "object") {
        return `${data._links.self.href}`;
      } else {
        return `${env["VITE_API_BACKEND"]}${data}`;
      }
    },

    headers(env, headers) {
      // let t = env["VITE_API_TOKEN"];
      // let token = t == undefined ? $commonStore.computed.oauth2.get() : t;
      let token = env["VITE_API_TOKEN"];

      if(token == undefined) {
        return (headers == undefined) ? {} : headers;
      }
      let authorization = `Bearer ${token}`;
      if (headers == undefined) {
        return { Authorization: authorization };
      } else {
        headers["Authorization"] = authorization;
        return headers;
      }
    },

    pageable(data) {
      return $common.api.pageable(data);
    },
  },

  foos: {
    search(data, params) {
      return $contentsApi.api
        .execute((e) => ({
          method: "GET",
          url: $contentsApi.api.url(e, "/api/foos"),
          headers: $contentsApi.api.headers(e, {}),
          params: $contentsApi.api.pageable(params),
          data: data,
        }))
        .then((r) => {
          r.entitiesTotal = r.page.totalElements;
          r.entities = r._embedded.foos;
          return r;
        });
    },
    create(data) {
      return $contentsApi.api.execute((e) => ({
        method: "POST",
        url: $contentsApi.api.url(e, "/api/foos"),
        headers: $contentsApi.api.headers(e, {}),
        data: data,
      }));
    },
    read(data) {
      return $contentsApi.api.execute((e) => ({
        method: "GET",
        url: $contentsApi.api.url(e, data),
        headers: $contentsApi.api.headers(e, {}),
      }));
    },
    update(data) {
      return $contentsApi.api.execute((e) => ({
        method: "PUT",
        url: $contentsApi.api.url(e, data),
        headers: $contentsApi.api.headers(e, {}),
        data: data,
      }));
    },
    delete(data) {
      return $contentsApi.api.execute((e) => ({
        method: "DELETE",
        url: $contentsApi.api.url(e, data),
        headers: $contentsApi.api.headers(e, {}),
      }));
    },
  },

  bars: {
    search(data, params) {
      return $contentsApi.api
        .execute((e) => ({
          method: "POST",
          url: $contentsApi.api.url(e, "/api/bars/search"),
          headers: $contentsApi.api.headers(e, {}),
          params: $contentsApi.api.pageable(params),
          data: data,
        }))
        .then((r) => {
          r.entitiesTotal = r.page.totalElements;
          r.entities = r._embedded.bars;
          return r;
        });
    },
    create(data) {
      return $contentsApi.api.execute((e) => ({
        method: "POST",
        url: $contentsApi.api.url(e, "/api/bars"),
        headers: $contentsApi.api.headers(e, {}),
        data: data,
      }));
    },
    read(data) {
      return $contentsApi.api.execute((e) => ({
        method: "POST",
        url: $contentsApi.api.url(e, data),
        headers: $contentsApi.api.headers(e, {}),
      }));
    },
    update(data) {
      return $contentsApi.api.execute((e) => ({
        method: "PUT",
        url: $contentsApi.api.url(e, data),
        headers: $contentsApi.api.headers(e, {}),
        data: data,
      }));
    },
    delete(data) {
      return $contentsApi.api.execute((e) => ({
        method: "DELETE",
        url: $contentsApi.api.url(e, data),
        headers: $contentsApi.api.headers(e, {}),
      }));
    },
  },

  items: {
    search(data, params) {
      return $contentsApi.api
        .execute((e) => ({
          method: "POST",
          url: $contentsApi.api.url(e, "/api/items/search"),
          headers: $contentsApi.api.headers(e, {}),
          params: $contentsApi.api.pageable(params),
          data: data,
        }))
        .then((r) => {
          r.entitiesTotal = r.page.totalElements;
          r.entities = r._embedded.items;
          return r;
        });
    },
    create(data) {
      return $contentsApi.api.execute((e) => ({
        method: "POST",
        url: $contentsApi.api.url(e, "/api/items"),
        headers: $contentsApi.api.headers(e, {}),
        data: data,
      }));
    },
    read(data) {
      return $contentsApi.api.execute((e) => ({
        method: "POST",
        url: $contentsApi.api.url(e, data),
        headers: $contentsApi.api.headers(e, {}),
      }));
    },
    update(data) {
      return $contentsApi.api.execute((e) => ({
        method: "PUT",
        url: $contentsApi.api.url(e, data),
        headers: $contentsApi.api.headers(e, {}),
        data: data,
      }));
    },
    delete(data) {
      return $contentsApi.api.execute((e) => ({
        method: "DELETE",
        url: $contentsApi.api.url(e, data),
        headers: $contentsApi.api.headers(e, {}),
      }));
    },
  },

  users: {
    search(data, params) {
      return $contentsApi.api
        .execute((e) => ({
          method: "POST",
          url: $contentsApi.api.url(e, "/api/users/search"),
          headers: $contentsApi.api.headers(e, {}),
          params: $contentsApi.api.pageable(params),
          data: data,
        }))
        .then((r) => {
          r.entitiesTotal = r.page.totalElements;
          r.entities = r._embedded.users;
          return r;
        });
    },
    create(data) {
      return $contentsApi.api.execute((e) => ({
        method: "POST",
        url: $contentsApi.api.url(e, "/api/users"),
        headers: $contentsApi.api.headers(e, {}),
        data: data,
      }));
    },
    read(data) {
      return $contentsApi.api.execute((e) => ({
        method: "POST",
        url: $contentsApi.api.url(e, data),
        headers: $contentsApi.api.headers(e, {}),
      }));
    },
    update(data) {
      return $contentsApi.api.execute((e) => ({
        method: "PUT",
        url: $contentsApi.api.url(e, data),
        headers: $contentsApi.api.headers(e, {}),
        data: data,
      }));
    },
    delete(data) {
      return $contentsApi.api.execute((e) => ({
        method: "DELETE",
        url: $contentsApi.api.url(e, data),
        headers: $contentsApi.api.headers(e, {}),
      }));
    },
  },

  oauth2: {
    info() {
      return $contentsApi.api.execute((e) => {
        let options = {
          method: "GET",
          url: $contentsApi.api.url(e, "/api/oauth2/userinfo"),
          headers: $contentsApi.api.headers(e, {}),
        };
        return options;
      }).then(r => {
        $contentsStore.computed.currentUser.set(r);
        return r;
      });
    },

    permission(roles) {
      return $contentsApi.oauth2.info().then((user) => {
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

    permissionNot(roles) {
      return $contentsApi.oauth2.info().then((user) => {
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
};

export default $contentsApi;
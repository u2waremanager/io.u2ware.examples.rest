import $common from "@/assets/apis/common.js";

import $accountsState from "@/assets/stores/accounts.js";
import $contentsState from "@/assets/stores/contents.js";
import { th } from "vuetify/locale";

const name = "[/assets/apis/contents.js]";

const $contents = {
  api: {
    host() {
      return $common.api.host("VITE_API_BACKEND");
    },

    execute(optionsBuilder) {
      return $contents.api
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

  foos: {
    search(data, params) {
      return $contents.api.execute((uri) => ({
        url: `${uri}/api/foos`,
        headers: $contents.api.headers(),
        method: "GET",
        data: data,
        params: $common.api.pageable(params),
      }));
    },
		create(data){
			return $contents.api.execute((uri)=> ({
				url: `${uri}/api/foos`,
        headers: $contents.api.headers(),
				method : 'POST',
				data: data,
			}));
		},
		read(data){
			return $contents.api.execute((uri)=> ({
				url: (typeof data === 'string') ? `${uri}/api/users/${data}` : `${data._links.self.href}`,
        headers: $contents.api.headers(),
				method : 'GET',
			}));
		},
		update(data){
			return $contents.api.execute((uri)=> ({
				url: (typeof data === 'string') ? `${uri}/api/users/${data}` : `${data._links.self.href}`,
        headers: $contents.api.headers(),
				method : 'PUT',
				data : data
			}));
		},
		delete(data){
			return $contents.api.execute((uri)=> ({
				url: (typeof data === 'string') ? `${uri}/api/users/${data}` : `${data._links.self.href}`,
        headers: $contents.api.headers(),
				method : 'DELETE',
			}));
		}
  },

  bars: {
    search(data, params) {
      return $contents.api.execute((uri) => ({
        url: `${uri}/api/bars/search`,
        headers: $contents.api.headers(),
        method: "POST",
        data: data,
        params: $common.api.pageable(params),
      }));
    },
		create(data){
			return $contents.api.execute((uri)=> ({
				url: `${uri}/api/bars`,
        headers: $contents.api.headers(),
				method : 'POST',
				data: data,
			}));
		},
		read(data){
			return $contents.api.execute((uri)=> ({
				url: (typeof data === 'string') ? `${uri}/api/users/${data}` : `${data._links.self.href}`,
        headers: $contents.api.headers(),
				method : 'POST',
			}));
		},
		update(data){
			return $contents.api.execute((uri)=> ({
				url: (typeof data === 'string') ? `${uri}/api/users/${data}` : `${data._links.self.href}`,
        headers: $contents.api.headers(),
				method : 'PUT',
				data : data
			}));
		},
		delete(data){
			return $contents.api.execute((uri)=> ({
				url: (typeof data === 'string') ? `${uri}/api/users/${data}` : `${data._links.self.href}`,
        headers: $contents.api.headers(),
				method : 'DELETE',
			}));
		}    
  },

  users: {

    search(data, params) {
      return $contents.api.execute((uri) => ({
        url: `${uri}/api/users/search`,
        headers: $contents.api.headers(),
        method: "POST",
        data: data,
        params: $common.api.pageable(params),
      }));
    },
		create(data){
			return $contents.api.execute((uri)=> ({
				url: `${uri}/api/users`,
        headers: $contents.api.headers(),
				method : 'POST',
				data: data,
			}));
		},
		read(data){
			return $contents.api.execute((uri)=> ({
				url: (typeof data === 'string') ? `${uri}/api/users/${data}` : `${data._links.self.href}`,
        headers: $contents.api.headers(),
				method : 'POST',
			}));
		},
		update(data){
			return $contents.api.execute((uri)=> ({
				url: (typeof data === 'string') ? `${uri}/api/users/${data}` : `${data._links.self.href}`,
        headers: $contents.api.headers(),
				method : 'PUT',
				data : data
			}));
		},
		delete(data){
			return $contents.api.execute((uri)=> ({
				url: (typeof data === 'string') ? `${uri}/api/users/${data}` : `${data._links.self.href}`,
        headers: $contents.api.headers(),
				method : 'DELETE',
			}));
		}    
  },


  auditors: {

    currentUser(){
      let currentUser = $contentsState.computed.currentUser.get();
      if(currentUser){
        return Promise.resolve(currentUser);
      }else{
        let oauth2 = $accountsState.computed.oauth2.get();
        if(! oauth2) return Promise.reject(false);

        return $contents.users.read(oauth2.username).then(r=>{
          $contentsState.computed.currentUser.set(r);
          return r;
        });
      }
    },

    hasPermission(roles){
      return $contents.auditors.currentUser()
        .then(user=>{
          let hasRole = false;
          for(let role of roles){
            if(user.roles.includes(role)){
              hasRole = true;
              break;
            }
          }      
          if(hasRole){
            return user;
          }
          throw user;
        });  
    },

    hasNotPermission(roles){
      return $contents.auditors.currentUser()
        .then(user=>{
          let hasRole = false;
          for(let role of roles){
            if(user.roles.includes(role)){
              hasRole = true;
              break;
            }
          }          
          if(! hasRole){
            return user;
          }
          throw user;
        });  
    },

  }

};
export default $contents;

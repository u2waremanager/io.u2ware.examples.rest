import qs from "qs";
import $axios from "axios";

const name = "[/assets/apis/common.js]";

const $common = {

  ////////////////////////////////////
  // Axios Utils..
  ////////////////////////////////////
  axios : {
    
    execute(options) {
      options["paramsSerializer"] = (p)=>{
        return qs.stringify(p, { arrayFormat: "repeat" });
      },
      options["timestamp"] = new Date().getTime();
      if (options.data) console.log(options.timestamp, options.url, options.data);
      else console.log(options.timestamp, options.url);
      return $axios(options);
    },

    then(r) {
      if (r && r.config) {
        let options = r.config;
        let headers = r.headers;
        if (headers["content-type"].includes("json")) {
          console.log(options.timestamp, options.url, r.status);
        } else {
          console.log(options.timestamp, options.url, "Not JSON");
          throw 404;
        }
      }
      return r.data;
    },

    catch(e) {
      if (e && e.response && e.response.config) {
        let options = e.response.config;
        console.log(options.timestamp, options.url, e.response.status, options);
        throw e.response.status;
      }
      if (e && e.config) {
        let options = e.config;
        console.log(options.timestamp, options.url, "Network Error");
        throw 404;
      }
      throw e;
    },
  },


  api : {

    jwt(token){
      let base64Payload = token.split('.')[1];
      let base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
      let decodedJWT = JSON.parse(
            decodeURIComponent(
              window
                .atob(base64)
                .split('')
                .map(function (c) {
                  return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        )
      );
      return decodedJWT;
    },



    auth(oauth2, target, type) {
      let token_type = "bearar";
      let id_token = oauth2;

      if (typeof oauth2 == "object") { 
        token_type = oauth2.token_type;
        id_token = oauth2.id_token;
      }

      if("headers" == type || undefined == type) { // headers..
        const authorization = `${token_type} ${id_token}`;
        if (target == undefined) {
          return { Authorization: authorization };
        } else {
          target["Authorization"] = authorization;
          return target;
        }
      }else if("params" == type){ // params
        if (target == undefined) {
          return { access_token: id_token };
        } else {
          target["access_token"] = id_token;
          return target;
        }
      }else if("query" == type){ // query
        let p = $common.api.auth(oauth2, target, "params");
        let v = qs.stringify(p, { arrayFormat: "repeat" });
        return v;
      }
    },



    // headers(headers, token) {
    //   let oauth2 =
    //     token == undefined ? $accountsState.computed.oauth2.get() : token;
    //   return $common.api.auth(oauth2, headers, "headers");
    // },
    // params(params, token) {
    //   let oauth2 =
    //     token == undefined ? $accountsState.computed.oauth2.get() : token;
    //   return $common.api.auth(oauth2, params, "params");
    // },
    // query(params, token) {
    //   let oauth2 =
    //     token == undefined ? $accountsState.computed.oauth2.get() : token;
    //   return $common.api.auth(oauth2, params, "query");
    // },












    
    pageable(data) {
      if (!data) return {};
      const sort = [];
      if (data.sortBy != undefined) {
        data.sortBy.forEach((s, i) => {
          sort.push(s.key + "," + s.order);
        });
      }
      let pageRequest = {
        size: data.itemsPerPage,
        page: data.page - 1,
        sort: sort,
      };
      return pageRequest;
    },

    link(base, data) {
      if (typeof data == "object") {
        return `${data._links.self.href}`;
      } else {
        return `${base}/${data}`;
      }
    },   


    env() {

      return $axios({
        method : 'OPTIONS',
        url: "/vite",
      })
      .then((r) => {
        // console.log(1, arguments, r.data);
        let result = {};
        for(let i=0; i < arguments.length; i++) {

          let p = `${arguments[i].toLowerCase()}`;
          p = p.startsWith("vite_") ? p.substr(5) : p;
          p = p.replaceAll('_', '.');

          let value = r.data[p];

          if(value == undefined) {
            let k = `${arguments[i].toUpperCase()}`;
            k = k.startsWith("VITE_") ? k : `VITE_${k}`;
            value = import.meta.env[k];
            // console.log(21, k, value);

          }else{
            // console.log(22, p, value);
          }
          result[arguments[i]] = value;
        }
        return result;
      })
      .catch((e) => {
        // console.log(2, arguments, e);

        let result = {};
        for(let i=0; i < arguments.length; i++) {

          let k = `${arguments[i].toUpperCase()}`;
          k = k.startsWith("VITE_") ? k : `VITE_${k}`;
          value = import.meta.env[k];
          // console.log(21, k, value);
        }
        return result;
      });
    }
  },

}
export default $common;
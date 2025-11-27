import useClipboard from 'vue-clipboard3'

// import $i18n from "./locales";
// const $t = $i18n.global.t;

const _clipboard = {

    copy : (val)=>{
        const { toClipboard } = useClipboard();
        return toClipboard(val);
    }
}

export default {


  install: (app, options) => {


    app.config.globalProperties.$clipboard = _clipboard; 
    app.provide('$clipboard', _clipboard)     
  },
};
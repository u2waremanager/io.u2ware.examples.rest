import $i18n from "./locales";
const $t = $i18n.global.t;

export default {
  install: (app, options) => {
    const _rules = {
      requried: (value) => {

        if(Array.isArray(value)){ 
          if (value.length > 0) return true;
          return $t("$rules.required");
        }
        if (value) return true;
        return $t("$rules.required");
      },

      email: (value) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (pattern.test(value)) return true;
        return $t("$rules.email");
      },

      number: (value) => {
        const pattern = /^[0-9]+$/;
        if (pattern.test(value)) return true;
        return $t("$rules.number");
      },
    };

    app.config.globalProperties.$rules = _rules;
    app.provide("$rules", _rules);
  },
};

import Vue from "vue";
import Vuetify from "vuetify/lib";
import ru from "vuetify/lib/locale/ru";
Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#009688",
        secondary: "#ff5722",
        accent: "#00bcd4",
        error: "#f44336",
        warning: "#ff9800",
        info: "#607d8b",
        success: "#4caf50"
      }
    }
  },
  lang: {
    locales: { ru },
    current: "ru"
  }
});

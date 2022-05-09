import Vuex from "vuex";
import Vue from "vue";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
import posts from "./modules/posts";

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    auth,
    posts
  },
  plugins: [createPersistedState()]
});

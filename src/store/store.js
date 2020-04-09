import Vue from "vue";
import Vuex from "vuex";
import dataJson from "@/data/data.json";
import { createProduct } from "../model/product";
import { crudTable } from "./crudTable.module";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    crudTable: crudTable()
  },
  state: { data: dataJson.map(e => createProduct(e)) },
  getters: {
    data: state => state.data
  },
  mutations: {
    setData: (state, payload) => {
      state.data = payload;
    },
    deleteItem: (state, item) => {
      state.data.splice(
        state.data.findIndex(e => e.artnumber === item.artnumber),
        1
      );
    },
    updateItem: (state, { artnumber, item }) => {
      state.data.splice(
        state.data.findIndex(e => e.artnumber === artnumber),
        1,
        item
      );
    },
    createItem: (state, item) => {
      state.data.push(item);
    }
  },
  actions: {}
});

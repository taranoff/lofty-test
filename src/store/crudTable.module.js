export const crudTable = () => ({
  namespaced: true,
  state: {
    rows: [],
    total: 0,
    lastFetchArgs: null
  },
  getters: {
    rows: state => state.rows,
    total: state => state.total
  },
  mutations: {
    setDisplayedPage: (state, { total, rows }) => {
      state.rows = rows;
      state.total = total;
    },
    saveFetchArgs: (state, obj) => {
      state.lastFetchArgs = obj;
    }
  },
  actions: {
    refreshPage: ({ dispatch, state }) => {
      if (state.lastFetchArgs) dispatch("fetchPage", state.lastFetchArgs);
    },
    fetchPage: (
      { rootGetters, commit },
      { start, itemsPerPage, sortBy, sortDesc }
    ) => {
      commit("saveFetchArgs", { start, itemsPerPage, sortBy, sortDesc });
      return new Promise(resolve => {
        setTimeout(() => {
          let data = [...rootGetters.data];
          if (sortBy && sortDesc) {
            data.sort((a, b) => {
              const sortA = a[sortBy[0]];
              const sortB = b[sortBy[0]];

              if (sortDesc[0]) {
                if (sortA < sortB) return 1;
                if (sortA > sortB) return -1;
                return 0;
              } else {
                if (sortA < sortB) return -1;
                if (sortA > sortB) return 1;
                return 0;
              }
            });
          }

          let result = {
            total: data.length,
            rows: data.slice(start, start + itemsPerPage)
          };

          commit("setDisplayedPage", result);

          resolve(result);
        }, 500);
      });
    },
    deleteItem: ({ commit, dispatch }, item) => {
      return Promise.resolve(true).then(() => {
        commit("deleteItem", item);
      }).then(()=>{
          dispatch('refreshPage');
      });
    },
    updateItem: ({ commit }, { artnumber, item }) => {
      return Promise.resolve(item).then(() => {
        commit("updateItem", { artnumber, item });
      });
    },
    createItem: ({ commit }, item) => {
      return Promise.resolve(item).then(() => {
        commit("createItem", item);
      });
    }
  }
});

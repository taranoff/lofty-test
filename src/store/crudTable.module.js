export const crudTable = () => ({
  namespaced: true,
  state: {
    rows: [],
    total: 0,
    loading: false,
    lastFetchArgs: null
  },
  getters: {
    rows: state => state.rows,
    total: state => state.total,
    loading: state => state.loading
  },
  mutations: {
    setDisplayedPage: (state, { total, rows }) => {
      state.rows = rows;
      state.total = total;
    },
    saveFetchArgs: (state, obj) => {
      state.lastFetchArgs = obj;
    },
    setLoading: (state, value = false) => {
      state.loading = value;
    }
  },
  actions: {
    refreshPage: ({ dispatch, state }, setLoading) => {
      if (state.lastFetchArgs)
        dispatch("fetchPage", { ...state.lastFetchArgs, setLoading });
    },
    fetchPage: (
      { rootGetters, commit },
      { start, itemsPerPage, sortBy, sortDesc, setLoading = true }
    ) => {
      commit("saveFetchArgs", { start, itemsPerPage, sortBy, sortDesc });
      setLoading && commit("setLoading", true);
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
      }).then(() => {
        setLoading && commit("setLoading", false);
      });
    },
    deleteItem: ({ commit, dispatch }, item) => {
      return Promise.resolve(true)
        .then(() => {
          commit("setLoading", true);
          commit("deleteItem", item, { root: true });
        })
        .then(() => {
          dispatch("refreshPage");
        });
    },
    updateItem: ({ commit, dispatch }, { artnumber, item }) => {
      return Promise.resolve(item)
        .then(() => {
          commit("setLoading", true);
          commit("updateItem", { artnumber, item }, { root: true });
        })
        .then(() => {
          dispatch("refreshPage");
        });
    },
    createItem: ({ commit, dispatch }, item) => {
      return Promise.resolve(item)
        .then(() => {
          commit("setLoading", true);
          commit("createItem", item, { root: true });
        })
        .then(() => {
          dispatch("refreshPage");
        });
    }
  }
});

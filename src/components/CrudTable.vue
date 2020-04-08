<template>
  <v-data-table
    :headers="tableHeaders"
    :items="tableRows"
    :options.sync="tableParams"
    :server-items-length="totalRows"
    :loading="tableLoading"
    class="elevation-1"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:item.stock="{ item: { stock } }">
      <v-icon small class="mr-2">
        {{ stock ? "mdi-checkbox-marked" : "mdi-checkbox-blank-outline" }}
      </v-icon>
    </template>
  </v-data-table>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "CrudTable",
  data: () => ({
    tableRows: [],
    totalRows: 0,
    tableLoading: false,
    tableParams: {}
  }),
  computed: {
    tableHeaders() {
      return [
        {
          text: "Артикул",
          align: "start",
          value: "artnumber"
        },
        { text: "Наименивание товара", value: "name" },
        { text: "Бренд", value: "brand" },
        { text: "Вес", value: "weight" },
        { text: "Количество", value: "quantity" },
        { text: "Цена", value: "price" },
        { text: "В наличии", value: "stock" },
        { text: "", value: "actions", sortable: false }
      ];
    }
  },
  watch: {
    tableParams() {
      this.fetch();
    }
  },
  methods: {
    ...mapActions(["fetchPage"]),
    deleteItem(item) {
      this.$emit("delete-item", item, this);
    },
    editItem(item) {
      this.$emit("edit-item", item);
    },
    fetch() {
      this.tableLoading = true;
      let {
        sortBy = null,
        sortDesc = null,
        page = 1,
        itemsPerPage = 5
      } = this.tableParams;
      const start = (page - 1) * itemsPerPage;
      if (!~itemsPerPage) {
        itemsPerPage = 1000;
      }
      return this.fetchPage({ start, itemsPerPage, sortBy, sortDesc })
        .then(response => {
          console.log({ response });
          this.totalRows = response.total;
          this.tableRows = response.data;
        })
        .then(e => {
          this.tableLoading = false;
          return e;
        });
    }
  },
  mounted() {
    this.fetch();
  }
};
</script>

<style scoped></style>

<template>
  <v-data-table
    :headers="tableHeaders"
    :items="tableRows"
    :options.sync="tableParams"
    :server-items-length="totalRows"
    :loading="tableLoading"
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CrudTable",
  data: () => ({
    tableParams: {}
  }),
  computed: {
    ...mapGetters({
      tableRows: "crudTable/rows",
      totalRows: "crudTable/total",
      tableLoading: "crudTable/loading"
    }),
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
  mounted() {
    if (this.$route.params.perPage && this.$route.params.pageNum)
      this.setOptions(this.$route.params.perPage, this.$route.params.pageNum);
    else this.fetch();
  },
  methods: {
    ...mapActions({ fetchPage: "crudTable/fetchPage" }),
    setOptions(perPage, pageNum) {
      this.tableParams.page = +pageNum;
      this.tableParams.itemsPerPage = +perPage;
    },
    deleteItem(item) {
      this.$emit("delete-item", item, this);
    },
    editItem(item) {
      this.$emit("edit-item", item);
    },
    fetch() {
      let {
        sortBy = null,
        sortDesc = null,
        page = 1,
        itemsPerPage = 5
      } = this.tableParams;
      console.log("tableParams", this.tableParams);
      const start = (page - 1) * itemsPerPage;
      if (!~itemsPerPage) {
        itemsPerPage = 1000;
      }
      this.$router.push({
        name: "home",
        params: { perPage: itemsPerPage, pageNum: page }
      });
      return this.fetchPage({ start, itemsPerPage, sortBy, sortDesc });
    }
  }
};
</script>

<style scoped></style>

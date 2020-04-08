<template>
  <v-container fill-height>
    <v-row>
      <v-col :md="12"><v-btn class="primary">Создать новый товар</v-btn></v-col>
    </v-row>
    <v-row>
      <v-col :md="12">
        <crud-table @delete-item="onDelete"></crud-table>
      </v-col>
    </v-row>
    <confirm-delete ref="deleteDialog" />
  </v-container>
</template>

<script>
import CrudTable from "../components/CrudTable";
import { mapActions } from "vuex";
import ConfirmDelete from "../components/ConfirmDelete";

export default {
  name: "home",
  components: {
    ConfirmDelete,
    CrudTable
    // HelloWorld
  },
  methods: {
    ...mapActions(["deleteItem", "updateItem", "createItem"]),
    onDelete(item) {
      const _this = this;
      this.$refs.deleteDialog.show({
        okAction: () => {
          _this.deleteItem(item);
        }
      });
    }
  }
};
</script>

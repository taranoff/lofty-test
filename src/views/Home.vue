<template>
  <v-container fill-height>
    <v-row>
      <v-col :cols="12">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col :md="12"
                ><v-btn class="primary" @click="onCreate"
                  >Создать новый товар</v-btn
                ></v-col
              >
            </v-row>
            <v-row>
              <v-col :md="12">
                <crud-table
                  @delete-item="onDelete"
                  @edit-item="onEdit"
                ></crud-table>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <confirm-delete ref="deleteDialog" />
    <create-edit-modal ref="createEditDialog" />
  </v-container>
</template>

<script>
import CrudTable from "../components/CrudTable";
import { mapActions } from "vuex";
import ConfirmDelete from "../components/ConfirmDelete";
import CreateEditModal from "../components/CreateEditModal";

export default {
  name: "Home",
  components: {
    CreateEditModal,
    ConfirmDelete,
    CrudTable
    // HelloWorld
  },
  methods: {
    ...mapActions("crudTable", ["deleteItem", "updateItem", "createItem"]),
    onDelete(item) {
      const _this = this;
      this.$refs.deleteDialog.show({
        okAction: () => {
          _this.deleteItem(item);
        }
      });
    },
    onCreate() {
      const _this = this;
      this.$refs.createEditDialog.show({
        okAction: ({ item }) => {
          console.log("okAction", item);
          _this.createItem(item);
        }
      });
    },
    onEdit(item) {
      const _this = this;
      this.$refs.createEditDialog.show({
        mode: "edit",
        item,
        okAction: ({ artnumber, item }) => {
          console.log("okAction", { artnumber, item });
          _this.updateItem({ artnumber, item });
        }
      });
    }
  }
};
</script>

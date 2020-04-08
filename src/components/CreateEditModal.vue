<template>
  <v-dialog v-model="dialogShown" persistent max-width="400">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text> </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="danger" text @click="onOk">
          {{ btnOkLabel }}
        </v-btn>
        <v-btn color="primary" text @click="onCancel">
          {{ btnCancelLabel }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { createProduct } from "../model/product";

export default {
  name: "CreateEditModal",
  data: () => ({
    model: createProduct({}),
    mode: "edit",
    item: createProduct({}),
    dialogShown: false,
    okAction: () => {},
    cancelAction: () => {},
    btnOkLabel: "Сохранить",
    btnCancelLabel: "Отмена"
  }),
  computed: {
    title() {
      return (this.mode === "edit" && "Редактирование товара") || "Новый товар";
    }
  },
  methods: {
    reset() {
      this.model = createProduct({});
      this.item = createProduct({});
      this.okAction = () => {};
      this.cancelAction = () => {};
    },
    show({
      item = createProduct({}),
      okAction = () => {},
      cancelAction = () => {}
    }) {
      this.reset();
    },
    onOk() {
      this.okAction();
    },
    onCancel() {
      this.cancelAction();
    }
  }
};
</script>

<style scoped></style>

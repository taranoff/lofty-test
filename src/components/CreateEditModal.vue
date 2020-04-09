<template>
  <v-dialog v-model="dialogShown" persistent max-width="500">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="formValid" lazy-validation>
          <v-row>
            <v-col :cols="12" :md="6">
              <v-text-field
                v-model="model.name"
                :counter="255"
                :rules="rules.name"
                label="Наименование товара"
                required
              ></v-text-field>
            </v-col>
            <v-col :cols="12" :md="6">
              <v-text-field
                v-model="model.brand"
                :counter="255"
                :rules="rules.brand"
                label="Бренд"
                required
              ></v-text-field>
            </v-col>
            <v-col :cols="12" :md="6">
              <v-text-field
                v-model="model.artnumber"
                :counter="10"
                :rules="rules.artnumber"
                label="Артикул"
                required
              ></v-text-field>
            </v-col>

            <v-col :cols="12" :md="6">
              <v-text-field
                v-model="model.weight"
                :counter="10"
                :rules="rules.weight"
                label="Вес"
                required
              ></v-text-field>
            </v-col>
            <v-col :cols="12" :md="6">
              <v-text-field
                v-model="model.quantity"
                :counter="10"
                :rules="rules.quantity"
                label="Количество"
                required
              ></v-text-field>
            </v-col>
            <v-col :cols="12" :md="6">
              <v-text-field
                v-model="model.price"
                :counter="10"
                :rules="rules.price"
                label="Цена"
                required
              ></v-text-field>
            </v-col>
            <v-col :cols="12">
              <v-checkbox
                v-model="model.stock"
                :rules="rules.stock"
                label="В наличии"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="danger" text :disabled="!formValid" @click="onOk">
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
import { required } from "../validation/required";
import { onlyDigits } from "../validation/onlyDigits";
import { onlyFloat } from "../validation/onlyFloat";

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
    btnCancelLabel: "Отмена",
    formValid: false
  }),
  computed: {
    title() {
      return (this.mode === "edit" && "Редактирование товара") || "Новый товар";
    },

    rules() {
      return {
        artnumber: [required, onlyDigits],
        name: [required],
        brand: [], // optional
        weight: [required, onlyFloat],
        quantity: [required, onlyDigits],
        price: [required, onlyFloat],
        stock: []
      };
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
      cancelAction = () => {},
      mode = "new"
    }) {
      this.reset();
      this.model = createProduct(item);
      this.mode = mode;
      this.item = item;
      this.okAction = okAction;
      this.cancelAction = cancelAction;
      this.dialogShown = true;
    },
    onOk() {
      this.$refs.form.validate();
      if (this.model.stock) {
        this.model.stock = 1;
      } else {
        this.model.stock = 0;
      }
      this.okAction({ artnumber: this.item.artnumber, item: this.model });
      this.dialogShown = false;
    },
    onCancel() {
      this.cancelAction();
      this.dialogShown = false;
    }
  }
};
</script>

<style scoped></style>

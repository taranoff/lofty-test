<template>
  <v-dialog v-model="dialogShown" max-width="290">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>
        {{ text }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="danger" text @click="onOk">
          {{ btnOkLabel }}
        </v-btn>
        <v-btn color="accent" text @click="onCancel">
          {{ btnCancelLabel }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmDelete",
  props: {
    title: {
      type: String,
      default: "Удалить"
    },
    text: {
      type: String,
      default: "Навсегда и безвозвратно"
    },
    btnOkLabel: {
      type: String,
      default: "Да"
    },
    btnCancelLabel: {
      type: String,
      default: "Передумал(а)"
    }
  },
  data: () => ({
    dialogShown: false,
    okAction: () => {},
    cancelAction: () => {}
  }),
  methods: {
    onOk() {
      try {
        this.okAction();
      } catch (e) {
        console.error(e);
      }
      this.dialogShown = false;
    },
    onCancel() {
      try {
        this.cancelAction();
      } catch (e) {
        console.error(e);
      }
      this.dialogShown = false;
    },
    show({ okAction, cancelAction }) {
      this.okAction = okAction || this.okAction;
      this.cancelAction = cancelAction || this.cancelAction;
      this.dialogShown = true;
    }
  }
};
</script>

<style scoped></style>

<template>
  <v-app-bar color="primary" app>
    <v-toolbar-title style="width: auto" class="ml-0 pl-3">
      <h1 class="headline white--text" @click="$router.push({ name: 'home' })">
        Lofty test
      </h1>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped></style>

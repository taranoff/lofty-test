<template>
  <v-app-bar color="accent">
    <v-toolbar-title style="width: auto" class="ml-0 pl-3">
      <router-link :to="{ name: 'home' }">
        <h1 class="headline">
          Lofty test
        </h1>
      </router-link>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped></style>

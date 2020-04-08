<template>
  <v-app id="inspire">
    <Header />
    <v-content>
      <router-view>
        <v-container fluid fill-height> </v-container>
      </router-view>
    </v-content>
  </v-app>
</template>

<script>
import Header from "../../components/Header";
export default {
  name: "Layout",
  components: { Header }
};
</script>

<style scoped></style>

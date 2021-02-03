<template>
  <v-container>
    <FavoritesActions />
    <FavoritesList />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import FavoritesList from "@/components/favorites/FavoritesList.vue";
import FavoritesActions from "@/components/favorites/FavoritesActions.vue";

export default Vue.extend({
  name: "Users",
  components: { FavoritesActions, FavoritesList }
});
</script>

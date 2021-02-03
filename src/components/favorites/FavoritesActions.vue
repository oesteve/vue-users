<template>
  <div>
    <div class="text-center">
      <v-btn rounded color="primary" dark x-large @click="download">
        Download CSV
      </v-btn>
    </div>
  </div>
</template>

<script>
import usersToCSV from "@/lib/user-csv";

export default {
  name: "FavoritesActions",
  methods: {
    download() {
      const favorites = this.$store.getters["users/favorites"];
      const csvContent = usersToCSV(favorites);
      const hiddenElement = document.createElement("a");
      hiddenElement.href =
        "data:text/csv;charset=utf-8," + encodeURI(csvContent);
      hiddenElement.target = "_blank";
      hiddenElement.download = "favorites.csv";
      hiddenElement.click();
      hiddenElement.remove();
    }
  }
};
</script>

<style scoped></style>

<template>
  <UsersTable :users="users" />
</template>

<script>
import UsersTable from "@/components/users/UsersTable";

export default {
  name: "Favorites",
  components: { UsersTable },
  computed: {
    users() {
      return this.$store.getters["users/favorites"];
    }
  },
  mounted() {
    this.$store.dispatch("users/getFavorites");
  }
};
</script>

<style scoped></style>

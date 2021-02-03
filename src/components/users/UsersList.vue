<template>
  <UsersTable :users="users" />
</template>

<script>
import UsersTable from "@/components/users/UsersTable";
export default {
  name: "UsersList",
  components: { UsersTable },
  computed: {
    users() {
      return this.$store.getters["users/users"];
    }
  }
};
</script>

<style scoped></style>

<template>
  <v-container>
    <UsersActions />
    <UsersList />
    <UsersFilters />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import UsersFilters from "@/components/users/UsersFilters.vue";
import UsersActions from "@/components/users/UsersActions.vue";
import UsersList from "@/components/users/UsersList.vue";

export default Vue.extend({
  name: "Users",
  components: { UsersList, UsersActions, UsersFilters }
});
</script>

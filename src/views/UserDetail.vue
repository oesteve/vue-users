<template>
  <v-container>
    <UserCard />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import UserCard from "@/components/user/UserCard.vue";

export default Vue.extend({
  name: "UserDetail",
  components: { UserCard }
});
</script>

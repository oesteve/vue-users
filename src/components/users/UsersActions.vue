<template>
  <div>
    <v-alert
      v-if="errorMessage"
      text
      prominent
      type="error"
      icon="mdi-cloud-alert"
    >
      {{ errorMessage }}
    </v-alert>
    <div class="text-center">
      <v-btn
        rounded
        color="primary"
        dark
        x-large
        :loading="loadingUsers"
        @click="getUsers"
      >
        Get Users
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "UsersActions",
  data: () => ({
    loadingUsers: false,
    errorMessage: null
  }),
  methods: {
    async getUsers() {
      this.errorMessage = null;
      this.loadingUsers = true;
      try {
        await this.$store.dispatch("users/getUsers");
      } catch (error) {
        this.errorMessage = error.message;
      }

      this.loadingUsers = false;
    }
  }
};
</script>

<style scoped></style>

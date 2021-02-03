<template>
  <v-app-bar app color="primary" flat>
    <v-toolbar-title class="white--text">Users APP</v-toolbar-title>
    <v-btn to="/" text color="white" class="ml-10">
      Users
    </v-btn>
    <v-btn to="/favorites" text color="white" class="ml-3">
      Favorites
    </v-btn>

    <v-spacer></v-spacer>

    <v-responsive max-width="160">
      <v-text-field
        class="white--text"
        dense
        flat
        hide-details
        solo-inverted
        v-model="nickname"
        label="Nickname"
        @change="getFavorites"
      ></v-text-field>
    </v-responsive>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    async getFavorites() {
      this.$store.dispatch("users/getFavorites");
    }
  },
  computed: {
    nickname: {
      get() {
        return this.$store.getters.nickname;
      },
      set(value) {
        this.$store.dispatch("setNickname", value);
      }
    }
  }
};
</script>

<style scoped></style>

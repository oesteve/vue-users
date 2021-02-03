<template>
  <v-container fluid>
    <v-row align="center">
      <v-col class="d-flex" cols="6" sm="4">
        <v-select
          :items="['female', 'male']"
          label="Gender"
          clearable
          @change="filterByGender"
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="6" sm="4">
        <v-range-slider
          max="100"
          min="0"
          :value="[0, 100]"
          label="Ages"
          hide-details
          clearable
          @change="filterByAges"
        ></v-range-slider>
      </v-col>
      <v-col class="d-flex" cols="6" sm="4">
        <v-text-field
          label="Nationality"
          @input="filterByNationality"
          clearable
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "UsersFilters",
  methods: {
    filterByGender(value) {
      this.$store.dispatch("users/filterByGender", value);
    },
    filterByAges(value) {
      this.$store.dispatch("users/filterByAges", value);
    },
    filterByNationality(value) {
      this.$store.dispatch("users/filterByNationality", value);
    }
  }
};
</script>

<style scoped></style>

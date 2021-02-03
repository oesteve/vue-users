<template>
  <v-card class="mx-auto" max-width="600" outlined>
    <v-card-title>
      <v-row align="end" justify="end">
        <v-col>
          <v-avatar size="100" class="mr-5">
            <img alt="Avatar" class="elevation-6" :src="user.picture.medium" />
          </v-avatar>
          <v-btn @click="toggleFavorite" large color="primary">
            <v-icon
              :color="isFavorite ? 'yellow' : 'white'"
              :title="
                !isFavorite ? 'Add to favorites' : 'Remove from favorites'
              "
              >mdi-star</v-icon
            >
            <span class="pl-2">Favorite</span></v-btn
          >
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <p>
            <b>
              {{ `${user.name.title} ${user.name.first} ${user.name.last}` }}
            </b>
            <i
              ><a :href="`emailto:${user.email}`">{{ user.email }}</a></i
            >
          </p>
          <p>
            {{ user.location.street.name }}, {{ user.location.street.number }}.
            {{ user.location.city }} ({{ user.location.state }},
            {{ user.location.country }})
          </p>
          <p>{{ user.phone }} - {{ user.cell }}.</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <UserMapLocation
            :latitude="parseFloat(user.location.coordinates.latitude)"
            :longitude="parseFloat(user.location.coordinates.longitude)"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import UserMapLocation from "@/components/user/UserMapLocation";
export default {
  name: "UserCard",
  components: { UserMapLocation },
  methods: {
    async toggleFavorite() {
      await this.$store.dispatch("users/setUserAsFavorite", !this.isFavorite);
    }
  },
  computed: {
    user() {
      return this.$store.getters["users/selectedUser"];
    },
    isFavorite() {
      return this.$store.getters["users/isFavorite"];
    }
  }
};
</script>

<style scoped></style>

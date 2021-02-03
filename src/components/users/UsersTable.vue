<template>
  <v-simple-table class="pt-5" height="60vh">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">
            Gender
          </th>
          <th class="text-center">
            Name
          </th>
          <th class="text-center">
            Email
          </th>
          <th class="text-center">
            Nationality
          </th>
          <th class="text-center">
            Birthday
          </th>
          <th class="text-center">
            Registered At
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user.login.uuid"
          @click="selectUser(user)"
        >
          <td>{{ user.gender }}</td>
          <td>
            {{ `${user.name.title} ${user.name.first} ${user.name.last}` }}
          </td>
          <td>{{ user.email }}</td>
          <td>{{ user.nat }}</td>
          <!-- demo disclaimer, use vue filters -->
          <td>{{ new Date(user.dob.date).toLocaleDateString() }}</td>
          <td>{{ new Date(user.registered.date).toLocaleDateString() }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "UsersTable",
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  methods: {
    async selectUser(user) {
      await this.$store.dispatch("users/selectUser", user);
      await this.$router.push("/user");
    }
  }
};
</script>

<style scoped></style>

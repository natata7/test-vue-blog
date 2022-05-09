<template>
  <div id="nav" class="navbar navbar-expand-lg bg-dark navbar-dark sticky-top justify-content-center">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/admin">Add Post</router-link>
      </li>
      <li class="nav-item" v-if="isLoggedIn">
        <a @click="logout" class="nav-link">Logout</a>
      </li>
      <template v-else>
        <li class="nav-item">
          <router-link class="nav-link" to="/register">Register</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
export default {
  name: "NavBar",
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/login");
    },
  },
};
</script>
<style>
.router-link-exact-active {
  color: rgba(255, 255, 255, 0.9);
  font-weight: bold;
}
.nav-link{
    cursor: pointer;
}
</style>
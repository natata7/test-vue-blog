<template>
  <div class="main-container fullscreen">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-5 col-lg-6 col-md-7">
          <div class="text-center">
            <h1 class="h2 mb-5 pt-5">Create account</h1>
            <form @submit.prevent="submit">
              <div class="form-group">
                <div class="text-left">
                  <label for="username">Username:</label>
                </div>
                <input class="form-control" type="text" name="username" v-model="form.username" />
              </div>
              <div class="form-group">
                <div class="text-left">
                  <label for="full_name">Full Name:</label>
                </div>
                <input class="form-control" type="text" name="full_name" v-model="form.full_name" />
              </div>
              <div class="form-group">
                <div class="text-left">
                  <label for="password">Password:</label>
                </div>
                <input class="form-control" type="password" name="password" v-model="form.password" />
              </div>
              <button type="submit" class="btn btn-lg btn-block btn-primary">Submit</button>
            </form>
            <p v-if="showError" id="error">Username already exists</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Register",
  components: {},
  data() {
    return {
      form: {
        username: "",
        full_name: "",
        password: "",
      },
      showError: false
    };
  },
  methods: {
    ...mapActions(["Register"]),
    async submit() {
      try {
        await this.Register(this.form);
        this.$router.push("/posts");
        this.showError = false
      } catch (error) {
        this.showError = true
      }
    },
  },
};
</script>
<style>
body {
  background-color: #f8f9fa;
}
</style>
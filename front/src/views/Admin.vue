<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-xl-5 col-lg-6 col-md-7">
        <div class="text-center">
          <div v-if="User">
            <h1 class="h2 mb-5 pt-5">Hi {{ User }} 🤓</h1>
            <form @submit.prevent="submit">
              <div class="row mb-3 g-3 align-items-center ">
                <div class="col-auto">
                  <label for="title" class="col-form-label">Title:</label>
                </div>
                <div class="col">
                  <input type="text" name="title" v-model="form.title" class="form-control" />
                </div>
              </div>
              <div class="form-group">
                <textarea name="write_up" v-model="form.text" placeholder="Write up..." class="form-control"></textarea>
              </div>
              <button type="submit" class="btn btn-lg btn-block btn-primary">Submit</button>
              <div v-if="visibleMessage"> {{ textMessage }} </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="posts row justify-content-center">
      <h2 class="h2 mb-5 pt-5">My Previous Posts:</h2>
      <div class="col-lg-11 col-xl-10">
        <div class="content-list-body row" v-if="Posts">
          <div v-for="post in Posts" :key="post.id" id="post-div" class="col-md-6">
            <div class="card mb-4">
              <div class="card-body">
                <h2 class="card-title">{{ post.title }}</h2>
                <p class="card-text">{{ post.text }}</p>
              </div>
            </div>
          </div>
          <pagination class="container justify-content-center" :totalPages="this.totalPages" :perPage="10" :currentPage="this.currentPage"
        @pagechanged="onPageChange" />
        </div>
        <div v-else class="text-center">Oh no! There are no posts yet</div>
      </div>
      
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Pagination from '../components/Pagination.vue';
//import axios from "axios";

export default {
  name: "Posts",
  components: {
    Pagination
  },
  data() {
    return {
      form: {
        title: "",
        text: "",
      },
      currentPage: 1,
      visibleMessage: false,
      textMessage: ''
    };
  },
  created: function () {
    this.GetPostsByUserId(1)
  },
  computed: {
    ...mapGetters({
      Posts: "StatePosts",
      User: "StateUser",
      //currentPage: "StatePagination",
      totalPages: "StateTotalPages",
      totalItems: "StateTotalItems"
    }),
  },
  methods: {
    ...mapActions(["CreatePost", "GetPostsByUserId"]),
    async submit() {
      try {
        if (this.form.title && this.form.text) {
          this.CreatePost(this.form);
          this.form.title = '';
          this.form.text = '';
          this.showMessage('Post send!');
          this.GetPostsByUserId();
        } else {
          this.showMessage('All fields are required');
        }
      } catch (error) {
        this.showMessage("Sorry you can't make a post now!");
        throw "Sorry you can't make a post now!"
      }
    },
    onPageChange(page) {
      this.currentPage = page;
      this.$store.dispatch('GetPostsByUserId', {
        currentPage: this.currentPage
      });
    },
    showMessage(value) {
      this.visibleMessage = true;
      this.textMessage = value;
      setTimeout(() => {
        this.visibleMessage = false;
      }, 3000);
    }
  },
};
</script>

<style scoped>
</style>

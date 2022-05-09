<template>
  <div class="home">
    <div class="posts row justify-content-center">
      <div class="col-lg-11 col-xl-10 pt-5">
        <div class="content-list-body row" v-if="Posts">
          <div v-for="post in Posts" :key="post.id" id="post-div" class="col-md-6">
            <div class="card mb-4">
              <div class="card-body">
                <h2 class="card-title">{{ post.title }}</h2>
                <p class="card-text">{{ post.text }}</p>
                <p class="badge badge-secondary">Written By: {{ post.author }}</p>
              </div>
            </div>
          </div>
          <pagination class="container justify-content-center"  :totalPages="this.totalPages" :perPage="10" :currentPage="this.currentPage"
            @pagechanged="onPageChange" />
        </div>
        <div v-else class="column">
          <h3 class="h2 mb-1 pt-5 text-center">Oh no! We have no posts</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Pagination from '../components/Pagination.vue';
//import axios from "axios";

export default {
  name: "Home",
  components: {
    Pagination
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  created: function () {
    this.GetPosts(1)
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
    ...mapActions(["GetPosts"]),

    onPageChange(page) {
      this.currentPage = page;
      this.$store.dispatch('GetPosts', {
        currentPage: this.currentPage
      });
    }
  },
};
</script>


<style scoped>
</style>
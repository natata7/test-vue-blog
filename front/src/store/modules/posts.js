import axios from "axios";

const state = {
  posts: null,
  currentPage: null,
  totalPages: null,
  totalItems: null,
};

const getters = {
  StatePosts: (state) => state.posts,
  StatePagination: (state) => state.currentPage,
  StateTotalPages: (state) => state.totalPages,
  StateTotalItems: (state) => state.totalItems,
};

const actions = {
  async CreatePost({ dispatch }, post) {
    post["username"] = this.state.auth.user;
    await axios.post("posts/add", post);
    await dispatch("GetPostsByUserId");
    return true;
  },

  async GetPosts({ commit }, { currentPage = 1 }) {
    //let currentPage = page;
    let response = await axios.get(`posts?page=${currentPage}`);
    commit("setPosts", {
      posts: response.data.posts,
      currentPage: currentPage,
      totalPages: response.data.totalPages,
      totalItems: response.data.totalItems,
    });
  },
  async GetPostsByUserId({ commit }, { currentPage = 1 }) {
    let response = await axios.get(
      `posts?page=${currentPage}&author=${this.state.auth.user}`
    );
    commit("setPosts", {
      posts: response.data.posts,
      currentPage: currentPage,
      totalPages: response.data.totalPages,
      totalItems: response.data.totalItems,
    });
  },
};

const mutations = {
  setPosts(state, { posts, currentPage, totalPages, totalItems }) {
    state.posts = posts;
    state.currentPage = currentPage;
    state.totalPages = totalPages;
    state.totalItems = totalItems;
  },
  setPagination(state, page) {
    state.currentPage = page;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

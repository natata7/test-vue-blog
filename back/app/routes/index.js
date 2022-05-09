const {
  createPost,
  getPosts,
  getPostById,
} = require("../controllers/posts.controller");
const { verifySignUp } = require("../middleware/");
const controller = require("../controllers/auth.controller");
const { Router } = require("express");

const router = Router();

router.get("/", getPosts);
router.post("/posts/add", createPost);
router.get("/posts", getPosts);
router.post(
  "/register",
  verifySignUp.checkDuplicateUsernameOrEmail,
  controller.signup
);
router.post("/login", controller.signin);

module.exports = router;

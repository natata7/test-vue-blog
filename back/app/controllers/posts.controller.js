const Post = require("../models/Post.model");

const getPagination = (pageNum) => {
  //const limit = size ? +size : 10;
  const page = pageNum ? pageNum : 1;
  const limit = 10;
  return { limit, page };
};

exports.createPost = async (req, res, next) => {
  try {
    const post = new Post({
      title: req.body.title,
      text: req.body.text,
      author: req.body.username,
    });
    await post.save();
    console.log(post);
    return res.status(200);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ errorMessage: error.message });
  }
};

exports.getPosts = async (req, res) => {
  const { page, limit, author } = req.query;
  var condition = author
    ? { author: author  }
    : {};
  //const { limit, page } = getPagination(page);
  //console.log(page, pageNumber);
  try {
    //const posts = await Post.find().lean();
    // res.status(200).send({
    //   posts,
    // });

    Post.paginate(condition, { page: page ? page : 1, limit: limit ? limit : 10 })
      .then((result) => {
        res.status(200).send({
          totalItems: result.totalDocs,
          posts: result.docs,
          totalPages: result.totalPages,
          currentPage: result.page,
        });
      })
      .catch((error) => {
        console.log({ error });
        return res.status(500).send({ errorMessage: error.message });
      });
  } catch (error) {
    console.log({ error });
    return res.status(500).send({ errorMessage: error.message });
  }
};

exports.getPostById = async (req, res, next) => {
  const post = await Post.findById(req.params.id).lean();
  res.status(200).send({ post });
};

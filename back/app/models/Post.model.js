const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

const PostSchema = Schema({
  title: { type: String, trim: true },
  text: {
    type: String,
    trim: true,
  },
  author: String
});

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("post", PostSchema);
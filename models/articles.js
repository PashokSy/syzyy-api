import mongoose from 'mongoose';

const articlesSchema = new mongoose.Schema({
  text: {
    type: String,
    require: [true, 'Please provide text'],
    minlength: 300,
    maxlength: 2400,
  },
  authorId: {
    type: String,
    require: [true, 'Please provide author id'],
  },
  createdAt: {
    type: Date,
  },
  comments: {
    type: Array,
  },
});

export const ArticlesModel = mongoose.model('Articles', articlesSchema);

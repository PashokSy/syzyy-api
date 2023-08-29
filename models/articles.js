import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  text: {
    type: String,
    require: [true, 'Please provide text'],
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

articleSchema.pre('save', function () {
  this.createdAt = new Date(Date.now());
});

export const ArticleModel = mongoose.model('Articles', articleSchema);

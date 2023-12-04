import mongoose from 'mongoose';

const commentarySchema = new mongoose.Schema({
  text: {
    type: String,
    require: [true, 'Please provide commentary text'],
    maxlength: 500,
  },
  authorId: {
    type: String,
    require: [true, 'Please provide author id'],
  },
  articleId: {
    type: String,
    require: [true, 'Please provide article id'],
  },
  createdAt: {
    type: Date,
  },
});

commentarySchema.pre('save', function () {
  this.createdAt = new Date(Date.now());
});

export const CommentaryModel = mongoose.model('Commentaries', commentarySchema);

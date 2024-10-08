const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/video_comments', { useNewUrlParser: true, useUnifiedTopology: true });

const CommentSchema = new mongoose.Schema({
  username: String,
  text: String,
  date: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', CommentSchema);

// API to get comments
app.get('/comments', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) res.status(500).send(err);
    res.json(comments);
  });
});

// API to post a comment
app.post('/comments', (req, res) => {
  const newComment = new Comment({
    username: req.body.username,
    text: req.body.text
  });
  newComment.save((err, comment) => {
    if (err) res.status(500).send(err);
    res.json(comment);
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

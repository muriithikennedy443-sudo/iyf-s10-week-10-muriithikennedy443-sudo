const store = require('../data/store');

const getAllPosts = (req, res) => {
  res.json(store.posts);
};

const getPostById = (req, res) => {
  const post = store.posts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
};

const createPost = (req, res) => {
  const { title, content, author } = req.body;
  const newPost = {
    id: store.nextId++,
    title,
    content,
    author,
    createdAt: new Date().toISOString(),
    likes: 0
  };
  store.posts.push(newPost);
  res.status(201).json(newPost);
};

const updatePost = (req, res) => {
  const index = store.posts.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  store.posts[index] = { ...store.posts[index], ...req.body };
  res.json(store.posts[index]);
};

const deletePost = (req, res) => {
  const index = store.posts.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  store.posts.splice(index, 1);
  res.status(204).send();
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
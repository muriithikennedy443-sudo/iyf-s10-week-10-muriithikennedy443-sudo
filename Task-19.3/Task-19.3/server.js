const express = require('express');
const app = express();
const PORT = 3000;

// Exercise 1: Response Methods

// Send text
app.get('/text', (req, res) => {
    res.send('Plain text response');
});

// Send JSON
app.get('/json', (req, res) => {
    res.json({ message: 'JSON response', success: true });
});

// Send with status code
app.get('/error', (req, res) => {
    res.status(400).json({ error: 'Bad request' });
});

// Redirect
app.get('/old-page', (req, res) => {
    res.redirect('/new-page');
});

app.get('/new-page', (req, res) => {
    res.send('You have been redirected to the new page!');
});

// Exercise 2: Route Parameters

// Dynamic route with parameter
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ message: `Getting user ${userId}` });
});

// Multiple parameters
app.get('/posts/:postId/comments/:commentId', (req, res) => {
    const { postId, commentId } = req.params;
    res.json({ postId, commentId });
});

// Exercise 3: Query Strings

// /search?q=hello&limit=10
app.get('/search', (req, res) => {
    const { q, limit = 10, page = 1 } = req.query;
    res.json({
        query: q,
        limit: parseInt(limit),
        page: parseInt(page)
    });
});

// /posts?category=tech&sort=newest
app.get('/posts', (req, res) => {
    const { category, sort = 'newest' } = req.query;
    res.json({
        message: 'Getting posts',
        filters: { category, sort }
    });
});

// 404 handler (always keep at the end)
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
const express = require('express');
const app = express();
const PORT = 3000;

// Exercise 1: Understanding Middleware

// Middleware is a function that runs between request and response
// It has access to req, res, and next

// Logger middleware
const logger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next(); // Pass to next middleware/route
};

// Apply to all routes
app.use(logger);

// Request time middleware
const addRequestTime = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
};

app.use(addRequestTime);

// Use in route
app.get('/api/time', (req, res) => {
  res.json({ requestTime: req.requestTime });
});

// Exercise 2: Built-in Middleware

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies (forms)
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Exercise 3: Route-specific Middleware

// Auth check middleware
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  // In real app, verify token here
  next();
};

// Apply to specific route
app.get('/api/protected', requireAuth, (req, res) => {
  res.json({ message: 'This is protected data' });
});

// Apply to all routes starting with /api/admin
app.use('/api/admin', requireAuth);

app.get('/api/admin/dashboard', (req, res) => {
  res.json({ message: 'Admin dashboard' });
});

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Middleware server running!' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
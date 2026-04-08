const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Main App Router
app.use('/', apiRoutes); // Or '/api' but standard says /login etc.

// Health Check
app.get('/health', (req, res) => res.send('Server OK'));

// Server startup
app.listen(PORT, () => {
    console.log(`EduSync Command Center Backend is running on http://localhost:${PORT}`);
});

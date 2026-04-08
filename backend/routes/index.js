const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const dashboardController = require('../controllers/dashboardController');
const aiController = require('../controllers/aiController');

// Authentication System
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Dashboard API
router.get('/dashboard', dashboardController.getDashboard);

// AI-Driven Insight API
router.post('/ai-analysis', aiController.analyzeData);

module.exports = router;

const aiService = require('../services/aiService');

const analyzeData = async (req, res) => {
  const studentData = req.body;

  if (!studentData || Object.keys(studentData).length === 0) {
    return res.status(400).json({ error: 'Please provide FULL student data in the body' });
  }

  try {
    const analysis = await aiService.generateAiAnalysis(studentData);
    res.json(analysis);
  } catch (error) {
    console.error("AI Controller Error:", error);
    res.status(500).json({ error: 'Internal Server Error during AI Analysis' });
  }
};

module.exports = {
  analyzeData
};

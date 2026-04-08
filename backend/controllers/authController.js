// Hardcoded users for mock
const validUsers = [
    { enrollment: 'EDU001', password: 'password123', name: 'Kuldeep Yadav' },
    { enrollment: 'EDU002', password: 'password123', name: 'Alice Johnson' },
    { enrollment: 'EDU003', password: 'password123', name: 'Bob Smith' }
];

const login = (req, res) => {
  const { enrollment, password } = req.body;
  if (!enrollment || !password) {
    return res.status(400).json({ success: false, message: 'Missing credentials' });
  }

  const user = validUsers.find(u => u.enrollment === enrollment && u.password === password);
  
  if (user) {
    return res.json({
        success: true,
        studentName: user.name,
        enrollmentNumber: user.enrollment
    });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
};

const logout = (req, res) => {
  return res.json({ success: true, message: 'Logged out successfully' });
};

module.exports = {
  login,
  logout
};

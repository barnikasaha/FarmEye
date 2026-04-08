const mockDataService = require('../services/mockDataService');

const getDashboard = (req, res) => {
  // Dynamically generate Data for the student
  const student = mockDataService.getStudent();
  const attendance = mockDataService.generateAttendance();
  const timetable = mockDataService.generateTimetable();
  const deadlines = mockDataService.generateDeadlines();
  const fees = mockDataService.getFees();
  const hostel = mockDataService.getHostel();

  const fullData = {
    student,
    attendance,
    timetable,
    deadlines,
    fees,
    hostel
  };

  res.json(fullData);
};

module.exports = {
  getDashboard
};

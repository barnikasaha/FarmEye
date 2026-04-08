const getStudent = () => {
  return {
    name: 'Kuldeep Yadav',
    enrollment: 'EDU001',
    branch: 'B.Tech Computer Science'
  };
};

const subjects = [
  { code: 'CS301', name: 'Operating Systems (OS)' },
  { code: 'CS302', name: 'Database Management Systems (DBMS)' },
  { code: 'CS303', name: 'Computer Networks (CN)' },
  { code: 'CS304', name: 'Artificial Intelligence (AI)' }
];

const generateAttendance = () => {
  return subjects.map(sub => {
    // Random between 60.00 and 95.00
    const percentage = (Math.random() * (95 - 60) + 60).toFixed(2);
    return {
      subject: sub.name,
      percentage: parseFloat(percentage)
    };
  });
};

const generateTimetable = () => {
  // 4-5 classes per day, realistic time slots
  return [
    { day: 'Monday', slots: [
      { subject: 'OS', time: '09:00 AM - 10:00 AM' },
      { subject: 'DBMS', time: '10:00 AM - 11:00 AM' },
      { subject: 'CN', time: '11:00 AM - 12:00 PM' },
      { subject: 'Lunch', time: '12:00 PM - 01:00 PM' },
      { subject: 'AI', time: '01:00 PM - 03:00 PM' }
    ]},
    { day: 'Tuesday', slots: [
      { subject: 'DBMS', time: '09:00 AM - 11:00 AM' },
      { subject: 'OS', time: '11:00 AM - 12:00 PM' },
      { subject: 'CN', time: '01:00 PM - 02:00 PM' },
      { subject: 'AI', time: '02:00 PM - 03:00 PM' }
    ]},
    { day: 'Wednesday', slots: [
      { subject: 'CN', time: '09:00 AM - 11:00 AM' },
      { subject: 'AI', time: '11:00 AM - 12:00 PM' },
      { subject: 'Lunch', time: '12:00 PM - 01:00 PM' },
      { subject: 'OS', time: '01:00 PM - 02:00 PM' }
    ]}
  ];
};

const generateDeadlines = () => {
  const now = new Date();
  const nextDay = new Date(now.getTime() + 1000 * 60 * 60 * 24);
  const nextWeek = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7);

  return [
    { assignment: 'OS Lab Manual', dueDate: nextDay.toISOString().split('T')[0], status: 'Pending' }, // Urgent
    { assignment: 'DBMS Project Report', dueDate: nextWeek.toISOString().split('T')[0], status: 'Pending' }, // Future
    { assignment: 'CN Quiz', dueDate: nextDay.toISOString().split('T')[0], status: 'Pending' }, // Urgent
    { assignment: 'AI Assignment', dueDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 3).toISOString().split('T')[0], status: 'Submitted' }
  ];
};

const getFees = () => {
  return {
    status: 'Pending',
    total: 50000,
    due: 15000,
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 10 days from now
  };
};

const getHostel = () => {
  return {
    roomNumber: 'A-304',
    messStatus: 'Active',
    complaints: [
        { issue: 'Fan not working', status: 'Resolved' },
        { issue: 'Wifi slow', status: 'Pending' }
    ]
  };
};

module.exports = {
  getStudent,
  generateAttendance,
  generateTimetable,
  generateDeadlines,
  getFees,
  getHostel
};

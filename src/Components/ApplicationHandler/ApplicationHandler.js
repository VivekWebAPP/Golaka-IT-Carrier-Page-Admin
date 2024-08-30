// src/components/ApplicationHandler/ApplicationHandler.js

import React, { useState } from 'react';
import { sendEmail } from '../../utils/emailUtils'; // Adjust the path as necessary

const ApplicationHandler = () => {
  const [applications, setApplications] = useState([
    { name: 'John Doe', email: 'john.doe@example.com', status: 'Pending' },
    // Other applications...
  ]);

  const updateApplicationStatus = async (index, newStatus) => {
    const updatedApplications = [...applications];
    updatedApplications[index].status = newStatus;
    setApplications(updatedApplications);

    // Send email notification to the candidate
    const candidateEmail = updatedApplications[index].email;
    const subject = 'Application Status Update';
    const body = `Dear ${updatedApplications[index].name},\n\nYour application status has been updated to ${newStatus}.\n\nBest regards,\nYour Company`;

    await sendEmail(candidateEmail, subject, body);
  };

  return (
    <div>
      {/* Render application list and provide functionality to update status */}
      {applications.map((app, index) => (
        <div key={index}>
          <p>{app.name} - {app.status}</p>
          <button onClick={() => updateApplicationStatus(index, 'Approved')}>Approve</button>
          <button onClick={() => updateApplicationStatus(index, 'Rejected')}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default ApplicationHandler;

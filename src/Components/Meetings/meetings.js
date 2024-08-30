import React, { useContext, useState } from 'react';
import './meetings.css';
import { sendEmail } from '../../utils/emailUtils';
import Context from '../../Context State/ContextState.js';

const MeetingTable = () => {
  // Sample data for meetings
  const [meetings, setMeetings] = useState([
    { id: 1, candidate: 'John Doe', date: '2024-09-01', time: '10:00 AM' },
    { id: 2, candidate: 'Jane Smith', date: '2024-09-02', time: '2:00 PM' },
  ]);
  const context = useContext(Context);
  const { users } = context;

  const [showReschedulePopup, setShowReschedulePopup] = useState(false);
  const [selectedMeetingIndex, setSelectedMeetingIndex] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newHour, setNewHour] = useState('');
  const [newMinute, setNewMinute] = useState('');
  const [newTimePeriod, setNewTimePeriod] = useState('AM');

  const handleReschedule = (user) => {
    setSelectedMeetingIndex(user);
    setShowReschedulePopup(true);
  };

  const handleRescheduleSubmit = async (user) => {
    if (selectedMeetingIndex !== null) {
      const updatedMeetings = selectedMeetingIndex;
      const formattedTime = `${newHour.padStart(2, '0')}:${newMinute.padStart(2, '0')} ${newTimePeriod}`;
      updatedMeetings.date= newDate;
      updatedMeetings.time = formattedTime;
      setMeetings(updatedMeetings);
      setShowReschedulePopup(false);

      // Sending email with new meeting details
      const candidateEmail = selectedMeetingIndex.email; // Placeholder email, replace with actual candidate's email
      const subject = 'Meeting Rescheduled';
      const body = `Your meeting has been rescheduled to ${newDate} at ${formattedTime}.`;

      await sendEmail(candidateEmail, subject, body); // Send email

      // Resetting state
      setNewDate('');
      setNewHour('');
      setNewMinute('');
      setNewTimePeriod('AM');
    }
  };

  const handleClosePopup = () => {
    setShowReschedulePopup(false);
    setNewDate('');
    setNewHour('');
    setNewMinute('');
    setNewTimePeriod('AM');
  };

  return (
    <div className="meeting-content">
      <table className="meeting-table">
        <thead>
          <tr>
            <th>Candidate</th>
            <th>date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((meeting) => (
            <tr key={meeting._id}>
              <td>{meeting.name}</td>
              <td>{meeting.date}</td>
              <td>{meeting.time}</td>
              <td>
                <button className="btn btn-reschedule" onClick={() => handleReschedule(meeting)}>Reschedule</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Reschedule Meeting Popup */}
      {showReschedulePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Reschedule Meeting</h2>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              placeholder="New Date"
            />
            <input
              type="number"
              value={newHour}
              onChange={(e) => setNewHour(e.target.value)}
              placeholder="Hour"
              min="1"
              max="12"
            />
            <input
              type="number"
              value={newMinute}
              onChange={(e) => setNewMinute(e.target.value)}
              placeholder="Minute"
              min="0"
              max="59"
            />
            <select
              value={newTimePeriod}
              onChange={(e) => setNewTimePeriod(e.target.value)}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
            <div className="popup-buttons">
              <button className="btn btn-confirm" onClick={handleRescheduleSubmit}>Confirm</button>
              <button className="btn btn-cancel" onClick={handleClosePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingTable;

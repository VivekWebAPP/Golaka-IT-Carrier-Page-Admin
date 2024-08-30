import React, { useContext, useState } from 'react';
import './applicants.css';
import Context from '../../Context State/ContextState';
import { useDispatch, useSelector } from 'react-redux';
import { action } from '../../redux';
import { useNavigate } from 'react-router-dom';
import { sendEmail } from '../../utils/emailUtils'; // Import email utility

const ApplicantTable = () => {
  const [applications, setApplications] = useState([
    { name: 'John Doe', resumeLink: '#', status: 'Pending', email: 'john.doe@example.com' },
    { name: 'Jane Smith', resumeLink: '#', status: 'Pending', email: 'jane.smith@example.com' },
  ]);
  const context = useContext(Context);
  const { users } = context;
  const resume = useSelector((state) => state.userResumeDownload);
  const dispatch = useDispatch();

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newApplicant, setNewApplicant] = useState({ name: '', resumeLink: '', status: 'Pending', email: '' });

  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const updateStatus = async (index, newStatus) => {
    const updatedApplications = [...applications];
    updatedApplications[index].status = newStatus;
    setApplications(updatedApplications);

    // Sending email when status is updated
    const candidateEmail = users[index].email; // Assume users have an email field
    console.log(candidateEmail);
    const subject = 'Application Status Update';
    let body = `Your application status has been updated to ${newStatus}.`;

    if (newStatus === 'Approved') {
      body += ' Please send the following documents to hr@example.com: [Document List].';
    }

    await sendEmail(candidateEmail, subject, body); // Send email
  };

  const navigate = useNavigate();

  const handleReject = (index) => {
    setSelectedIndex(index);
    setShowRejectPopup(true);
  };

  const handleRejectSubmit = async () => {
    if (selectedIndex !== null) {
      const updatedApplications = [...applications];
      updatedApplications[selectedIndex].status = 'Rejected';
      setApplications(updatedApplications);
      
      // Send rejection email
      const candidateEmail = users[selectedIndex].email; // Assume users have an email field
      const subject = 'Application Rejection';
      const body = `Your application has been rejected. ${rejectionReason ? `Reason: ${rejectionReason}` : ''}`;
      await sendEmail(candidateEmail, subject, body);

      setShowRejectPopup(false);
      setRejectionReason('');
    }
  };

  const handleClosePopup = () => {
    setShowRejectPopup(false);
    setRejectionReason('');
  };

  const handleAddApplicant = () => {
    setShowAddPopup(true);
  };

  const handleAddSubmit = () => {
    setApplications([...applications, newApplicant]);
    setNewApplicant({ name: '', resumeLink: '', status: 'Pending', email: '' });
    setShowAddPopup(false);
  };

  const handleAddPopupClose = () => {
    setShowAddPopup(false);
  };

  const downloadResume = (id) => {
    const token = localStorage.getItem('AuthToken');
    dispatch(action.downloadResume(id, token));
  };

  return (
    <div className="applicant-content">
      <div className="add-button-container">
        <button className="btn btn-add" onClick={handleAddApplicant}>
          <i className="bi bi-plus"></i> Add
        </button>
      </div>
      <table className="applicant-table">
        <thead>
          <tr>
            <th>Applicant Name</th>
            <th>Resume</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((app, index) => (
            <tr key={app._id}>
              <td>{app.name}</td>
              <td>
                <div className="resume-buttons">
                  <button className="btn btn-download" onClick={() => downloadResume(app._id)}>Download</button>
                </div>
              </td>
              <td>
                <select
                  value={app.status}
                  onChange={(e) => updateStatus(index, e.target.value)}
                >
                  <option value="Shortlist for Round 1">Shortlist for Round 1</option>
                  <option value="Shortlist for Round 2">Shortlist for Round 2</option>
                  <option value="Shortlist for Round 3">Shortlist for Round 3</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected in Round 1">Rejected in Round 1</option>
                  <option value="Rejected in Round 2">Rejected in Round 2</option>
                  <option value="Rejected in Round 3">Rejected in Round 3</option>
                </select>
              </td>
              <td>
                <button className="btn btn-reject" onClick={() => handleReject(index)}>Rejected</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Applicant Popup */}
      {showAddPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <input
              type="text"
              value={newApplicant.name}
              onChange={(e) => setNewApplicant({ ...newApplicant, name: e.target.value })}
              placeholder="Applicant Name"
            />
            <input
              type="text"
              value={newApplicant.resumeLink}
              onChange={(e) => setNewApplicant({ ...newApplicant, resumeLink: e.target.value })}
              placeholder="Resume Link"
            />
            <input
              type="text"
              value={newApplicant.email}
              onChange={(e) => setNewApplicant({ ...newApplicant, email: e.target.value })}
              placeholder="Email Address"
            />
            <select
              value={newApplicant.status}
              onChange={(e) => setNewApplicant({ ...newApplicant, status: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Rejected">Rejected</option>
            </select>
            <div className="popup-buttons">
              <button className="btn btn-confirm" onClick={handleAddSubmit}>Add</button>
              <button className="btn btn-cancel" onClick={handleAddPopupClose}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Applicant Popup */}
      {showRejectPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Reject Applicant</h2>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Optional: Reason for rejection"
            />
            <div className="popup-buttons">
              <button className="btn btn-confirm" onClick={handleRejectSubmit}>Confirm</button>
              <button className="btn btn-cancel" onClick={handleClosePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantTable;

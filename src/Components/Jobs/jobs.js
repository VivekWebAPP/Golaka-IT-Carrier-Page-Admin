import React, { useState, useEffect } from 'react';
import './jobs.css';

const JobManagement = () => {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : [];
  });
  const [showAddJobPopup, setShowAddJobPopup] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    requirements: '',
    location: '',
    employmentType: '',
    description: '',
    status: 'Open',
  });

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleAddJob = () => {
    setJobs([...jobs, newJob]);
    setShowAddJobPopup(false);
    setNewJob({
      title: '',
      requirements: '',
      location: '',
      employmentType: '',
      description: '',
      status: 'Open',
    });
  };

  const handleUpdateStatus = (index) => {
    const updatedJobs = [...jobs];
    updatedJobs[index].status = updatedJobs[index].status === 'Open' ? 'Closed' : 'Open';
    setJobs(updatedJobs);
  };

  const handleDeleteJob = (index) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
  };

  return (
    <div className="meeting-content">
      <div className="add-button-container">
        <button className="btn btn-add" onClick={() => setShowAddJobPopup(true)}>
          <i className="bi bi-plus"></i> Add Job
        </button>
      </div>

      <div className="job-list">
        {jobs.map((job, index) => (
          <div key={index} className="job-item">
            <h1>{job.title}</h1>
            <p><strong>Requirements:</strong> {job.requirements}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Type:</strong> {job.employmentType}</p>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Status:</strong> {job.status}</p>
            <button className="btn btn-update-status" onClick={() => handleUpdateStatus(index)}>
              {job.status === 'Open' ? 'Close Position' : 'Open Position'}
            </button>
            <button className="btn btn-delete" onClick={() => handleDeleteJob(index)}>Delete Position</button>
          </div>
        ))}
      </div>

      {showAddJobPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={newJob.title}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="requirements"
              placeholder="Job Requirements"
              value={newJob.requirements}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={newJob.location}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="employmentType"
              placeholder="Type of Employment (Full-time, Part-time, Internship)"
              value={newJob.employmentType}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Brief Description"
              value={newJob.description}
              onChange={handleInputChange}
            />
            <div className="popup-buttons">
              <button className="btn btn-confirm" onClick={handleAddJob}>Add Job</button>
              <button className="btn btn-cancel" onClick={() => setShowAddJobPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobManagement;

import React, { useState, useEffect } from 'react';
import './emails.css'; 

const EmailTemplates = () => {
  const [templates, setTemplates] = useState(() => {
    const savedTemplates = localStorage.getItem('templates');
    return savedTemplates ? JSON.parse(savedTemplates) : [];
  });
  const [showAddTemplatePopup, setShowAddTemplatePopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newTemplate, setNewTemplate] = useState({
    subject: '',
    body: '',
    senderName: '',
    designation: '',
    companyName: '',
    companyWebsite: '',
  });

  useEffect(() => {
    localStorage.setItem('templates', JSON.stringify(templates));
  }, [templates]);

  const handleAddTemplate = () => {
    if (isEditing) {
      const updatedTemplates = templates.map((template, index) =>
        index === editingIndex ? newTemplate : template
      );
      setTemplates(updatedTemplates);
      setIsEditing(false);
    } else {
      setTemplates([...templates, newTemplate]);
    }

    setShowAddTemplatePopup(false);
    setNewTemplate({
      subject: '',
      body: '',
      senderName: '',
      designation: '',
      companyName: '',
      companyWebsite: '',
    });
    setEditingIndex(null);
  };

  const handleEditTemplate = (index) => {
    setNewTemplate(templates[index]);
    setEditingIndex(index);
    setIsEditing(true);
    setShowAddTemplatePopup(true);
  };

  const handleDeleteTemplate = (index) => {
    const updatedTemplates = templates.filter((_, i) => i !== index);
    setTemplates(updatedTemplates);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTemplate((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="email-templates-content">
      <button className="btn btn-add" onClick={() => setShowAddTemplatePopup(true)}>
        <i className="bi bi-plus"></i> Add Template
      </button>

      <table className="email-templates-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Sender Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template, index) => (
            <tr key={index}>
              <td>{template.subject}</td>
              <td>{template.senderName}</td>
              <td>
                <button className="btn btn-edit" onClick={() => handleEditTemplate(index)}>Edit</button>
                <button className="btn btn-delete" onClick={() => handleDeleteTemplate(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Template Popup */}
      {showAddTemplatePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>{isEditing ? 'Edit Template' : 'Add Template'}</h2>
            <input
              type="text"
              name="subject"
              value={newTemplate.subject}
              onChange={handleChange}
              placeholder="Subject"
            />
            <textarea
              name="body"
              value={newTemplate.body}
              onChange={handleChange}
              placeholder="Body"
            />
            <input
              type="text"
              name="senderName"
              value={newTemplate.senderName}
              onChange={handleChange}
              placeholder="Sender Name"
            />
            <input
              type="text"
              name="designation"
              value={newTemplate.designation}
              onChange={handleChange}
              placeholder="Designation"
            />
            <input
              type="text"
              name="companyName"
              value={newTemplate.companyName}
              onChange={handleChange}
              placeholder="Company Name"
            />
            <input
              type="text"
              name="companyWebsite"
              value={newTemplate.companyWebsite}
              onChange={handleChange}
              placeholder="Company Website"
            />
            <div className="popup-buttons">
              <button className="btn btn-confirm" onClick={handleAddTemplate}>
                {isEditing ? 'Update' : 'Add'}
              </button>
              <button className="btn btn-cancel" onClick={() => setShowAddTemplatePopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTemplates;

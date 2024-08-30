import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link to="/applicants" className={location.pathname === '/applicants' ? 'active' : ''}>
                        New Applicants
                    </Link>
                </li>
                <li>
                    <Link to="/meetings" className={location.pathname === '/meetings' ? 'active' : ''}>
                        Meetings
                    </Link>
                </li>
                <li>
                    <Link to="/jobs" className={location.pathname === '/jobs' ? 'active' : ''}>
                        Job Positions
                    </Link>
                </li>
                <li>
                    <Link to="/emails" className={location.pathname === '/emails' ? 'active' : ''}>
                        Emails
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

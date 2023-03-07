import React, { useEffect } from 'react';
import AdminForm from '../components/AdminForm';
import AdminNavBar from '../components/AdminNavBar';
import AdminUsers from '../components/AdminUsers';
import { setToken } from '../services/requests';

function Admin() {
  const adminData = localStorage.getItem('user');
  const { token } = adminData;

  useEffect(() => {
    setToken(token);
  }, [token]);

  return (
    <div>
      <div className="admin-navbar-container">
        <AdminNavBar />
      </div>

      <div className="admin-form-container">
        <AdminForm />
      </div>

      <div className="admin-users-container">
        <AdminUsers />
      </div>
    </div>
  );
}

export default Admin;

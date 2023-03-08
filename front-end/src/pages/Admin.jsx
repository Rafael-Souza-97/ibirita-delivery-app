import React from 'react';
import AdminForm from '../components/AdminForm';
import AdminNavBar from '../components/AdminNavBar';
import AdminUsers from '../components/AdminUsers';

function Admin() {
  return (
    <div>
      <div className="admin-navbar-container">
        <AdminNavBar />
      </div>

      <div className="admin-form-container">
        <AdminForm />
      </div>

      <div className="admin-form-container">
        <AdminUsers />
      </div>
    </div>
  );
}

export default Admin;

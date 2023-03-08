import React, { useState, useEffect, useContext } from 'react';
import Context from '../context/context';
import { requestAllUsers, deleteUserByID } from '../services/requests';

function AdminUsers() {
  const { newUserRegisterByAdmin } = useContext(Context);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await requestAllUsers();
      setUsers(response);
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      if (newUserRegisterByAdmin) {
        const response = await requestAllUsers();
        setUsers(response);
      }
    }

    fetchUsers();
  }, [newUserRegisterByAdmin]);

  const handleDeleteUser = async (id) => {
    const adminData = JSON.parse(localStorage.getItem('user'));
    const { token } = adminData;
    await deleteUserByID(id, token);
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div
      className="admin-table__order-table"
      data-testid="customer_element-order-table"
    >
      <h3>Lista de usuários</h3>
      <table className="admin-table__table">
        <thead>
          <tr>
            <th className="admin-table__header">Item</th>
            <th className="admin-table__header">Nome</th>
            <th className="admin-table__header">E-mail</th>
            <th className="admin-table__header">Tipo</th>
            <th className="admin-table__header">Excluir</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={ index + 1 }>
              <td
                className="admin-table__data"
                data-testid={
                  `admin_manage__element-user-table-item-number-${index}`
                }
              >
                { index + 1 }
              </td>
              <td
                className="admin-table__data"
                data-testid={ `admin_manage__element-user-table-name-${index}` }
              >
                { user.name }
              </td>
              <td
                className="admin-table__data"
                data-testid={ `admin_manage__element-user-table-email-${index}` }
              >
                { user.email }
              </td>
              <td
                className="admin-table__data"
                data-testid={
                  `admin_manage__element-user-table-role-${index}`
                }
              >
                { user.role }
              </td>
              <td
                className="admin-table__data"
                data-testid={ `admin_manage__element-user-table-remove-${index}` }
              >
                <button
                  type="button"
                  className="admin-table__button"
                  onClick={ () => handleDeleteUser(user.id) }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;

import React, { useState, useEffect } from 'react';
import { requestAllUsers } from '../services/requests';

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await requestAllUsers();
      setUsers(response);
    }

    fetchUsers();
  }, []);

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
                  onClick={ handleRemove(user.id) }
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

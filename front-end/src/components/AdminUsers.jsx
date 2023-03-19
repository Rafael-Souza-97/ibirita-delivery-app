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
      className="flex flex-col items-center mt-20"
      data-testid="customer_element-order-table"
    >
      <div className="w-full overflow-x-auto text-center">
        <h3 className="text-3xl mb-6 font-glacial-bold md:mr-16">Lista de usuários</h3>
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6 text-center uppercase font-semibold text-sm">Item</th>
              <th className="py-3 px-6 text-center uppercase font-semibold text-sm">Nome</th>
              <th className="py-3 px-6 text-center uppercase font-semibold text-sm">E-mail</th>
              <th className="py-3 px-6 text-center uppercase font-semibold text-sm">Tipo</th>
              <th className="py-3 px-6 text-center uppercase font-semibold text-sm">Excluir</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={ index + 1 } className="border-b border-gray-200 font-glacial-regular">
                <td
                  className="py-4 px-6 text-center"
                  data-testid={
                    `admin_manage__element-user-table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </td>
                <td
                  className="py-4 px-6 text-center"
                  data-testid={ `admin_manage__element-user-table-name-${index}` }
                >
                  { user.name }
                </td>
                <td
                  className="py-4 px-6 text-center"
                  data-testid={ `admin_manage__element-user-table-email-${index}` }
                >
                  { user.email }
                </td>
                <td
                  className="py-4 px-6 text-center"
                  data-testid={
                    `admin_manage__element-user-table-role-${index}`
                  }
                >
                  { user.role }
                </td>
                <td
                  className="py-4 px-6 text-center"
                  data-testid={ `admin_manage__element-user-table-remove-${index}` }
                >
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md"
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
    </div>
  );
}

export default AdminUsers;

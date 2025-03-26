import React, { useState } from 'react';
import { FaEdit, FaCheck, FaTimes, FaUserShield, FaUser, FaUserTie, FaTrash } from 'react-icons/fa';
import Pagination from '../../components/Pagination'; // Adjust the import path as needed

const Users = () => {
  // Sample user data
  const allUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'moderator' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'user' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'user' },
    { id: 6, name: 'David Lee', email: 'david@example.com', role: 'user' },
    { id: 7, name: 'Eva Garcia', email: 'eva@example.com', role: 'user' },
    { id: 8, name: 'Frank Miller', email: 'frank@example.com', role: 'user' },
    { id: 9, name: 'Grace Davis', email: 'grace@example.com', role: 'user' },
    { id: 10, name: 'Henry Wilson', email: 'henry@example.com', role: 'user' },
    { id: 11, name: 'Ivy Taylor', email: 'ivy@example.com', role: 'user' },
    { id: 12, name: 'Jack Anderson', email: 'jack@example.com', role: 'user' },
    { id: 13, name: 'Karen Thomas', email: 'karen@example.com', role: 'user' },
  ];

  const USERS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [tempRole, setTempRole] = useState('');

  // Calculate pagination
  const totalPages = Math.ceil(allUsers.length / USERS_PER_PAGE);
  const indexOfLastUser = currentPage * USERS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
  const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleEdit = (id, currentRole) => {
    setEditingId(id);
    setTempRole(currentRole);
  };

  const handleSave = (id) => {
    // In a real app, you would update the data in your state/API here
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (id) => {
    // In a real app, you would delete from state/API here
    console.log('Delete user', id);
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin': return <FaUserShield className="text-amber-400" />;
      case 'moderator': return <FaUserTie className="text-amber-300" />;
      default: return <FaUser className="text-zinc-400" />;
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-zinc-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-amber-500 mb-6 flex items-center">
          <span className="bg-zinc-800 text-amber-500 p-2 rounded-lg mr-3">
            <FaUserShield className="w-5 h-5" />
          </span>
          User Management
        </h1>

        <div className="overflow-x-auto rounded-lg border border-zinc-700">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="py-3 px-4 text-left text-amber-500 font-medium">User</th>
                <th className="py-3 px-4 text-left text-amber-500 font-medium">Email</th>
                <th className="py-3 px-4 text-left text-amber-500 font-medium">Role</th>
                <th className="py-3 px-4 text-center text-amber-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700">
              {currentUsers.map(user => (
                <tr key={user.id} className="bg-zinc-800 hover:bg-zinc-750 transition-colors">
                  <td className="py-3 px-4 text-zinc-200 font-medium">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center text-amber-400 font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-zinc-300">{user.email}</td>
                  <td className="py-3 px-4">
                    {editingId === user.id ? (
                      <select
                        value={tempRole}
                        onChange={(e) => setTempRole(e.target.value)}
                        className="bg-zinc-700 border border-zinc-600 text-zinc-200 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      >
                        <option value="admin" className="bg-zinc-800">Admin</option>
                        <option value="moderator" className="bg-zinc-800">Moderator</option>
                        <option value="user" className="bg-zinc-800">User</option>
                      </select>
                    ) : (
                      <div className="flex items-center">
                        {getRoleIcon(user.role)}
                        <span className="ml-2 capitalize text-zinc-200">{user.role}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center space-x-3">
                      {editingId === user.id ? (
                        <>
                          <button
                            onClick={() => handleSave(user.id)}
                            className="p-2 text-green-500 hover:text-green-400 hover:bg-zinc-700 rounded-full transition-colors"
                            title="Save"
                          >
                            <FaCheck className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="p-2 text-red-500 hover:text-red-400 hover:bg-zinc-700 rounded-full transition-colors"
                            title="Cancel"
                          >
                            <FaTimes className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(user.id, user.role)}
                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-zinc-700 rounded-full transition-colors"
                            title="Edit Role"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="p-2 text-red-500 hover:text-red-400 hover:bg-zinc-700 rounded-full transition-colors"
                            title="Delete User"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        <div className="mt-4 text-sm text-zinc-400">
          Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, allUsers.length)} of {allUsers.length} users
        </div>
      </div>
    </div>
  );
};

export default Users;
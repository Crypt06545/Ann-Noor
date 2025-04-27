import React, { useState } from "react";
import {
  FaEdit,
  FaCheck,
  FaTimes,
  FaUserShield,
  FaUser,
  FaUserTie,
  FaTrash,
} from "react-icons/fa";
import Pagination from "../../components/Pagination";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsers } from "../../api/Api";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Users = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const allUsers = data?.data || [];

  const USERS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  // Calculate pagination safely
  const totalPages = Math.ceil(allUsers.length / USERS_PER_PAGE);
  const indexOfLastUser = currentPage * USERS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
  const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);

  const updateUserMutation = useMutation({
    mutationFn: ({ email, role }) =>
      axiosInstance.patch(`/users/update-role/${email}`, { role }),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User role updated successfully");
      setEditingId(null);
    },
    onError: (error) => {
      toast.error(
        `Error updating user: ${error.response?.data?.message || error.message}`
      );
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (email) => axiosInstance.delete(`/users/delete-user/${email}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("Deleted!", "User has been deleted.", "success");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete user");
    },
  });

  const handleEdit = (email, currentRole) => {
    setEditingId(email);
    setSelectedRole(currentRole);
  };

  const handleSave = (email) => {
    if (!selectedRole) {
      toast.error("Please select a role");
      return;
    }
    updateUserMutation.mutate({ email, role: selectedRole });
  };

  const handleCancel = () => {
    setEditingId(null);
    setSelectedRole("");
  };

  const handleDelete = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(email);
      }
    });
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <FaUserShield className="text-amber-400" />;
      case "customer":
        return <FaUserTie className="text-amber-300" />;
      default:
        return <FaUser className="text-zinc-400" />;
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return <div className="text-red-500 p-4">Error: {error.message}</div>;
  if (!allUsers.length)
    return <div className="text-zinc-400 p-4">No users found</div>;

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
                <th className="py-3 px-4 text-left text-amber-500 font-medium">
                  User
                </th>
                <th className="py-3 px-4 text-left text-amber-500 font-medium">
                  Email
                </th>
                <th className="py-3 px-4 text-left text-amber-500 font-medium">
                  Role
                </th>
                <th className="py-3 px-4 text-center text-amber-500 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700">
              {currentUsers.map((user) => (
                <tr
                  key={user._id}
                  className="bg-zinc-800 hover:bg-zinc-750 transition-colors"
                >
                  <td className="py-3 px-4 text-zinc-200 font-medium">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center text-amber-400 font-bold">
                        {user.username?.charAt(0) || "U"}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium">
                          {user.username || "Unknown User"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-zinc-300">
                    {user.email || "No email"}
                  </td>
                  <td className="py-3 px-4">
                    {editingId === user.email ? (
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="bg-zinc-700 border border-zinc-600 text-zinc-200 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      >
                        <option value="admin">Admin</option>
                        <option value="customer">Customer</option>
                        <option value="user">User</option>
                      </select>
                    ) : (
                      <div className="flex items-center">
                        {getRoleIcon(user.role)}
                        <span className="ml-2 capitalize text-zinc-200">
                          {user.role || "user"}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center space-x-3">
                      {editingId === user.email ? (
                        <>
                          <button
                            onClick={() => handleSave(user.email)}
                            className="p-2 text-green-500 hover:text-green-400 hover:bg-zinc-700 rounded-full transition-colors"
                            title="Save"
                            disabled={updateUserMutation.isLoading}
                          >
                            {updateUserMutation.isLoading ? (
                              <LoadingSpinner size={4} />
                            ) : (
                              <FaCheck className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={handleCancel}
                            className="p-2 text-red-500 hover:text-red-400 hover:bg-zinc-700 rounded-full transition-colors"
                            title="Cancel"
                            disabled={updateUserMutation.isLoading}
                          >
                            <FaTimes className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(user.email, user.role)}
                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-zinc-700 rounded-full transition-colors"
                            title="Edit Role"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.email)}
                            className="p-2 text-red-500 hover:text-red-400 hover:bg-zinc-700 rounded-full transition-colors"
                            title="Delete User"
                            disabled={deleteUserMutation.isLoading}
                          >
                            {deleteUserMutation.isLoading &&
                            deleteUserMutation.variables === user.email ? (
                              <LoadingSpinner size={4} />
                            ) : (
                              <FaTrash className="w-4 h-4" />
                            )}
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

        {/* Pagination - Only show if we have users */}
        {allUsers.length > 0 && (
          <>
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>

            <div className="mt-4 text-sm text-zinc-400">
              Showing {indexOfFirstUser + 1} to{" "}
              {Math.min(indexOfLastUser, allUsers.length)} of {allUsers.length}{" "}
              users
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Users;

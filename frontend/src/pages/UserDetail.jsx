import React, { useState, useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar'
import '../styles/UserDetail.scss';

const UserDetail = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:4546/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData({ firstName: user.firstName, lastName: user.lastName, email: user.email });
  };

  const handleDeleteClick = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:4546/users/${userId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete user');
        }

        // Remove the deleted user from the state
        setUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
        alert('User  deleted successfully.');
      } catch (err) {
        console.error('Error occurred:', err);
        setError(err.message);
      }
    }
  };


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log('Selected User ID:', selectedUser._id);
    console.log('Form Data:', formData);

    try {
      const response = await fetch(`http://localhost:4546/users/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response Status:', response.status);
      const responseBody = await response.text();
      console.log('Response Body:', responseBody);



      if (!response.ok) {
        throw new Error(`Failed to update user: ${responseBody}`);
      }

      const updatedUser = JSON.parse(responseBody);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
      );
      setSelectedUser(null);
      setFormData({});
    } catch (err) {
      console.error('Error occurred:', err);
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
    <AdminNavbar />
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
  <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>User Details</h1>
  {selectedUser ? (
    <form
      onSubmit={handleFormSubmit}
      style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Edit User</h2>
      <label style={{ display: 'block', marginBottom: '10px' }}>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleFormChange}
          style={{
            width: '100%',
            padding: '8px',
            margin: '5px 0 15px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </label>
      <label style={{ display: 'block', marginBottom: '10px' }}>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleFormChange}
          style={{
            width: '100%',
            padding: '8px',
            margin: '5px 0 15px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </label>
      <label style={{ display: 'block', marginBottom: '10px' }}>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleFormChange}
          style={{
            width: '100%',
            padding: '8px',
            margin: '5px 0 15px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </label>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          type="submit"
          style={{
            padding: '10px 15px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setSelectedUser(null)}
          style={{
            padding: '10px 15px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  ) : (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
      }}
    >
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>First Name</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Last Name</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Created At</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Edit</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Delete</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user._id}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.firstName}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.lastName}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              {new Date(user.createdAt).toLocaleDateString()}
            </td>
            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
              <button
                className="edit"
                onClick={() => handleEditClick(user)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Edit
              </button>
            </td>
            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
              <button
                className="delete"
                onClick={() => handleDeleteClick(user._id)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

    </>
  );
};

export default UserDetail;
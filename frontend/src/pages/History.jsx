import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/history.scss"
import AdminNavbar from "../components/AdminNavbar"
const StudentHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const uid = localStorage.getItem('id'); // Get the user ID from local storage

  const fetchHistory = async () => {
    try {
      // Use GET request with the ID in query params
      const response = await axios.get(`http://localhost:4546/auth/history`, {
        params: { id: uid },
        withCredentials: true, // Include credentials if required
      });
      console.log(response.data);
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
      alert("Failed to fetch history. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (uid) { // Check if ID is available
      fetchHistory();
    } else {
      alert("User ID not found in local storage.");
      setLoading(false);
    }
  }, [uid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <AdminNavbar />

    <table className="history-table">
  <thead>
    <tr>
      <th>Date & Time</th>
      <th>User ID</th>
      {/* Uncomment the line below if you want to include the IP address */}
      {/* <th>IP Address</th> */}
    </tr>
  </thead>
  <tbody>
    {history?.map((item, index) => (
      <tr key={index}>
        <td>{item?.date}</td>
        <td>{item?.userId}</td>
        {/* Uncomment the line below if you want to include the IP address */}
        {/* <td>{item?.ip}</td> */}
      </tr>
    ))}
  </tbody>
</table>
</>
  );
};

export default StudentHistory;

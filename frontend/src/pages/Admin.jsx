import React, { useEffect, useState } from 'react'
//import Navbar from '../components/Navbar'
import AdminNavbar from '../components/AdminNavbar'
import { ResponsiveTable } from 'responsive-table-react';
import "../styles/Admin.scss"
import Footer from '../components/Footer';

const columns = [

  {
    id: "name",
    text: "name",
  },
  {
    id: "startDate",
    text: "startDate",
  },
  {
    id: "endDate",
    text: "endDate",
  },
  {
    id: "totalPrice",
    text: "totalPrice",
  },
  {
    id: "title",
    text: "title",
  },


];


const Admin = () => {

  const [data11, setData11] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4546/bookings/');
        // console.log(response.data);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();


        console.log(result);

        const formattedData = result.map((item) => ({
          name: `${item?.customerId?.firstName}`,
          startDate: `${item?.startDate}`,
          endDate: `${item?.endDate}`,
          totalPrice: `${item?.totalPrice}`,
          title: `${item?.listingId?.title}`,
        }));

        setData11(formattedData);


      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);
  // console.log(data11);

  return (
    <>
      <AdminNavbar />
      <div className="report-container" id="report" >
        <ResponsiveTable columns={columns} data={data11} />
      </div>
      <Footer/>
    </>
  )
}

export default Admin
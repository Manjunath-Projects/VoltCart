// import React from 'react'
// import { toast } from "react-toastify";
// import { backEndURL } from "../App";
// import axios from "axios";
// import { useState } from 'react';
// import { useEffect } from 'react';
// import "../styles/subscribe.css"

// const Subscribers = ({ token }) => {

//     const [emails, setEmails] = useState([]);
//     const fetchSubscribers = async () => {
//         if (!token) return;
//         try {
//             const response = await axios.post(
//                 backEndURL + "/api/email/subscribers",
//                 {},
//                 { headers: { token } }
//             );
//             if (response.data.success) {
//                 setEmails(response.data.emails);
//             } else {
//                 toast.error(response.data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };
//     useEffect(() => {
//         fetchSubscribers();
//     }, [token]);

//     return (
//         <div className="subscribers-container">
//             <h2 className="subscribers-title">Subscribers</h2>
//             {emails.length === 0 ? (
//                 <p className="subscribers-empty">No subscribers found.</p>
//             ) : (
//                 <ul className="subscribers-list">
//                     {emails.map((entry, index) => (
//                         <li key={index} className="subscribers-item">
//                             {entry.email}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>

//     )
// }

// export default Subscribers


import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backEndURL } from "../App";
import axios from "axios";
import "../styles/subscribe.css";

const Subscribers = ({ token }) => {
  const [emails, setEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmails, setFilteredEmails] = useState([]);

  const fetchSubscribers = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backEndURL + "/api/email/subscribers",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setEmails(response.data.emails);
        setFilteredEmails(response.data.emails); // initially same
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, [token]);

  useEffect(() => {
    const filtered = emails.filter((entry) =>
      entry.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmails(filtered);
  }, [searchTerm, emails]);

  return (
    <div className="subscribers-container">
      <h2 className="subscribers-title">Subscribers</h2>

      <input
        type="text"
        placeholder="Search emails..."
        className="subscribers-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredEmails.length === 0 ? (
        <p className="subscribers-empty">No matching subscribers found.</p>
      ) : (
        <ul className="subscribers-list">
          {filteredEmails.map((entry, index) => (
            <li key={index} className="subscribers-item">
              {entry.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Subscribers;

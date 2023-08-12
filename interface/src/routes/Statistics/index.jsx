import React, { useState, useEffect, useRef, useContext } from 'react';
import './statistics.css';
import { Chart } from 'chart.js/auto';
import axios from 'axios';

import { UserDataContext } from "../../stores/UserDataStore";
import { ToastContainer, toast } from 'react-toastify';

const Statistics = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [userData, setUserData] = useContext(UserDataContext) 

const handleOptionClick = async (option) => {
  setSelectedOption(option);
  if (option === 'excel') {
      console.log(userData)

    try {
      const response = await axios.post('http://localhost:4000/script/script.py/run', { responseType: 'blob' }, 
        {
          headers: {
            Authorization : `${userData.token}`
          }
        }
      );
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'data.xlsx';
      downloadLink.click();
    } catch (err) {
      if (err.response && err.response.status === 403) {
        toast.error(err.response.data)
      }
    }
  }
};


  return (
    <div className="dashboard-container">
      <h2 className="section-title">Statistics</h2>
      <div className="dashboard-content">
        <div className="dashboard-options">
          <div className="dashboard-widget">
            <h3 className="widget-title">Excel</h3>
            <button
              className={`option-button ${selectedOption === 'excel' ? 'selected' : ''}`}
              onClick={() => handleOptionClick('excel')}
            >
              Get forms as Excel
            </button>
          </div>
          <div className="dashboard-widget">
            <h3 className="widget-title">PDF</h3>
            <button
              className={`option-button ${selectedOption === 'pdf' ? 'selected' : ''}`}
              onClick={() => handleOptionClick('pdf')}
            >
              Get forms as PDF
            </button>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Statistics;

import React, { useState } from "react";
import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
import "../assets/styles/contractor.css";
import { Link } from "react-router";
export default function Contractor() {
  const [formData, setFormData] = useState({
    Project_ID: "",
    Category: "",
    Supervisor: "",
    Contractor: "",
    Cost: "",
    Deadline_Date: "",
  });

  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormData({
      Project_ID: "",
      Category: "",
      Supervisor: "",
      Contractor: "",
      Cost: "",
      Deadline_Date: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Read existing Excel file
    fetch("/data/work_progress_contractor.xlsx")
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        
        // Append new data
        jsonData.push(formData);

        // Convert JSON back to worksheet
        const newSheet = XLSX.utils.json_to_sheet(jsonData);
        const newWorkbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(newWorkbook, newSheet, sheetName);

        // // Save updated Excel file
        // const excelBuffer = XLSX.write(newWorkbook, { bookType: "xlsx", type: "array" });
        // const file = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

        // saveAs(file, "work_progress_contractor_updated.xlsx");

        setNotification("Form submitted successfully!");
        setTimeout(() => setNotification(""), 3000);
        handleReset();
      });
  };

  return (
    <div className="form-container4">
      {notification && <div className="notification">{notification}</div>}
      <div className="back-btn">
       <Link to="/work-progress">
        <button >← Back to Summary</button>
       </Link>
      </div> 

        <h2>Contractor Form</h2>
        <form onSubmit={handleSubmit} className="form-grid4">
        <div className="form-row4">
          <label>Project ID:</label>
          <input type="text" name="Project_Id" value={formData.Project_ID} onChange={handleChange} required />
        </div>

        <div className="form-row4">
          <label>Category:</label>
          <input type="text" name="Category" value={formData.Category} onChange={handleChange} required />
        </div>

        <div className="form-row4">
          <label>Supervisor:</label>
          <input type="text" name="Supervisor" value={formData.Supervisor} onChange={handleChange} required />
        </div>

        <div className="form-row4">
          <label>Contractor:</label>
          <input type="text" name="Contractor" value={formData.Contractor} onChange={handleChange} required />
        </div>

        <div className="form-row4">
          <label>Cost:</label>
          <input type="number" name="Cost" value={formData.Cost} onChange={handleChange} required />
        </div>

        <div className="form-row4">
          <label>Deadline Date:</label>
          <input type="date" name="Deadline_date" value={formData.Deadline_date} onChange={handleChange} required />
        </div>

        <div className="buttons4">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
}

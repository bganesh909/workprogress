import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import "../assets/styles/workprogresstable.css";

export default function WorkProgressTable() {
  const [excelData, setExcelData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [filters, setFilters] = useState({
    projectId: "Project_Id",
    category: "Category",
    delays: "Delay",
    supervisorSearch: "",
  });

  const [visibleRows, setVisibleRows] = useState(50);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/work_progress_main.xlsx");
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        setExcelData(jsonData);
        setFilteredData(jsonData);
      } catch (error) {
        console.error("Failed to load Excel data:", error);
      }
    };
    fetchData();
  }, []);

  const projectIds = ["Project_Id", ...new Set(excelData.map(r => r.Project_ID))];
  const workTypes = ["Category", ...new Set(excelData.map(r => r["Category "]))];
  const delayOptions = ["Delay", ...new Set(excelData.map(r => r.Delays || "None"))];

  useEffect(() => {
    let data = [...excelData];

    if (filters.projectId !== "Project_Id") {
      data = data.filter(d => d.Project_ID === filters.projectId);
    }

    if (filters.category !== "Category") {
      data = data.filter(d => d["Category "] === filters.category);

    }

    if (filters.delays !== "Delay") {
      data = data.filter(d => (d.Delays || "None") === filters.delays);
    }

    if (filters.supervisorSearch.trim() !== "") {
      data = data.filter(d =>
        d.Supervisor?.toLowerCase().includes(filters.supervisorSearch.toLowerCase())
      );
    }

    setFilteredData(data);
    setVisibleRows(30);
  }, [filters, excelData]);

  const resetFilters = () => {
    setFilters({
      projectId: "Project_Id",
      category: "Category",
      delays: "Delay",
      supervisorSearch: "",
    });
  };

  const visibleData = filteredData.slice(0, visibleRows);

  return (
    <div className="table-container3">
      <div className="top-buttons3">
        <Link to="/work-progress">
          <button className="top-btnn3">← Back to Summary</button>
        </Link>
      </div>

      <h2>Work Progress Report Table</h2>
     
      <div className="filters3">
        <select
          value={filters.projectId}
          onChange={e => setFilters(prev => ({ ...prev, projectId: e.target.value }))}
        >
          {projectIds.map((id, i) => (
            <option key={i} value={id}>{id}</option>
          ))}
        </select>

        <select
          value={filters.category}
          onChange={e => setFilters(prev => ({ ...prev, category: e.target.value }))}
        >
          {workTypes.map((type, i) => (
            <option key={i} value={type}>{type}</option>
          ))}
        </select>

        <select
          value={filters.delays}
          onChange={e => setFilters(prev => ({ ...prev, delays: e.target.value }))}
        >
          {delayOptions.map((delay, i) => (
            <option key={i} value={delay}>{delay}</option>
          ))}
        </select>
        <div className="suprvsr">
        <input
          type="text"
          placeholder="Search Supervisor"
          value={filters.supervisorSearch}
          onChange={e =>
            setFilters(prev => ({ ...prev, supervisorSearch: e.target.value }))
          }
        />
        </div>

        <button className="reset-btn3" onClick={resetFilters}>Reset_Filters</button>
      </div>
      <div className="tsize">
          <Link to="/contractor-workprogress-table" className="card-link">
            <div className="card-wide table-container0">
              <h2 className="card-title">
                View Contractor Report Table →
              </h2>
            </div>
          </Link>
        </div>

      <table>
        <thead>
          <tr>
            <th>Project ID</th>
            <th>Category</th>
            <th>Progress %</th>
            <th>Delays</th>
            <th>Comments</th>
            <th>Safety Issues</th>
            <th>Supervisor</th>
            <th>Contractor</th>
          </tr>
        </thead>
        <tbody>
          {visibleData.length > 0 ? (
            visibleData.map((row, i) => (
              <tr key={i}>
                <td>{row.Project_ID}</td>
                <td>{row["Category "]}</td>
                <td>{row.Progress_Percentage}%</td>
                <td>{row.Delays || "None"}</td>
                <td>{row.Comments || "-"}</td>
                <td>{row.Safety_Issues || "-"}</td>
                <td>{row.Supervisor || "-"}</td>
                <td>{row.Contractor || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No matching data found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {visibleRows < filteredData.length && (
        <button
          className="view-more-btn3"
          onClick={() => setVisibleRows(prev => prev + 30)}
        >
          View More
        </button>
      )}
    </div>
  );
}

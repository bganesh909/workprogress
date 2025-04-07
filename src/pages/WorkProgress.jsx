import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import "../assets/styles/workprogress.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label"><strong>Project:</strong> {label}</p>
        <ul className="tooltip-list">
          {payload.map((entry, index) => (
            <li key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}%
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
};

export default function WorkProgress() {
  const barColors = [
    "#4ade80", "#f87171", "#fbbf24",
    "#60a5fa", "#a78bfa", "#f472b6", "#34d399"
  ];

  const [chartData, setChartData] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [selectedProject, setSelectedProject] = useState("All");

  useEffect(() => {
    const fetchExcelData = async () => {
      try {
        const response = await fetch("/data/work_progress_main.xlsx");
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setExcelData(jsonData);

        const topProjects = [...new Set(jsonData.map(r => r.Project_ID))].slice(0, 5);
        const allWorkTypesSet = new Set();
        const projectMap = {};

        // Process each row in the data
        jsonData.forEach((row) => {
          const projectId = row.Project_ID;
          const workType = row["Category "]; // The 'category' field is the work type
          const progress = parseFloat(row.Progress_Percentage) || 0;

          if (!topProjects.includes(projectId)) return;

          allWorkTypesSet.add(workType);
          if (!projectMap[projectId]) {
            projectMap[projectId] = { project: projectId }; // Initialize the project
          }
          projectMap[projectId][workType] = progress; // Add progress for the work type
        });
        setWorkTypes([...allWorkTypesSet]);
        setChartData(Object.values(projectMap)); // Store the processed data for the chart
      } catch (err) {
        console.error("Failed to load Excel data:", err);
      }
    };

    fetchExcelData();
  }, []);

  const projectOptions = ["All", ...new Set(excelData.map((r) => r.Project_ID))];
  const filteredData =
    selectedProject === "All"
      ? excelData
      : excelData.filter((r) => r.Project_ID === selectedProject);

  const getProgressColor = (percentage) => {
    if (percentage <= 20) return "progress-red";
    if (percentage <= 60) return "progress-orange";
    return "progress-green";
  };

  return (
    <div className="dashboard-grid">
      <div className="card-links">
        <div className="card-link-group">
          <Link to="/add-task" className="form-link">
            <h2 className="card-title">Add Task</h2>
          </Link>
        </div>
        <div className="card-linked">
          <Link to="/task-list" className="form-links">
            <h2 className="card-title">Task List</h2>
          </Link>
        </div>
        <div className="card-linked">
          <Link to="/contractor" className="form-links">
            <h2 className="card-title">Contractor</h2>
          </Link>
        </div>

        <div className="tsize">
          <Link to="/work-progress-table" className="card-link">
            <div className="card-wide table-container0">
              <h2 className="card-title">
                View Full Work Progress Report Table →
              </h2>
            </div>
          </Link>
        </div>
      </div>

      <div className="card-row">
        <div className="card card-half">
          <div className="card-header">
            <h2 className="card-title">Daily Work Summary</h2>
            <select
              className="filter-dropdown"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              {projectOptions.map((project, i) => (
                <option key={i} value={project}>
                  {project}
                </option>
              ))}
            </select>
          </div>

          {filteredData.length > 0 ? (
            filteredData.map((report, index) => (
              <div key={index} className="progress-section">
                <p className="progress-label">
                  {report.Project_ID} - {report.category}
                </p>
                <div className="progress-inline">
                  <div className="progress-bar-bg">
                    <div
                      className={`progress-bar-fill ${getProgressColor(report.Progress_Percentage)}`}
                      style={{ width: `${report.Progress_Percentage}%` }}
                    ></div>
                  </div>
                  <span className="progress-text-right">
                    {report.Progress_Percentage}%
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>

        <div className="card card-half bar-chart-container">
          <div className="bar-chart-header">
            <h2 className="bar-card-title">Work Progress Overview</h2>
          </div>
          <div className="bar-chart-content">
            <ResponsiveContainer width="200%" height={350}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: -20, left: -25, bottom: 10 }}
              >
                <XAxis
                  dataKey="project"
                  angle={-45}
                  fontSize={10}
                  interval={0}
                  dy={10}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "none" }} />
                {workTypes.map((type, index) => (
                  <Bar
                    key={type}
                    dataKey={type}
                    fill={barColors[index % barColors.length]}
                    name={type}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>

            
            <ul className="bar-chart-legend">
              {workTypes.map((type, index) => (
                <li key={index}>
                  <span
                    className="legend-color"
                    style={{ backgroundColor: barColors[index % barColors.length] }}
                  ></span>
                  {type}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="last">
        <div className="card-wide0">
          <h2 className="card-title">Delays & Issues</h2>
          {filteredData.filter((r) => r.Delays && r.Delays !== "None").length > 0 ? (
            filteredData
              .filter((r) => r.Delays && r.Delays !== "None")
              .map((r, i) => (
                <div key={i} className="alert alert-warning">
                  <p className="alert-title">{r.Project_ID} - {r.Delays}</p>
                  <p className="alert-text">{r.Comments || "No additional comments."}</p>
                </div>
              ))
          ) : (
            <p>No delays reported.</p>
          )}
        </div>

        <div className="card-wide0">
          <h2 className="card-title">Safety Reports</h2>
          {filteredData.filter((r) => r.Safety_Issues && r.Safety_Issues !== "None").length > 0 ? (
            filteredData
              .filter((r) => r.Safety_Issues && r.Safety_Issues !== "None")
              .map((r, i) => (
                <div key={i} className="alert alert-danger">
                  <p className="alert-title">
                    {r.Project_ID} - Safety Issue: {r.Safety_Issues}
                  </p>
                  <p className="alert-text">Reported by {r.Supervisor || "N/A"}</p>
                </div>
              ))
          ) : (
            <p>No safety issues reported.</p>
          )}
        </div>
      </div>
    </div>
  );
}

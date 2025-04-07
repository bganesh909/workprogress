import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "../pages/Home";
import Help from "../pages/Help";
import Attendance from "../pages/Attendance";
import NotFound from "../pages/NotFound";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

import Equipment from "../pages/Equipment";
import Materials from "../pages/Materials";
import SalesTargets from "../pages/SalesTargets";
import SiteVisits from "../pages/SiteVisits";
import WorkProgress from "../pages/WorkProgress";
import WorkProgressTable from "../pages/WorkProgressTable";
import ContractorWorkProgressTable from "../pages/ContractorWorkProgressTable";
import WorkUpdates from "../pages/WorkUpdates";
import Contractor from "../pages/Contractor";
import TaskList from "../pages/TaskList";
import AddTask from "../pages/AddTask";
import CurrentTime from "../components/CurrentTime";

function AppRoutes () {
    return (
            <>
            <Header />
            <CurrentTime />
            <SideBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/help" element={<Help />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/sales-targets" element={<SalesTargets />} />
                <Route path="/materials" element={<Materials />} />
                <Route path="/work-progress" element={<WorkProgress />} />
                <Route path="/work-progress-table" element={<WorkProgressTable />} />
                <Route path="/contractor-workprogress-table" element={<ContractorWorkProgressTable/>} />
                <Route path="contractor" element={<Contractor/>}/>
                <Route path="/add-task" element={<AddTask />} />
                <Route path="/task-list" element={<TaskList />} />
                <Route path="/work-updates" element={<WorkUpdates />} />
                <Route path="/site-visits" element={<SiteVisits />} />
                <Route path="/equipment" element={<Equipment />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            </>
    );

};

export default AppRoutes;
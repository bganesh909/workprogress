import React from "react"
import { Link } from "react-router-dom"
import SideBarOption from "./SideBarOpton";


const styles = {
    sidebar: {
        width: "160px",
        // height: "100vh",
        top:"16vh",
        left:"2vw",
        padding: "10px",
        // background: "#e5e5e5",
        // border: "2px solid rgba(0,0,0,0.4)",
        borderRadius: "10px",
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        boxShadow: "4px 3px 10px rgba(0,0,0,0.1)"      
    },
};


function SideBar () {

    return (
        <div style={styles.sidebar}>
          <h3>Menu</h3>
          <SideBarOption optionUrl="/" optionName="Home"/>
          <SideBarOption optionUrl="/attendance" optionName="Attendance"/>
          <SideBarOption optionUrl="/sales-targets" optionName="Sales Targets"/>
          <SideBarOption optionUrl="/materials" optionName="Materials"/>
          <SideBarOption optionUrl="/work-progress" optionName="Work Progress"/>
          {/* <SideBarOption optionUrl="/work-updates" optionName="Work Updates"/> */}
          <SideBarOption optionUrl="/site-visits" optionName="Site Visits"/>
          <SideBarOption optionUrl="/equipment" optionName="Equipment"/>
          <SideBarOption optionUrl="/help" optionName="Help"/>
        </div>
    );
};

export default SideBar;
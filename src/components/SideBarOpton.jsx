import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/side-bar-option.css";

// const optionStyle = {
//     textDecoration: "none",
//     color: "#4a5759",
//     padding: "10px 0",
//     fontWeight: "bold",
//     background: "#d3d3d3",
//     borderRadius: "5px",
//     boxShadow: "1px 0px 2px rgba(0,0,0,0.1)",
//     fontSize: "15px"
// }


function SideBarOption (props) {

    return (
        <Link to={props.optionUrl} className="sidebar-option">{props.optionName}</Link>
    );

};

export default SideBarOption;
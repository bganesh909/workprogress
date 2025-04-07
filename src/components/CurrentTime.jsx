// import React from "react";


// const timeStyle = {
//     position: "fixed",
//     left: "2vw",
//     top: 0,
//     width: "160px",
//     boxShadow: "4px 3px 5px rgba(0,0,0,0.1)",
//     borderRadius: "10px"
// } 

// function CurrentTime () {
//     const date = new Date();
//     const formattedDate = date.toLocaleDateString("en-GB", {
//         day: "numeric",
//         month: "short",
//         year: "numeric",
//         hour: "numeric",
//         minute: "2-digit",
//         second: "2-digit"
//     })
//     return (
//         <div style={timeStyle}>
//             <p style={{fontWeight:"bold", color: "Gray"}}>{formattedDate}</p>
//         </div>

//     );
// };

// export default CurrentTime;

import React, { useState, useEffect } from "react";

const timeStyle = {
    position: "fixed",
    left: "2vw",
    top: 0,
    width: "160px",
    padding: "0 8px",
    boxShadow: "4px 3px 5px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    backgroundColor: "#fff",
    textAlign: "center"
};

function CurrentTime() {
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const date = new Date();
            setFormattedDate(
                date.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    second: "2-digit" // Added seconds for real-time updates
                })
            );
        };

        updateTime(); // Update immediately
        const interval = setInterval(updateTime, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div style={timeStyle}>
            <p style={{ fontWeight: "bold", fontSize: "16px" }}>{formattedDate}</p>
        </div>
    );
}

export default CurrentTime;
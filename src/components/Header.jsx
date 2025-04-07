import React from 'react';

const styles = {
    header: {
        background: "white",
        textAlign: "center",
        position: "fixed",
        width: "80vw",
        top: "0vh",
        // left: "38vw",
        // right: "38vw",
        zIndex: 1000,
        // padding: "1px",
        boxShadow: "4px 3px 5px rgba(0,0,0,0.1)",
        borderRadius: "10px"
    }
}


const Header = () => {

    return (
        <header style={styles.header}>
            <h2>Construction Management ERP Dashboard demo</h2>
        </header>
    );
};

export default Header;
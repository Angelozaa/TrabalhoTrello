import React from 'react';

const Navbar = () => {
    const styles = {
        navbar: {
            width: '100%',
            padding: '15px 30px',
            backgroundColor: '#2b2b2b',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1000,
        },
    };

    return <nav style={styles.navbar}>{/* Navbar vazia conforme solicitado */}</nav>;
};

export default Navbar;

import React from 'react';

export default function Home() {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Welcome to the Project!</h1>
            <p style={styles.text}>
                This project was developed as part of the 4th semester WEB2 assignment.
                It is designed to showcase various capabilities within a web application context.
            </p>
            <p style={styles.text}>
                Created by Rasmus B.K. Nielsen.
            </p>
        </div>
    );
};

const styles = {
     container: {
         padding: '20px',
         textAlign: 'center',
         backgroundColor: '#f7f7f7',
         borderRadius: '8px',
         boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
         margin: '20px',
         maxWidth: '600px',
         marginLeft: 'auto',
         marginRight: 'auto'
     },
     header: {
         color: '#333',
         fontSize: '24px'
     },
     text: {
         color: '#666',
         fontSize: '16px',
         lineHeight: '1.5',
         marginTop: '20px'
     }
 };
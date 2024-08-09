import React from 'react';
import './Layout.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="layout">
            <header className="header">
                <link rel="icon" href="/favicon.ico" />
                <h1>My Demo App</h1>
            </header>
            <main className="main-content">
                {children}
            </main>
            <footer className="footer">
                <p>© 2024 My App</p>
            </footer>
        </div>
    );
};

export default Layout;
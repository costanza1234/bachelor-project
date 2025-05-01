import React from 'react';
import Points from './Points';
import { useLocation } from 'react-router-dom';

export default function Header() {

    const location = useLocation();
    const isStartPage = location.pathname === '/';

    return (
        <div>
            <header className="header">
                <h1>ISOLE DELLA CONOSCENZA</h1>
            </header>
            {!isStartPage && <Points />}
        </div>
    );
}
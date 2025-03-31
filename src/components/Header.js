import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="header">
            <Link to="/" className="header-link">
                <h1>ISOLE DELLA CONOSCENZA</h1>
            </Link>
        </header>
    );
}
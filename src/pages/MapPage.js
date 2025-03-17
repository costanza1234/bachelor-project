import React from 'react';
import Header from '../components/Header';
import Map from '../components/Map';
import '../styles/styles.css';

export default function MapPage() {
    return (
        <div className='mainContainer'>
            <Header />
            <Map />
        </div>
    );
}

import React from 'react';
import '../styles/Map.css';

export default function MapIsland({ src, alt, className, onClick }) {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onClick={onClick}
        />
    );
}
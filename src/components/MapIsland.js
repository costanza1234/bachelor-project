import React from 'react';
import '../styles/Map.css';

export default function MapIsland({ key, src, alt, className, style, onClick }) {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            style={style}
            onClick={onClick}
        />
    );
}
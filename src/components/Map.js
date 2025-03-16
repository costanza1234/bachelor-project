import React, { useRef, useEffect, useState } from 'react';
import { ReactComponent as LineSVG } from '../assets/line.svg';

import '../styles/Map.css';
import MapIsland from './MapIsland';

export default function Map() {
    const pathRef = useRef(null);
    const [ positions, setPositions ] = useState([]);

    useEffect(() => {
        // Query the SVG element with class "mapSVG"
        const svgElement = document.querySelector('.mapSVG');
        if (!svgElement) return;

        // Query the first <path> element within the SVG
        const path = svgElement.querySelector('path');
        if (!path) return;
        pathRef.current = path;

        // Get the total length of the path
        const totalLength = path.getTotalLength();

        // Decide distances (fractions of totalLength) where you want each island
        const fractions = [ 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 0.95 ];
        const newPositions = fractions.map((fraction) => {
            const distance = fraction * totalLength;
            const point = path.getPointAtLength(distance); // { x, y }
            return { x: point.x, y: point.y };
        });

        setPositions(newPositions);
    }, []);

    const handleIslandClick = (index) => {
        console.log(`Island ${index} clicked`);
    };

    return (
        <div className="mapContainer">
            {/* Inline SVG container */}
            <svg className="lineSVG" viewBox="0 0 1713.2 1137.1">
                <LineSVG />
            </svg>

            {/* Render each island pinned to a point on the path */}
            {positions.map((pos, i) => (
                <MapIsland
                    key={i}
                    src={`/island${i + 1}.png`}
                    alt={`Island ${i + 1}`}
                    className="mapIsland"
                    style={{
                        position: 'absolute',
                        left: pos.x - 30, // Adjust to center the island (assumes ~60px width)
                        top: pos.y - 30,  // Adjust to center the island (assumes ~60px height)
                    }}
                    onClick={() => handleIslandClick(i + 1)}
                />
            ))}
        </div>
    );
}
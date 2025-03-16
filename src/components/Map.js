import React, { useEffect, useState } from 'react';
import { ReactComponent as LineSVG } from '../assets/line.svg';

import '../styles/Map.css';
import MapIsland from './MapIsland';

export default function Map() {
    const [ positions, setPositions ] = useState([]);

    useEffect(() => {
        const svgElement = document.querySelector('.lineSVG');
        if (!svgElement) return;

        const path = svgElement.querySelector('path');
        if (!path) {
            console.log('no path, returning')
            return;
        }

        const totalLength = path.getTotalLength();

        // The fractions of the path length where you want islands
        const fractions = [ 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 0.95 ];

        // Grab the container rect, so we can offset from container's top-left
        const container = document.querySelector('.mapContainer');
        const containerRect = container.getBoundingClientRect();

        // We'll use an SVGPoint to transform local coordinates to screen coords
        const svgPoint = svgElement.createSVGPoint();
        const ctm = path.getScreenCTM(); // Current Transformation Matrix from the path to screen

        const newPositions = fractions.map((fraction) => {
            const distance = fraction * totalLength;
            const localPt = path.getPointAtLength(distance);

            // Put the local path coordinates into our SVGPoint
            svgPoint.x = localPt.x;
            svgPoint.y = localPt.y;

            // Transform that point into screen/browser coordinates
            const screenPt = svgPoint.matrixTransform(ctm);

            // Now convert screen coordinates to container-relative coordinates
            return {
                x: screenPt.x - containerRect.left,
                y: screenPt.y - containerRect.top,
            };
        });

        setPositions(newPositions);

        console.log('newPositions', newPositions);
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

            {positions.map((pos, i) => (
                <MapIsland
                    key={i}
                    src={`/island${i + 1}.png`}
                    alt={`Island ${i + 1}`}
                    className="mapIsland"
                    style={{
                        position: 'relative',
                        left: pos.x,
                        top: pos.y,
                        transition: 'transform 0.1s',
                        cursor: 'pointer',
                        width: '10%',
                    }}
                    onClick={() => handleIslandClick(i + 1)}
                />
            ))}
        </div>
    );
}
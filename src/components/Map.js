import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useWindowDimensions, useAutoScale } from '../utils/hooks/useMapHooks';
import { getIslands } from '../utils/islandState';
import tracker from '../utils/tracker';
import { IslandContext } from '../utils/IslandContext';
import { useContext } from 'react';
import { useNavigate, } from 'react-router-dom';


export default function Map() {

    const navigate = useNavigate();
    const islandNames = getIslands();

    const dimensions = useWindowDimensions();

    const mapContainerRef = useRef(null);
    const mapContentRef = useRef(null);

    const { width: containerWidth, height: containerHeight } = dimensions;
    const islandSize = 0.2 * containerWidth;

    // Memoized island positions based on viewport
    const points = useMemo(() => [
        { x: 0.2 * containerWidth, y: 0.55 * containerHeight },
        { x: 0.5 * containerWidth, y: 0.55 * containerHeight },
        { x: 0.8 * containerWidth, y: 0.55 * containerHeight },
        { x: 0.2 * containerWidth, y: 0.18 * containerHeight },
        { x: 0.5 * containerWidth, y: 0.18 * containerHeight },
        { x: 0.8 * containerWidth, y: 0.18 * containerHeight }
    ],
        [ containerWidth, containerHeight ]
    );

    const scale = useAutoScale(mapContainerRef, mapContentRef, [ dimensions, points ]);

    // Get the completed islands from the context
    const { completed } = useContext(IslandContext);
    console.log('completed islands:', completed);


    const handleClick = (idx, islandNumber) => {

        tracker.recordIslandClick(islandNumber, idx);

        console.log('tracker:', tracker.islandClickOrder);

        // navigate to the choice page
        navigate(`/MapPage/choice/${islandNumber}`);

    };
    return (
        <div className="mapContainer" ref={mapContainerRef}>
            <div
                className="mapContent"
                ref={mapContentRef}
                style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
            >
                <svg width={containerWidth} height={containerHeight} className="mapSVG" />

                {points.map((point, idx) => {

                    const islandName = islandNames[ idx ];
                    const islandNumber = islandName.match(/\d+/)[ 0 ];

                    const isCompleted = completed.includes(parseInt(islandNumber, 10));


                    return (
                        <img
                            key={idx}
                            src={`/${islandNames[ idx ]}`}
                            alt={`Island ${idx}`}
                            className="mapIsland"
                            style={{
                                position: 'absolute',
                                left: point.x - islandSize / 2,
                                top: point.y - islandSize / 2,
                                width: islandSize,
                                height: islandSize,
                                cursor: 'pointer',
                                // If the island is completed, make it not clickable
                                pointerEvents: isCompleted ? 'none' : 'auto'
                            }}
                            onClick={() => handleClick(idx, islandNumber)}
                        />
                    );
                })}
            </div>
        </div>
    );
}

import React, { useRef, useMemo, useState } from 'react';
import { useWindowDimensions, useAutoScale } from '../utils/hooks/useMapHooks';
import { getIslands } from '../utils/islandState';
import gameState from '../utils/gameState';
import { IslandContext } from '../utils/IslandContext';
import { useContext } from 'react';
import { useNavigate, } from 'react-router-dom';
import { Alert } from '@mantine/core';
import { saveGameState } from '../utils/helpers';


export default function Map() {

    const navigate = useNavigate();
    const islandNames = getIslands();

    const dimensions = useWindowDimensions();

    const mapContainerRef = useRef(null);
    const mapContentRef = useRef(null);

    const { width: containerWidth, height: containerHeight } = dimensions;
    const islandSize = 0.18 * containerWidth;

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

    const [ errorMessage, setErrorMessage ] = useState("");


    const handleClick = (idx, islandID, isCompleted) => {

        if (isCompleted) {
            setErrorMessage(`L'isola ${islandID} è già stata completata!`);
            setTimeout(() => setErrorMessage(""), 2500); // Hide after 2.5s
            return;
        }

        const openTime = new Date().toISOString();


        // find the island in gameState.islands based on the islandID. islands is an array of objects
        const island = gameState.islands.find(island => island.islandID === Number(islandID));
        saveGameState();

        // set the open time for the island
        island.islandData.openTime = openTime;
        saveGameState();

        // record the order of the island that are clicked
        gameState.recordIslandClick(islandID, idx);
        saveGameState();

        // log to check the gameState update
        console.log("gameState updated:", gameState);

        // navigate to the choice page
        navigate(`/MapPage/choice/${islandID}`);

    };

    return (
        <div className="mapContainer" ref={mapContainerRef}>
            {errorMessage && (
                <Alert color="red" style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
                    {errorMessage}
                </Alert>
            )}

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
                            className={`mapIsland ${isCompleted ? 'completed' : ''}`}
                            style={{
                                position: 'absolute',
                                left: point.x - islandSize / 2,
                                top: point.y - islandSize / 2,
                                width: islandSize,
                                height: islandSize,
                                cursor: isCompleted ? 'default' : 'pointer',
                                transition: isCompleted ? 'none' : 'transform 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                if (!isCompleted) {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isCompleted) {
                                    e.currentTarget.style.transform = 'scale(1)';
                                }
                            }}
                            onClick={() => handleClick(idx, islandNumber, isCompleted)}
                        />

                    );
                })}
            </div>
        </div>
    );
}

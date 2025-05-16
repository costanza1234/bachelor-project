import { useRef, useMemo, useState } from 'react';
import { useWindowDimensions, useAutoScale } from '../utils/hooks/useMapHooks';
import { useGameState } from '../utils/GameStateContext';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mantine/core';
import languages from '../data/languages.js';

export default function Map() {

    const {
        gameState,
        setOpenTime,
        recordIslandClick,
        getIslands
    } = useGameState();

    const gameLanguage = gameState.gameLanguage;
    const gameText = languages[ gameLanguage ];

    const navigate = useNavigate();
    const islandNames = getIslands();

    const dimensions = useWindowDimensions();
    const mapContainerRef = useRef(null);
    const mapContentRef = useRef(null);

    const { width: containerWidth, height: containerHeight } = dimensions;
    const islandSize = 0.18 * containerWidth;

    const points = useMemo(() => [
        { x: 0.2 * containerWidth, y: 0.55 * containerHeight },
        { x: 0.5 * containerWidth, y: 0.55 * containerHeight },
        { x: 0.8 * containerWidth, y: 0.55 * containerHeight },
        { x: 0.2 * containerWidth, y: 0.18 * containerHeight },
        { x: 0.5 * containerWidth, y: 0.18 * containerHeight },
        { x: 0.8 * containerWidth, y: 0.18 * containerHeight }
    ], [ containerWidth, containerHeight ]);

    const scale = useAutoScale(mapContainerRef, mapContentRef, [ dimensions, points ]);

    const [ errorMessage, setErrorMessage ] = useState("");

    const handleClick = (idx, islandID, isCompleted) => {
        if (isCompleted) {
            setErrorMessage(gameText.MapClickedError);
            setTimeout(() => setErrorMessage(""), 2500);
            return;
        }

        const islandIdNumber = Number(islandID);
        setOpenTime(islandIdNumber, new Date());
        recordIslandClick(islandIdNumber, idx);

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
                    const isCompleted = gameState.islandCompletionOrder.includes(parseInt(islandNumber, 10));

                    return (
                        <img
                            key={idx}
                            src={`/${islandName}`}
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
                                if (!isCompleted) e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                if (!isCompleted) e.currentTarget.style.transform = 'scale(1)';
                            }}
                            onClick={() => handleClick(idx, islandNumber, isCompleted)}
                        />
                    );
                })}
            </div>
        </div>
    );
}

import { useRef, useMemo, useState } from 'react';
import { useWindowDimensions, useAutoScale } from '../utils/hooks/useMapHooks';
import { useGameState } from '../utils/GameStateContext';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mantine/core';
import languages from '../data/languages.js';

/**
 * Map component renders an interactive map with clickable islands.
 * 
 * - Displays islands at calculated positions based on window dimensions.
 * - Handles island selection, navigation, and completion state.
 * - Shows error messages if a completed island is clicked.
 * - Scales responsively to fit the container.
 * 
 * Context:
 * - Uses game state and utility functions from context (useGameState).
 * - Uses language resources for text.
 * 
 * @component
 * @returns {JSX.Element} The rendered map component with interactive islands.
 */
export default function Map() {

    // Get game state and utility functions from context
    const {
        gameState,
        setOpenTime,
        recordIslandClick,
        getIslands,
    } = useGameState();

    const { gameLanguage } = gameState;
    // Get text resources
    const gameText = languages[ gameLanguage ];

    // React Router navigation
    const navigate = useNavigate();

    // Get island image names/IDs
    const islandNames = getIslands();

    // Responsive window dimensions
    const dimensions = useWindowDimensions();

    // Refs for scaling the map
    const mapContainerRef = useRef(null);
    const mapContentRef = useRef(null);

    // Destructure width and height from dimensions
    const { width: containerWidth, height: containerHeight } = dimensions;

    // Calculate island image size based on container width
    const islandSize = 0.18 * containerWidth;

    // Calculate the positions for each island on the map
    const points = useMemo(() => [
        { x: 0.2 * containerWidth, y: 0.55 * containerHeight },
        { x: 0.5 * containerWidth, y: 0.55 * containerHeight },
        { x: 0.8 * containerWidth, y: 0.55 * containerHeight },
        { x: 0.2 * containerWidth, y: 0.18 * containerHeight },
        { x: 0.5 * containerWidth, y: 0.18 * containerHeight },
        { x: 0.8 * containerWidth, y: 0.18 * containerHeight }
    ], [ containerWidth, containerHeight ]);

    // Calculate scale for auto-scaling the map content
    const scale = useAutoScale(mapContainerRef, mapContentRef, [ dimensions, points ]);

    // State for error messages (e.g., clicking completed islands)
    const [ errorMessage, setErrorMessage ] = useState("");

    // Handle clicking on an island
    const handleClick = (idx, islandID, isCompleted) => {
        if (isCompleted) {

            // Show error if island is already completed
            setErrorMessage(gameText.MapClickedError);
            setTimeout(() => setErrorMessage(""), 2500);
            return;
        }

        // Record open time and click, then navigate to island page
        const islandIdNumber = Number(islandID);
        setOpenTime(islandIdNumber, new Date());
        recordIslandClick(islandIdNumber, idx);

        navigate(`/MapPage/choice/${islandID}`);
    };

    return (
        <div className="mapContainer" ref={mapContainerRef}>

            {/* Show error alert if needed */}
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
                {/* SVG background for the map (empty, can be used for drawing) */}
                <svg width={containerWidth} height={containerHeight} className="mapSVG" />

                {/* Render each island as an image at its calculated position */}
                {points.map((point, idx) => {
                    const islandName = islandNames[ idx ];

                    // Extract island number from name (e.g., "island3.png" -> 3)
                    const islandNumber = islandName.match(/\d+/)[ 0 ];

                    // Check if this island is completed
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
                            // Slightly scale up on hover if not completed
                            onMouseEnter={(e) => {
                                if (!isCompleted) e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                if (!isCompleted) e.currentTarget.style.transform = 'scale(1)';
                            }}
                            // Handle click event
                            onClick={() => handleClick(idx, islandNumber, isCompleted)}
                        />
                    );
                })}
            </div>
        </div>
    );
}

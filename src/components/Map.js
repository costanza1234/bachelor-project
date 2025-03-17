import React, { useState, useEffect, useRef, useMemo } from 'react';
import '../styles/styles.css';

export default function Map() {
    // Track viewport dimensions.
    const [ dimensions, setDimensions ] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    // Shuffle island names once on mount.
    const [ islandNames, setIslandNames ] = useState([]);

    // Refs for scaling.
    const mapContainerRef = useRef(null);
    const mapContentRef = useRef(null);

    // State to hold the current scale factor.
    const [ scale, setScale ] = useState(1);

    // Update dimensions on window resize.
    useEffect(() => {
        const handleResize = () => {
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Shuffle island names once when the component mounts.
    useEffect(() => {
        const shuffledNames = shuffle([
            'island1.png',
            'island2.png',
            'island3.png',
            'island4.png',
            'island5.png',
            'island6.png'
        ]);
        // Add a 7th island at the end.
        shuffledNames.push('island7.png');
        setIslandNames(shuffledNames);
    }, []);

    const containerWidth = dimensions.width;
    const containerHeight = dimensions.height;

    // Define 7 points as fractions of the current viewport.
    const points = useMemo(() => [
        { x: 0.1 * containerWidth, y: 0.7 * containerHeight }, // bottom left
        { x: 0.65 * containerWidth, y: 0.7 * containerHeight }, // bottom right
        { x: 0.35 * containerWidth, y: 0.55 * containerHeight }, // mid-left
        { x: 0.8 * containerWidth, y: 0.45 * containerHeight },  // center
        { x: 0.2 * containerWidth, y: 0.35 * containerHeight }, // upper left
        { x: 0.7 * containerWidth, y: 0.2 * containerHeight },  // upper right
        { x: 0.4 * containerWidth, y: 0.13 * containerHeight }  // top center
    ], [ containerWidth, containerHeight ]);

    // Build a smooth curved path from the points.
    const pathD = buildSmoothPath(points);

    // Island size as a fraction of the viewport width.
    const islandSize = 0.12 * containerWidth;

    /**
     * Scale logic: measure the natural size of .mapContent, then fit it into .mapContainer.
     */
    useEffect(() => {
        function handleScale() {
            if (!mapContainerRef.current || !mapContentRef.current) return;

            // Temporarily remove any scaling to measure the "natural" size
            mapContentRef.current.style.transform = 'none';

            const containerRect = mapContainerRef.current.getBoundingClientRect();
            const contentRect = mapContentRef.current.getBoundingClientRect();

            // Compute scale factors for width and height
            const scaleX = containerRect.width / contentRect.width;
            const scaleY = containerRect.height / contentRect.height;

            // Use the smaller scale to ensure everything fits
            const newScale = Math.min(scaleX, scaleY);

            setScale(newScale);
        }

        // Run the scaling logic once now and again on resize
        window.addEventListener('resize', handleScale);
        handleScale();

        return () => {
            window.removeEventListener('resize', handleScale);
        };
    }, [ dimensions, points ]);

    return (
        <div
            className="mapContainer"
            ref={mapContainerRef}
            style={{
                // Make the container fill the browser window
                position: 'relative',
                width: '100vw',
                height: '100vh',
                overflow: 'hidden'
            }}
        >
            {/* .mapContent wraps both the SVG path and the islands */}
            <div
                className="mapContent"
                ref={mapContentRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left'
                }}
            >
                {/* SVG with a smooth, dashed, curved path */}
                <svg
                    width={containerWidth}
                    height={containerHeight}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}
                >
                    <path
                        d={pathD}
                        fill="none"
                        stroke="rgba(0,0,0,0.5)"
                        strokeWidth="4"
                        strokeDasharray="12,8"
                    />
                </svg>

                {/* Render each island (positions based on current viewport) */}
                {points.map((point, index) => (
                    <img
                        key={index}
                        src={`/${islandNames[ index ]}`}
                        alt={`Island ${index + 1}`}
                        className="mapIsland"
                        style={{
                            position: 'absolute',
                            left: point.x - islandSize / 2,
                            top: point.y - islandSize / 2,
                            width: islandSize,
                            height: islandSize,
                            cursor: 'pointer'
                        }}
                        onClick={() => console.log(`Island ${index + 1} clicked`)}
                    />
                ))}
            </div>
        </div>
    );
}

/**
 * Build a smooth path string using quadratic Bézier curves.
 */
function buildSmoothPath(points) {
    if (points.length < 2) return '';

    let d = `M ${points[ 0 ].x},${points[ 0 ].y}`;

    for (let i = 0; i < points.length - 1; i++) {
        const midX = (points[ i ].x + points[ i + 1 ].x) / 2;
        const midY = (points[ i ].y + points[ i + 1 ].y) / 2;
        d += ` Q ${points[ i ].x},${points[ i ].y} ${midX},${midY}`;
    }
    // Final smooth step to the last point
    d += ` T ${points[ points.length - 1 ].x},${points[ points.length - 1 ].y}`;
    return d;
}

/**
 * Fisher–Yates shuffle: Randomizes array in place.
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ array[ i ], array[ j ] ] = [ array[ j ], array[ i ] ];
    }
    return array;
}
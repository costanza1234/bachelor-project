import React, { useRef, useMemo } from 'react';
import { buildSmoothPath, mapOnClickRedirect } from '../utils/helpers';
import { useWindowDimensions, useShuffledIslands, useAutoScale } from '../utils/hooks/useMapHooks';

export default function Map() {
    const dimensions = useWindowDimensions();
    const islandNames = useShuffledIslands();
    console.log(islandNames);

    const mapContainerRef = useRef(null);
    const mapContentRef = useRef(null);

    const { width: containerWidth, height: containerHeight } = dimensions;
    const islandSize = 0.12 * containerWidth;

    // Memoized island positions based on viewport
    const points = useMemo(() => [
        { x: 0.1 * containerWidth, y: 0.7 * containerHeight },
        { x: 0.65 * containerWidth, y: 0.7 * containerHeight },
        { x: 0.35 * containerWidth, y: 0.55 * containerHeight },
        { x: 0.8 * containerWidth, y: 0.45 * containerHeight },
        { x: 0.2 * containerWidth, y: 0.35 * containerHeight },
        { x: 0.7 * containerWidth, y: 0.2 * containerHeight },
        { x: 0.4 * containerWidth, y: 0.13 * containerHeight }
    ], [ containerWidth, containerHeight ]);

    const pathD = buildSmoothPath(points);
    const scale = useAutoScale(mapContainerRef, mapContentRef, [ dimensions, points ]);

    return (
        <div className="mapContainer" ref={mapContainerRef}>
            <div className="mapContent" ref={mapContentRef} style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                {/* SVG Path */}
                <svg width={containerWidth} height={containerHeight} className="mapSVG">
                    <path d={pathD} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="4" strokeDasharray="12,8" />
                </svg>

                {/* Islands */}
                {points.map((point, index) => (
                    <img
                        key={index}
                        src={`/${islandNames[ index ]}`}
                        alt={`Island ${index}`}
                        className="mapIsland"
                        style={{
                            position: 'absolute',
                            left: point.x - islandSize / 2,
                            top: point.y - islandSize / 2,
                            width: islandSize,
                            height: islandSize,
                            cursor: 'pointer'
                        }}
                        onClick={() => mapOnClickRedirect(islandNames[ index ])}
                    />
                ))}
            </div>
        </div>
    );
}
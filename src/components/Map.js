import React, { useRef, useMemo } from 'react';
import { buildSmoothPath, mapOnClickRedirect } from '../utils/helpers';
import { useWindowDimensions, useAutoScale } from '../utils/hooks/useMapHooks';
import { getIslands } from '../utils/islandState';

export default function Map() {

    const islandNames = getIslands();
    console.log(islandNames);

    const dimensions = useWindowDimensions();

    const mapContainerRef = useRef(null);
    const mapContentRef = useRef(null);

    const { width: containerWidth, height: containerHeight } = dimensions;
    const islandSize = 0.2 * containerWidth;

    // Memoized island positions based on viewport
    const points = useMemo(() => [
        { x: 0.2 * containerWidth, y: 0.6 * containerHeight },
        { x: 0.5 * containerWidth, y: 0.6 * containerHeight },
        { x: 0.8 * containerWidth, y: 0.6 * containerHeight },
        { x: 0.2 * containerWidth, y: 0.2 * containerHeight },
        { x: 0.5 * containerWidth, y: 0.2 * containerHeight },
        { x: 0.8 * containerWidth, y: 0.2 * containerHeight },
    ], [ containerWidth, containerHeight ]);

    const scale = useAutoScale(mapContainerRef, mapContentRef, [ dimensions, points ]);

    return (
        <div className="mapContainer" ref={mapContainerRef}>
            <div className="mapContent" ref={mapContentRef} style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                {/* SVG Path */}
                <svg width={containerWidth} height={containerHeight} className="mapSVG"></svg>

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
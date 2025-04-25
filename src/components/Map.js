import React, { useRef, useMemo, useState, useEffect } from 'react';
import { mapOnClickRedirect } from '../utils/helpers';
import { useWindowDimensions, useAutoScale } from '../utils/hooks/useMapHooks';
import { getIslands } from '../utils/islandState';
import { IslandContext } from '../utils/IslandContext';
import { useContext } from 'react';


export default function Map() {
    const islandNames = getIslands();
    const { activeIdx } = useContext(IslandContext);

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

    // Only redirect when active
    const handleClick = idx => {
        if (idx === activeIdx) {
            mapOnClickRedirect(islandNames[ idx ]);
        }
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
                    const isLocked = idx > activeIdx;
                    const isActive = idx === activeIdx;

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
                                cursor: isActive ? 'pointer' : 'default',
                                filter: isLocked ? 'grayscale(100%) opacity(0.5)' : undefined,
                                pointerEvents: isActive ? 'auto' : 'none'
                            }}
                            onClick={() => handleClick(idx)}
                        />
                    );
                })}
            </div>
        </div>
    );
}

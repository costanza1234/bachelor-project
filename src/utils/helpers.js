/**
 * Build a smooth path string using quadratic Bézier curves.
 */
export function buildSmoothPath(points) {
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
export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ array[ i ], array[ j ] ] = [ array[ j ], array[ i ] ];
    }
    return array;
}

export function mapOnClickRedirect(name) {
    console.log('Map clicked: ', name);
    // Extract island number from image name (islandX.png)
    const islandNumber = name.match(/\d+/)[ 0 ];
    window.location.href = `/MapPage/${islandNumber}`;
}   
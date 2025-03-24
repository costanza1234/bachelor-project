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

export async function performSearch(text) {
    const apiKey = 'YOUR_BING_API_KEY';
    const endpoint = 'https://api.bing.microsoft.com/v7.0/search';

    try {
        const response = await fetch(`${endpoint}?q=${encodeURIComponent(text)}`, {
            method: 'GET',
            headers: {
                'Ocp-Apim-Subscription-Key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`Bing Search API error: ${response.status}`);
        }

        const data = await response.json();
        console.log('Search results for:', text, data);
        return data.webPages?.value || [];
    } catch (error) {
        console.error('Search error:', error);
        return [];
    }
}


export function parseResults(results) {
    // Parse search results
    console.log('Parsing results: ', results);

    const parsed_results = [
        {
            title: "WWF - World Wide Fund for Nature",
            url: "https://www.wwf.org",
            snippet: "WWF works to help local communities conserve natural resources, support sustainable livelihoods, and protect wildlife."
        },
        {
            title: "WWF - World Wide Fund for Nature",
            url: "https://www.wwf.org",
            snippet: "WWF works to help local communities conserve natural resources, support sustainable livelihoods, and protect wildlife."
        },
        {
            title: "WWF - World Wide Fund for Nature",
            url: "https://www.wwf.org",
            snippet: "WWF works to help local communities conserve natural resources, support sustainable livelihoods, and protect wildlife."
        },
        {
            title: "WWF - World Wide Fund for Nature",
            url: "https://www.wwf.org",
            snippet: "WWF works to help local communities conserve natural resources, support sustainable livelihoods, and protect wildlife."
        },
        {
            title: "WWF - World Wide Fund for Nature",
            url: "https://www.wwf.org",
            snippet: "WWF works to help local communities conserve natural resources, support sustainable livelihoods, and protect wildlife."
        },
        {
            title: "WWF - World Wide Fund for Nature",
            url: "https://www.wwf.org",
            snippet: "WWF works to help local communities conserve natural resources, support sustainable livelihoods, and protect wildlife."
        },
    ];

    return parsed_results;
}

export function generateResponse(text) {
    // Generate AI response
    console.log('Generating response for: ', text);

    const response =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "
        + "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? " +
        "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? " +
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."

    return response;
}
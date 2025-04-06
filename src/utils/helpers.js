import { GoogleGenerativeAI } from '@google/generative-ai'

export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ array[ i ], array[ j ] ] = [ array[ j ], array[ i ] ];
    }
    return array;
}

export function mapOnClickRedirect(name) {
    // Extract island number from image name (islandX.png)
    const islandNumber = name.match(/\d+/)[ 0 ];
    window.location.href = `/MapPage/choice/${islandNumber}`;
}

export async function performSearch(text) {
    const apiKey = process.env.REACT_APP_API_KEY;
    const searchEngineId = process.env.REACT_APP_SEARCH_ENGINE_ID;
    const endpoint = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(text)}&key=${apiKey}&cx=${searchEngineId}`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Google Search API error: ${response.status}`);
        }

        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error('Search error:', error);
        return [];
    }
}


export async function generateResponse(prompt) {
    const apiKey = process.env.REACT_APP_GOOGLE_AI_STUDIO_API_KEY;

    if (!apiKey) {
        throw new Error('Missing API key. Check your .env file and restart dev server.');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });

    const result = await model.generateContent({
        contents: [ { parts: [ { text: prompt } ] } ]
    });

    const response = result.response;
    const generatedText = await response.text();

    return generatedText;
}

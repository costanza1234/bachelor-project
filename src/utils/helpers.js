import { GoogleGenerativeAI } from '@google/generative-ai'
import gameState from '../utils/gameState';

export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ array[ i ], array[ j ] ] = [ array[ j ], array[ i ] ];
    }
    return array;
}


export async function performSearch(query) {
    const apiKey = process.env.REACT_APP_API_KEY;
    const searchEngineId = process.env.REACT_APP_SEARCH_ENGINE_ID;
    const perPage = 10;               // max results per request
    const totalResults = 20;               // how many you want overall
    const pages = Math.ceil(totalResults / perPage);
    const allItems = [];

    for (let page = 0; page < pages; page++) {
        const start = page * perPage + 1;      // 1, 11, 21…
        const url = new URL('https://www.googleapis.com/customsearch/v1');
        url.searchParams.set('key', apiKey);
        url.searchParams.set('cx', searchEngineId);
        url.searchParams.set('q', query);
        url.searchParams.set('start', String(start));
        url.searchParams.set('num', String(perPage));

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Status ${res.status}`);
            const { items = [] } = await res.json();
            allItems.push(...items);
        } catch (err) {
            console.error(`Page ${page + 1} failed:`, err);
            // you could choose to break here if you want to bail early
        }
    }

    // just in case some page returned fewer results
    return allItems.slice(0, totalResults);
}



export async function generateResponse(prompt) {
    const apiKey = process.env.REACT_APP_GOOGLE_AI_STUDIO_API_KEY;

    if (!apiKey) {
        throw new Error('Missing API key. Check your .env file and restart dev server.');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    console.log('Generating ai response');

    const result = await model.generateContent({
        contents: [ { parts: [ { text: prompt } ] } ]
    });

    const response = result.response;
    const generatedText = await response.text();

    return generatedText;
}
export function saveGameState() {
    const data = gameState.exportData();
    localStorage.setItem("gameState", JSON.stringify(data));
}

export function enableGameSaveOnUnload() {
    window.addEventListener("beforeunload", saveGameState);
}

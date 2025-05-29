import { GoogleGenerativeAI } from '@google/generative-ai'

// Define a function to shuffle the elements of an array in-place using the Fisher-Yates algorithm
export function shuffle(array) {

    // Loop from the end of the array to the beginning
    for (let i = array.length - 1; i > 0; i--) {

        // Generate a random index from 0 to i (inclusive)
        const j = Math.floor(Math.random() * (i + 1));

        // Swap the elements at positions i and j
        [ array[ i ], array[ j ] ] = [ array[ j ], array[ i ] ];
    }

    // Return the shuffled array
    return array;
}

/**
 * Performs a search using the Google Custom Search API.
 *
 * This function retrieves the API key and search engine ID from environment variables,
 * and then makes multiple paginated requests to fetch a specified total number of search results.
 * It aggregates the results from each successful API call, logging any errors encountered during individual requests.
 *
 * @async
 * @function performSearch
 * @param {string} query - The search query string.
 * @returns {Promise<Object[]>} A promise that resolves to an array of search result items.
 */
export async function performSearch(query) {
    // Retrieve the API key from environment variables
    const apiKey = process.env.REACT_APP_API_KEY;

    // Retrieve the search engine ID from environment variables
    const searchEngineId = process.env.REACT_APP_SEARCH_ENGINE_ID;

    // Maximum number of results to get per API request
    const perPage = 10;

    // Total number of results desired overall
    const totalResults = 10;

    // Calculate the number of pages needed based on results per page
    const pages = Math.ceil(totalResults / perPage);

    // Array to hold all aggregated search result items
    const allItems = [];

    // Loop through each page of results
    for (let page = 0; page < pages; page++) {

        // Calculate the starting index for the current page (e.g., 1, 11, 21, …)
        const start = page * perPage + 1;

        // Create a new URL object for the custom search API endpoint
        const url = new URL('https://www.googleapis.com/customsearch/v1');

        // Set the key parameter in the URL with the API key
        url.searchParams.set('key', apiKey);

        // Set the cx parameter in the URL with the search engine ID
        url.searchParams.set('cx', searchEngineId);

        // Set the q parameter in the URL with the search query
        url.searchParams.set('q', query);

        // Set the start parameter in the URL to control pagination
        url.searchParams.set('start', String(start));

        // Set the num parameter in the URL to control the number of results per page
        url.searchParams.set('num', String(perPage));

        try {
            // Make a fetch request to the assembled URL
            const res = await fetch(url);

            // Throw an error if the response status is not ok (non-200)
            if (!res.ok) throw new Error(`Status ${res.status}`);

            // Parse the JSON response and extract the items array (default to empty if not present)
            const { items = [] } = await res.json();

            // Add the retrieved items to the allItems array
            allItems.push(...items);

        } catch (err) {
            // Log an error message if there is an issue with the current page's request
            console.error(`Page ${page + 1} failed:`, err);

        }
    }

    // Return exactly the desired number of results (in case the last page returned too many extra items)
    return allItems.slice(0, totalResults);
}


/**
 * Generates an AI response based on the provided prompt.
 *
 * This function retrieves the API key from the environment variables, creates an instance of the generative AI client,
 * and obtains a model instance using the specified configuration. It then uses the model to generate content based on
 * the provided prompt. The function throws an error if the API key is missing.
 *
 * @param {string} prompt - The input text prompt for generating the AI response.
 * @returns {Promise<string>} A promise that resolves to the generated text.
 * @throws {Error} If the API key is missing.
 */
export async function generateResponse(prompt) {

    // Retrieve the API key for Google AI Studio from environment variables
    const apiKey = process.env.REACT_APP_GOOGLE_AI_STUDIO_API_KEY;

    // If the API key is missing, throw an error instructing a .env file check
    if (!apiKey) {
        throw new Error('Missing API key. Check your .env file and restart dev server.');
    }

    // Create an instance of GoogleGenerativeAI with the API key
    const genAI = new GoogleGenerativeAI(apiKey);

    // Retrieve a generative model instance with the specified model configuration
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });


    // Log to the console that the AI response generation is starting
    console.log('Generating ai response');

    // Generate content using the prompt by calling generateContent on the model
    const result = await model.generateContent({

        // Wrap the prompt text in the required structure expected by the API
        contents: [ { parts: [ { text: prompt } ] } ]
    });

    // Get the response object from the result
    const response = result.response;

    // Read the generated text from the response
    const generatedText = await response.text();

    // Return the text generated by the AI
    return generatedText;
}

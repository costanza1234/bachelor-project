/**
 * An array of question objects in Italian, each containing:
 * - id: {number} Unique identifier for the question.
 * - text: {string} The question text in Italian.
 * - sentiment: {('neutral'|'positive'|'negative')} The sentiment associated with the question.
 *
 * @type {Array<{
 *   id: number,
 *   text: string,
 *   sentiment: 'neutral' | 'positive' | 'negative'
 * }>}
 */

const questions_ITA = [
    {
        id: 1,
        text: "Qual è la montagna più alta del mondo?",
        sentiment: "neutral",
    },
    {
        id: 2,
        text: "Dove si trova il fiume più lungo del mondo?",
        sentiment: "neutral",
    },
    {
        id: 3,
        text: "Perché gli orsi polari si stanno estinguendo?",
        sentiment: "negative",
    },
    {
        id: 4,
        text: "Dove si trova l’isola di plastica?",
        sentiment: "negative",
    },
    {
        id: 5,
        text: "Cos’è la biodiversità?",
        sentiment: "positive",
    },
    {
        id: 6,
        text: "Di cosa si occupa il WWF?",
        sentiment: "positive",
    },
];

const questions_ENG = [
    {
        id: 1,
        text: "What is the highest mountain in the world?",
        sentiment: "neutral",
    },
    {
        id: 2,
        text: "Where is the longest river in the world?",
        sentiment: "neutral",
    },
    {
        id: 3,
        text: "Why are polar bears going extinct?",
        sentiment: "negative",
    },
    {
        id: 4,
        text: "Where is the plastic island?",
        sentiment: "negative",
    },
    {
        id: 5,
        text: "What is biodiversity?",
        sentiment: "positive",
    },
    {
        id: 6,
        text: "What does WWF do?",
        sentiment: "positive",
    },
];

export { questions_ITA, questions_ENG };
import { questions_ITA, questions_ENG } from './questions.js';

/**
 * An object containing language-specific configurations for the application.
 *
 * Each language key (e.g., "italiano", "english") maps to an object with the following properties:
 * @typedef {Object} LanguageConfig
 * @property {Array} questions - The set of questions for the language.
 * @property {string} AnswerTextarea - Label for the answer textarea.
 * @property {string} AnswerPlaceholder - Placeholder text for the answer textarea.
 * @property {string} AnswerButton - Text for the answer submission button.
 * @property {string} BackButton - Text for the back button.
 * @property {string} FinishMessage - Message displayed at the end of the game with the final score.
 * @property {string} WelcomeMessage - Welcome message shown at the start.
 * @property {string} StartButton - Text for the start button.
 * @property {string} CodeInputPlaceholder - Placeholder for the code input field.
 * @property {string} CodeInputLabel - Label for the code input field.
 * @property {string} CodeInputTitle - Title for the code input dialog.
 * @property {string} CodeInputError - Error message for invalid code input.
 * @property {string} CodeInputButton - Text for the code input submission button.
 * @property {string} CodeInputClear - Text for the code input clear/cancel button.
 * @property {string} Header - Main header/title of the application.
 * @property {string} loadingTextPlaceholder - Placeholder text shown while loading/generating a response.
 * @property {string} AIPlaceholder - Placeholder for AI assistant input.
 * @property {string} GooglePlaceholder - Placeholder for Google search input.
 * @property {string} MapClickedError - Error message when a completed island is clicked.
 * @property {string} Score - Label for displaying the score.
 * @property {string} QuestionChoice - Prompt for selecting how to answer a question.
 * @property {string} QuestionHeader - Label for the question header.
 *
 * @type {Object.<string, LanguageConfig>}
 */

const languages =
{
    "italiano": {
        "questions": questions_ITA,
        "AnswerTextarea": "Risposta:",
        "AnswerPlaceholder": "Scrivi qui la tua risposta...",
        "AnswerButton": "Invia",
        "BackButton": "Torna indietro",
        "FinishMessage": "Grazie per aver giocato! Questo è il tuo punteggio finale: ",
        "WelcomeMessage": "Ciao! Aspetta che la maestra ti dica di iniziare prima di cliccare sul bottone 😉",
        "StartButton": "INIZIA A GIOCARE",
        "CodeInputPlaceholder": "Scrivi qui il tuo codice (minimo 3 numeri)...",
        "CodeInputLabel": "Codice",
        "CodeInputTitle": "Inserisci il tuo codice",
        "CodeInputError": "Attenzione: Il codice deve avere almeno 3 cifre",
        "CodeInputButton": "Gioca!",
        "CodeInputClear": "Annulla",
        "Header": "ISOLE DELLA CONOSCENZA",
        "loadingTextPlaceholder": "Sto generando una risposta...",
        "AIPlaceholder": "Come posso aiutarti?",
        "GooglePlaceholder": "Cerca con Google",
        "MapClickedError": "L'isola è già stata completata",
        "Score": "Punteggio: ",
        "QuestionChoice": "Come vorresti rispondere a questa domanda?",
        "QuestionHeader": "Domanda: ",
    },

    "english": {
        "questions": questions_ENG,
        "AnswerTextarea": "Answer:",
        "AnswerPlaceholder": "Write your answer here...",
        "AnswerButton": "Submit",
        "BackButton": "Go back",
        "FinishMessage": "Thank you for playing! This is your final score: ",
        "WelcomeMessage": "Hello! Wait for the teacher to tell you to start before clicking the button 😉",
        "StartButton": "START PLAYING",
        "CodeInputPlaceholder": "Write your code here (minimum 3 digits)...",
        "CodeInputLabel": "Code",
        "CodeInputTitle": "Enter your code",
        "CodeInputError": "Attention: The code must have at least 3 digits",
        "CodeInputButton": "Play!",
        "CodeInputClear": "Cancel",
        "Header": "ISLANDS OF KNOWLEDGE",
        "loading-textPlaceholder": "Generating a response...",
        "AIPlaceholder": "How can I help you?",
        "GooglePlaceholder": "Search with Google",
        "MapClickedError": "The island has already been completed",
        "Score": "Score: ",
        "QuestionChoice": "How would you like to answer this question?",
        "QuestionHeader": "Question: ",

    }
}

export default languages;

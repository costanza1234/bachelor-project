
import { questions_ITA, questions_ENG } from './questions.js';


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
